export type SupportedExtensions = 'thinking' | 'fs';
export type MainProtocolCommands = 'ready' | 'pass_token';

export type ProtocolMessage = {
  status: 'OKAY' | string;
  target: 'main' | SupportedExtensions;
  message: string;
  'final-response': string;
  commands: ProtocolCommand[];
};

export type ProtocolCommand<U = string> = {
  utility: MainProtocolCommands | U;
  args: string[];
};

export type ExtensionHandler<T = object, U = string> = {
  name: SupportedExtensions;
  prompt: string;
  init?: (args: { state: () => ExtensionInternalState<T> }) => void;
  handler: (context: ExtensionHandlerContext<T, U>) => Promise<void>;
};

export interface ExtensionHandlerContext<T = object, U = string> {
  commands: ProtocolCommand<U>[];

  /**
   * Allows an extension to send a non-error message to the protocol
   */
  sendMessage: (msg: string) => void;

  /**
   * Allows an extension to respond directly to the protocol
   */
  replyToCommand: (command: ProtocolCommand<U>, payload: string) => void;

  /**
   * Allows an extension to directly respond with error
   */
  reportError: (msg: string) => void;

  /**
   * Controls the executors internal buffer that holds messages
   */
  buffer: () => ExecutionBuffer;

  /**
   * Allows extensions to store internal state between turns
   */
  state: () => ExtensionInternalState<T>;
}

export type ExecutionBuffer = {
  push: (reply: string) => void;
  get: () => string[];
};

export type ExtensionInternalState<T> = {
  get: () => T;
  set: (reduce: (snapshot: Partial<T>) => Partial<T>) => void;
};
