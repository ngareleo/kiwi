import {
  ExtensionHandler,
  ProtocolCommand,
} from './extension-based-executor-types';
import { Get_Thinking_Extension } from './thinking-extension-prompt';

export type ExtensionsInternalState = {
  active: boolean;
  status: 'open' | 'sealed';
  steps: string[];
  report: string;
};

type ThinkingExtensionUtilities =
  | 'start_thinking'
  | 'send_report'
  | 'push_step'
  | 'commit_steps'
  | 'peek_steps'
  | 'end_thinking';

export const thinkingExtension: ExtensionHandler<
  ExtensionsInternalState,
  ThinkingExtensionUtilities
> = {
  name: 'thinking',
  prompt: Get_Thinking_Extension(),
  init: ({ state }) => {
    const { set } = state();
    set(() => ({
      status: 'open',
    }));
  },
  handler: async ({
    commands,
    state,
    reportError,
    replyToCommand,
    sendMessage,
  }) => {
    const { set, get } = state();

    const handleStartThinkingCommand = (
      _command: ProtocolCommand<ThinkingExtensionUtilities>
    ) => {
      const { active } = get();
      if (active) {
        reportError('Thinking already in progress.');
      } else {
        set((prev) => ({
          ...prev,
          active: true,
        }));
      }
    };

    const handleSendReportCommand = (
      command: ProtocolCommand<ThinkingExtensionUtilities>
    ) => {
      const { active } = get();
      if (!active) {
        reportError(
          'You cannot send a report without activating thinking mode.You need to invoke the "start_thinking" utility first to do so.'
        );
      } else {
        const [report] = command['args'];
        set((prev) => ({ ...prev, report }));
      }
    };

    const handlePushStepCommand = (
      command: ProtocolCommand<ThinkingExtensionUtilities>
    ) => {
      const { active, status } = get();
      if (!active) {
        reportError(
          'You cannot send a report without activating thinking mode. You need to invoke the "start_thinking" utility first to do so.'
        );
      } else if (status === 'sealed') {
        reportError(
          'You cannot add a step once you comitted the steps. You need to invoke the "start_thinking" utility again to do so.'
        );
      } else {
        const [step] = command['args'];
        set((prev) => ({
          ...prev,
          steps: [...(prev.steps || []), step],
        }));
      }
    };

    const handlePeekStepsCommand = (
      command: ProtocolCommand<ThinkingExtensionUtilities>
    ) => {
      const { steps } = get();
      replyToCommand(command, JSON.stringify(steps, null, 2));
    };

    const handleCommitStepsCommand = (
      _command: ProtocolCommand<ThinkingExtensionUtilities>
    ) => {
      const { active } = get();
      if (!active) {
        reportError(
          'You cannot send a report without activating thinking mode. You need to invoke the "start_thinking" utility first to do so.'
        );
      } else {
        set((prev) => ({
          ...prev,
          status: 'sealed',
        }));
      }
    };

    const handleEndThinkingCommand = (
      _command: ProtocolCommand<ThinkingExtensionUtilities>
    ) => {
      const { active, report, steps } = get();
      if (!active) {
        reportError(
          'You cannot send a report without activating thinking mode.You need to invoke the "start_thinking" utility first to do so.'
        );
      } else {
        sendMessage(`
              You have reached the end of the thinking phase. Here is a summary of the task ahead of you.
                - The task requires you to ${report}
                - Here are the steps you've come up with
                  ${steps.map((step) => `- ${step}\n`)}`);

        set((prev) => ({
          ...prev,
          active: false,
        }));
      }
    };

    for (const command of commands) {
      switch (command['utility']) {
        case 'start_thinking': {
          handleStartThinkingCommand(command);
          break;
        }

        case 'send_report': {
          handleSendReportCommand(command);
          break;
        }

        case 'push_step': {
          handlePushStepCommand(command);
          break;
        }

        case 'commit_steps': {
          handleCommitStepsCommand(command);
          break;
        }

        case 'peek_steps': {
          // can be invoked outside the thinking mode.
          handlePeekStepsCommand(command);
          break;
        }

        case 'end_thinking': {
          handleEndThinkingCommand(command);
          break;
        }
      }
    }
  },
};
