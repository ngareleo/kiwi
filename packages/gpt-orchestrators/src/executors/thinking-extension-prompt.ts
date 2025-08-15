import {
  message,
  pass,
  protocol,
  respondingPhase,
  stepPlan,
  taskAnalysisReport,
  thinkingExtension,
  thinkingPhase,
  token,
} from '../constants';

export const Get_Thinking_Extension = () => `
# Protocol Thinking Extension.
- The ${protocol} has enabled the ${thinkingExtension}. This extension will allow you to analyze the user's ask to be able to provide quality responses.
- The name of the extension is 'thinking'.
- Once you're given the ${token} for the first time (When you see the ${pass} directive for the first time), you can invoke the "start_thinking" utility.
- This utility marks the start of the ${thinkingPhase}.
- During the ${thinkingPhase}, you can invoke additional utilities provided by the extension. 
- The extension requires you invoke the extensions's utilities in order.

# Terminology
- ${stepPlan}. This is an intenal ${protocol} buffer with steps you will take to complete the task. You will later use this buffer to accomplish your task.
- ${taskAnalysisReport}. This is a report you hand to the ${protocol} at the start of the ${thinkingPhase}

# Extension Instructions
- First, you must provide the ${protocol} with a ${taskAnalysisReport}. This is a summary of what you think the task you've been given is.
- You pass the report through the "send_report(report)" utility, where report is the summary.

- Second, you must come up with steps of how you will achieve the task in the report you passed in the previous step. 
- You must load these steps into the ${stepPlan} by invoking the "push_step(step)" utility, where step is a detailed instruction of what you need to do and what it will achieve. 
- TIP: Invoke "push_step(step)" multiple times in a single ${message} to optimise on time. Example
\`\`\`
{
    status: "OKAY",
    target: "thinking",
    message: "",
    commands: [
        { "utility-name": "push_step", args: ["Check dependencies"] },
        { "utility-name": "push_step", args: ["Read files"] },
        { "utility-name": "push_step", args: ["Analyse code"] },
        { "utility-name": "push_step", args: ["Respond"] },
        { "utility-name": "commit_steps", args: [] },
        { "utility-name": "pass_token", args: [] },
    ]
}
\`\`\`
- You must invoke the "commit_steps" utility to seal the ${stepPlan}. 
- Once sealed, the ${stepPlan} cannot be changed.

- Finally, you can invoke the "end_thinking" to quit out of the ${thinkingPhase} and move into the ${respondingPhase}.
- In the ${respondingPhase} you will refer to the ${stepPlan} and invoke tools from the ${protocol} according to the plan.

# Extension Utilities
- start_thinking()    - Invoke this utility to start the ${thinkingPhase}.
- send_report(report) - Use this utility to send the ${taskAnalysisReport} to the ${protocol}.
- push_step(step)     - Use this utility to add a step in the ${stepPlan}.
- commit_steps()      - Invoke this utility after committing all your steps to seal the ${stepPlan}.
- peek_steps()        - This tool can let you look into the ${stepPlan}.
- end_thinking()      - Invoke this utility to end the ${thinkingPhase}.
`;
