import {
  Get_Closing_Prompt,
  Get_Fs_Extension,
  Get_Protocol_System_Prompt as Get_Protocol_System_V2Prompt,
  Get_Thinking_Extension,
} from "./prompt_v2.js";
import { get_file_structure, read_file } from "./tools.js";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_KEY;
const client = new OpenAI({ apiKey });

export class Executor {
  executing = true;
  readyToGenerate = false;
  history = [];
  extensions = {};
  internalState = {};

  constructor() {}

  /**
   * Register a Protocol System extension.
   * @param   {Object}           args
   * @param   {string}           args.name     The name of the extension.
   * @param   {Function()}       args.handler  A routine to be handle utility invocations
   */
  extension(name, extension) {
    this.extensions[name] = extension;
    return this;
  }

  /**
   * Executes a user utterance using the Protocol System V2.
   * @param   {Object}           props
   * @param   {string}           props.systemPrompt Original system prompt.
   * @param   {string}           props.userMessage  An initial user message to kick off orchestration.
   * @param   {string|undefined} props.formatPrompt Formatting instructions for the final response.
   * @returns {Promise<string>}
   */
  async run(props) {
    // The execution loop allows chain of thought
    do {
      const content = await this.#execute(this.#getConversationHistory(props));

      if (!content) {
        throw Error("Internal problem. Missing response from LLM Service");
      }

      if (content["final-response"]) {
        return content["final-response"];
      }

      const { target, commands } = content;

      if (!target || !commands) {
        throw Error(
          `Internal problem. LLM response missing properties ${JSON.stringify(
            content,
            null,
            2
          )}`
        );
      }

      /**
       * Internal buffer holding execution results.
       */
      const executionBuffer = [];

      /**
       * Allows extensions to define internal state in the executor.
       * The internal state is segmented using ids
       *
       * ID could be the extension name
       */
      const state = () => ({
        get: (id) => this.internalState[id],
        set: (id, cb) => (this.internalState[id] = cb(this.internalState[id])),
      });

      /**
       * Allows extensions to hook into the execution buffer that is added into history.
       */
      const buffer = () => ({ push: (value) => executionBuffer.push(value) });

      if (target === "main") {
        for (const command of commands) {
          switch (command["utility-name"]) {
            case "pass_token": {
              break;
            }

            case "ready": {
              this.#toggleReadyToGenerate();
              break;
            }

            default: {
              console.error("Invalid utility from LLM ", command);
            }
          }
        }
      } else {
        const extension = this.extensions[target];
        if (extension) {
          extension.handler({
            commands,
            buffer,
            state,
          });
        }
      }

      this.history.push({ executionBuffer, content });
    } while (this.executing);
  }

  /**
   * Performs the actual LLM call to OpenAI.
   */
  #execute = async (messages) => {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      store: true,
      response_format: {
        type: "json_object",
      },
    });

    if (response.choices.length == 0) {
      return undefined;
    }

    const message = response.choices[0].message;
    console.info({ message });
    return JSON.parse(message.content);
  };

  /**
   * This helper prepares the prompt for each LLM API call.
   * @param   {Object}             args
   * @param   {string}             args.systemPrompt Original system prompt.
   * @param   {string}             args.userMessage  An initial user message to kick off orchestration.
   * @param   {string | undefined} args.formatPrompt Formatting instructions for the final response.
   */
  #getConversationHistory = ({ systemPrompt, userMessage, formatPrompt }) => {
    const protocol = Get_Protocol_System_V2Prompt();
    const protocolClosingPrompt = Get_Closing_Prompt();

    const starters = [
      { role: "developer", content: protocol }, // Opening protocol prompt
      ...Object.values(this.extensions).map((extension) => ({
        role: "developer",
        content: extension["prompt"],
      })), // Add extensions' instructions to the main prompt
      { role: "developer", content: systemPrompt }, // System prompt
      { role: "user", content: userMessage }, // User message
      { role: "user", content: "<pass />" }, // Kick off conversation
    ];

    const previousMessages = this.history.reduce(
      (prev, { content, executionBuffer }) => [
        ...prev,
        {
          role: "assistant",
          content: JSON.stringify(content, null, 2),
        },
        {
          role: "user",
          content: JSON.stringify(executionBuffer, null, 2),
        },
      ],
      []
    );

    const closingPrompts = this.readyToGenerate
      ? [
          {
            role: "developer",
            content: protocolClosingPrompt,
          },
          {
            role: "user",
            content: "<respond />",
          },
        ]
      : [];

    if (formatPrompt) {
      closingPrompts.push({
        role: "developer",
        content: formatPrompt,
      });
    }

    return [...starters, ...previousMessages, ...closingPrompts];
  };

  /**
   * Kills the exection cycle.
   */
  #toggleReadyToGenerate = () => {
    this.readyToGenerate = true;
  };
}

export const fsExtension = {
  name: "fs",
  prompt: Get_Fs_Extension(),
  handler: async ({ commands, buffer }) => {
    const { push } = buffer();

    for (const command of commands) {
      switch (command["utility-name"]) {
        case "get_file_structure": {
          const [path] = command["args"];
          const value = await get_file_structure(path);
          push(
            `
                <reply name="get_file_structure" args="[${path}]" />
                  ${JSON.stringify(value, null, 2)}
                </reply />
            `
          );
          break;
        }

        case "read_file": {
          const [fileName] = command["args"];
          const value = await read_file(fileName);
          push(
            `
              <reply name="read_file" args="[${fileName}]"/>
                ${JSON.stringify(value, null, 2)}
              </reply />
            `
          );
          break;
        }
      }
    }
  },
};

export const thinkingExtension = {
  name: "thinking",
  prompt: Get_Thinking_Extension(),
  handler: async ({ commands, buffer, state }) => {
    const { push } = buffer();
    const { set, get } = state();

    for (const command of commands) {
      switch (command["utility-name"]) {
        case "start_thinking": {
          set("thinking", (prev) => ({
            ...prev,
            mode: "thinking",
          }));
          break;
        }

        case "send_report": {
          const [report] = command["args"];
          set("thinking", (prev) => ({ ...prev, report }));
          break;
        }

        case "push_step": {
          const [step] = command["args"];
          set("thinking", (prev) => ({
            ...prev,
            steps: [...(prev.steps || []), step],
          }));
          break;
        }

        case "commit_steps": {
          set("thinking", (prev) => ({
            ...prev,
            status: "sealed",
          }));
          break;
        }

        case "peek_steps": {
          push(
            `
              <reply name="peek_steps" args="[]"/>
                ${JSON.stringify(get("thinking")["steps"], null, 2)}
              </reply />
            `
          );
          break;
        }

        case "end_thinking": {
          const { report, steps } = get("thinking");
          push(
            `
              <message>
              You have reached the end of the thinking phase. Here is a summary of the task ahead of you.
              - The task requires you to ${report}

              Here are the steps you've come up with
              ${steps.map((step) => `- ${step}\n`)}
              </message/>
            `
          );
          set("thinking", (prev) => ({
            ...prev,
            mode: "execution",
          }));
          break;
        }
      }
    }
  },
};
