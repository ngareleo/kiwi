import { Get_Protocol_System_Prompt as Get_Protocol_System_V2Prompt } from '../prompts/extension-based-sys-prompt';
import { Get_Closing_Prompt } from '../prompts/extension-prompts.js';
import OpenAI from 'openai';
import {
  ExtensionHandler,
  ExtensionHandlerContext,
  ExtensionInternalState,
  ProtocolMessage,
  SupportedExtensions,
} from './extension-based-executor-types.js';
import { isValidProtocolMessage } from './extensions-based-executor-utils.js';

type ConversationHistory = {
  executionBuffer: string[];
  content: ProtocolMessage;
}[];

const protocolSysPrompt = Get_Protocol_System_V2Prompt();
const protocolClosingPrompt = Get_Closing_Prompt();
const apiKey = process.env.OPENAI_KEY;
const client = new OpenAI({ apiKey });

export class Executor {
  executing = true;
  readyToGenerate = false;
  history: ConversationHistory = [];
  extensions: Record<string, ExtensionHandler> = {};
  internalState = {};

  constructor() {}

  extension(name: SupportedExtensions, extension: ExtensionHandler) {
    if (Object.hasOwn(this.extensions, name)) {
      return;
    }

    this.extensions[name] = extension;
    this.extensions[name]?.init?.({ state: this.accessInnerState(name) });
    return this;
  }

  async run(props: {
    systemPrompt: string;
    userMessage: string;
    formatPrompt: string;
  }) {
    do {
      const protocolMessage = await this.execute(props);

      if (!protocolMessage) {
        throw Error('Internal problem. Missing response from LLM Service');
      }

      if (!isValidProtocolMessage(protocolMessage)) {
        throw Error('Internal problem. Invalid protocol message received');
      }

      if (protocolMessage['final-response']) {
        return protocolMessage['final-response'];
      }

      const { target, commands } = protocolMessage;

      if (!target || !commands) {
        throw Error(
          `Internal problem. LLM response missing properties ${JSON.stringify(
            protocolMessage,
            null,
            2
          )}`
        );
      }

      const buffer = () => {
        const executionBuffer: string[] = [];
        return {
          push: (value: string) => executionBuffer.push(value),
          get: () => executionBuffer,
        };
      };

      const replyToCommand: ExtensionHandlerContext['replyToCommand'] = (
        command,
        payload
      ) => {
        const { push } = buffer();
        push(
          `
          <reply name="${command.utility}" args="[${command.args}]" />
          ${payload}
          </reply />
          `
        );
      };

      const sendMessage: ExtensionHandlerContext['sendMessage'] = (msg) => {
        const { push } = buffer();
        push(
          `
          <message>
          ${msg}
          </message/>
          `
        );
      };

      const reportError: ExtensionHandlerContext['sendMessage'] = (msg) => {
        const { push } = buffer();
        push(
          `
          <message type="error">
          ${msg}
          </message/>
          `
        );
      };

      if (target === 'main') {
        for (const command of commands) {
          switch (command['utility-name']) {
            case 'pass_token': {
              break;
            }

            case 'ready': {
              this.toggleReadyToGenerate();
              break;
            }

            default: {
              console.error('Invalid utility from LLM ', command);
            }
          }
        }
      } else {
        const extension = this.extensions[target];
        if (extension) {
          extension.handler({
            commands,
            buffer,
            state: this.accessInnerState(extension.name),
            sendMessage,
            replyToCommand,
            reportError,
          });
        }
      }

      this.history.push({
        executionBuffer: buffer().get(),
        content: protocolMessage,
      });
    } while (this.executing);
  }

  /**
   * Performs the actual LLM call to OpenAI.
   */
  private execute = async ({
    systemPrompt,
    userMessage,
    formatPrompt,
  }: {
    systemPrompt: string;
    userMessage: string;
    formatPrompt: string;
  }): Promise<Record<string, unknown> | null> => {
    const getMessages = () => {
      const starters = [
        { role: 'developer', content: protocolSysPrompt }, // Opening protocol prompt
        ...Object.values(this.extensions).map((extension) => ({
          role: 'developer',
          content: extension['prompt'],
        })), // Add extensions' instructions to the main prompt
        { role: 'developer', content: systemPrompt }, // System prompt
        { role: 'user', content: userMessage }, // User message
        { role: 'user', content: '<pass />' }, // Kick off conversation
      ];

      const previousMessages = this.history
        .map(({ content, executionBuffer }) => [
          {
            role: 'assistant',
            content: JSON.stringify(content, null, 2),
          },
          {
            role: 'user',
            content: JSON.stringify(executionBuffer, null, 2),
          },
        ])
        .reduce((prev, entry) => [...prev, ...entry], []);

      const closingPrompts: {
        role: 'assistant' | 'user' | 'developer';
        content: string;
      }[] = [];
      if (this.readyToGenerate) {
        closingPrompts.push(
          {
            role: 'developer',
            content: protocolClosingPrompt,
          },
          {
            role: 'user',
            content: '<respond />',
          }
        );
      }

      if (formatPrompt) {
        closingPrompts.push({
          role: 'developer',
          content: formatPrompt,
        });
      }

      return [...starters, ...previousMessages, ...closingPrompts];
    };

    const messages = getMessages();
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages,
      store: true,
      response_format: {
        type: 'json_object',
      },
    });

    if (response.choices.length == 0) {
      return null;
    }

    const message = response.choices[0].message;
    console.info({ message });
    return message.content ? JSON.parse(message.content) : null;
  };

  private toggleReadyToGenerate = () => {
    this.readyToGenerate = true;
  };

  private accessInnerState = (
    id: SupportedExtensions
  ): (() => ExtensionInternalState<Record<string, unknown>>) => {
    return () => ({
      get: () => this.internalState[id],
      set: (cb) => (this.internalState[id] = cb(this.internalState[id])),
    });
  };
}
