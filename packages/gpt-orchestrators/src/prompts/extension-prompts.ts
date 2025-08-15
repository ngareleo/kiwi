import {
  message,
  pass,
  protocol,
  respondingPhase,
  stepPlan,
  system,
  taskAnalysisReport,
  thinkingExtension,
  thinkingPhase,
  token,
} from '../constants';

/**
 * Closing prompt instructs the LLM regarding quality of response
 * @returns The prompt
 */
export const Get_Closing_Prompt = () => `
Now that you have enough context to answer the user's question, you are free to respond. 

# Response Instructions
- Your response should be factual only using answers from the context you've just now collected
- The response should be clear
- The response should match the user's tone and energy
`;
