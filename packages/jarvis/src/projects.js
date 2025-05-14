import { Transform, PassThrough, pipeline } from 'stream';
import 'dotenv/config';
import OpenAI from 'openai';
import getRootpath from '@kiwi/common/src/getRootpath.js';
import { linearLLMExecutor } from './executor_v1.js';
import { Executor, fsExtension, thinkingExtension } from './executor_v2.js';
import { Get_AsyncProtocol_System_Prompt } from './prompt_async.js';

const apiKey = process.env.OPENAI_KEY;
const client = new OpenAI({ apiKey });

export const getRepoSysPrompt = (pathToRepo) => `
# Your Objective
- You are presented with a new repository at directory path '${pathToRepo}'. 
- Users will ask you for information regarding this information:
- You have the 'Protocol' at your disposal to help you navigate the repository.
- You will use your rich skills in code analysis and report generation to fulfil the user's request.
- Your main priority should be to fulfil the task.

# Output
- You will maximise the amount of information you provide. To acheieve this you should maximise the amount of context you collect.
- Before each task, you should ask yourself how you can achieve your task and the maximum.

# Recommendations
- To generate better response take advantage of the 'Protocol' which will allow you to build more context on the task.

# Hints
- You can check the project's dependencies the "read_file" utility from the Protocol by sending this message:
    {
        status: "OKAY",
        indicator: "NOT_READY",
        message: "",
        commands: [
            { "utility-name": "read_file", args: ["pathToProject/package.json"] },
            { "utility-name": "pass_token", args: [] },
        ]
    }
`;

export const closingPrompt = `
- You will use an asserted tone.
`;

export async function repoUnderstanding() {
  const sysPath = getRootpath('__samples__/remind');
  return {
    v1: async () => {
      const response = await linearLLMExecutor({
        systemPrompt: getRepoSysPrompt(sysPath),
        userMessage:
          'Write a read me for this repository. Give me as much detail as you can',
      });

      console.log({ response });
    },
    v2: async () => {
      const response = await new Executor()
        .extension('fs', fsExtension)
        .extension('thinking', thinkingExtension)
        .run({
          systemPrompt: getRepoSysPrompt(sysPath),
          userMessage:
            'Write a read me for this repository. Give me as much detail as you can',
        });

      console.log({ response });
    },
  };
}

/**
 * RUNNING MEMORY
 *
 * I'm experimenting how I can improve how LLMs use experience. I think the gap stems from an issue of memory retrieval.
 * This problem is hard to reproduce though, when it comes to short term memory llms are actually good as is. The LLM has context of previous
 * conversations and can recall properly. To some extent you can see it also can extract information from past expriences.
 *
 * The gap starts becoming obvious when it needs to layer information from different time periods and finding connections between layers of memory.
 *
 * A sample scneario, is when you give it a file, it needs to reference conversations and files from history to be able to give you a high level briefing of what is happening.
 * This is opposed to today, where when you ask for summary of a file and you actually read the file, you don't get anything new.
 * I'll  try to build this scenario at different levels of complexity to get the maximum out of it.
 *
 * NEXT STEPS
 * 1. Prepare this scenario (Produce files and a mock project with personel, based on real timestamps, with a high level theme) (I need an intern)
 * 2. Build a proper retrieval system that is driven by the assistant.
 */
export async function runningMemory() {}

/**
 * The protocol in its vanilla form invokes chain of thought to some level of success. A good thing is that its really reusable and scalable
 * I want to add a layer of 'thinking' and the protocol becomes the execution layer.
 *
 * The hypothesis is that given a task:
 *
 * 1. Understand what it means to achieve the task.
 * 2. Based on the answer from 1, we can come up with a plan of how to attack the task.
 * 3. Based on the steps formulated, we can compare with the tooling available to come up with executions.
 * 4. (Run) We can revisit the plan after each execution step and re-plan.
 * 5. To replan means to identify what change we need to make to the current plan based on a logical reason.
 * 6. Eventually we will reach task completion.
 */
export async function thinkPlanExecute() {}

/**
 * @param {object} props
 * @param {string} props.systemPrompt Task guidelines for the llm.
 * @param {string} props.userMessage  User's tasks
 * @returns                           A readable stream of an llm's response.
 */
const llmStream = async ({ systemPrompt, userMessage }) => {
  const protocolPrompt = Get_AsyncProtocol_System_Prompt();

  const response = await client.responses.create({
    model: 'gpt-4o',
    input: [
      { role: 'developer', content: protocolPrompt },
      { role: 'developer', content: systemPrompt },
      { role: 'user', content: userMessage },
      { role: 'user', content: '<pass />' },
    ],
    store: true,
    stream: true,
    text: {
      format: { type: 'json_object' },
    },
  });

  return response.toReadableStream();
};

/**
 * Waits for a "response.output_text.done" event and chunks the response
 * adding it to the internal buffer
 * @param {import("stream").TransformOptions} options
 * @returns {Transform}
 */
const createReplyChunker = (options) => {
  return new Transform({
    ...options,
    objectMode: true,
    transform(chunk, _, cb) {
      const json = JSON.parse(new Buffer.from(chunk).toString());
      if (json['type'] === 'response.output_text.done') {
        this.push(json['text']);
      }
      cb();
    },
  });
};

/**
 * Logs each response
 * adding it to the internal buffer
 * @param {import("stream").StreamOptions} options
 * @returns {Transform}
 */
const createLogger = (options) => {
  return new PassThrough({ objectMode: true, ...options }).on(
    'data',
    (chunk) => {
      console.log(JSON.stringify(JSON.parse(chunk), null, 2));
    }
  );
};

/**
 * Apr 21, 2025
 *
 * The assistant API is fairly verbose. It sends multiple "assistant" messages per turn
 * When you read the response lazily, even if messages are in JSON, they are incorrectly appended and failing on the client.
 * One way around the issue is to stream the response and wait for "response.output_text.done" events and chunk the response.
 * This will be helpful especially especially when we expand the protocol.
 * It will allow models to "think in process" and for us to execute tools as the llm streams.
 * We will be able to invoke tools mid-stream and unlock more performance in our executor.
 * I need to investigate this behavior further
 *
 *
 * Apr 29, 2025
 *
 * I think I'm using the assistant api incorrectly. After revising the docs, I'll change this implementation to completions api
 * I'll start another side project using assistant api
 */
export async function asyncExecution() {
  const systemPrompt = getRepoSysPrompt(getRootpath('__samples__/remind'));
  const userMessage = process.argv[3] || 'What is the point of this repo?';
  const stream = await llmStream({ systemPrompt, userMessage });
  pipeline(
    stream,
    createReplyChunker({ objectMode: true }),
    createLogger({ objectMode: true }),
    (err) => err && console.error({ err })
  );
}
