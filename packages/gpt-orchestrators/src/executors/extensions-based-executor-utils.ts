import {
  ProtocolCommand,
  ProtocolMessage,
} from './extension-based-executor-types';

export const isValidProtocolMessage = (
  message: Record<string, unknown>
): message is ProtocolMessage => {
  return Object.hasOwn(message, 'status') &&
    Object.hasOwn(message, 'target') &&
    Object.hasOwn(message, 'message') &&
    Object.hasOwn(message, 'commands') &&
    (message.commands as ProtocolCommand[]).forEach(
      (command) =>
        Object.hasOwn(command, 'utility') && Object.hasOwn(command, 'args')
    )
    ? true
    : false;
};
