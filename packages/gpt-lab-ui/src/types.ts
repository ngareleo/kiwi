export interface ExperimentConfig {
  environment: 'development' | 'staging' | 'production';
  settings?: Record<string, unknown>;
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  config: ExperimentConfig;
  lastModified: Date;
  createdAt: Date;
  orchestrator: string;
  systemPrompt: string;
  formatPrompt: string;
  testCases: TestCase[];
}

export interface TestCase {
  id: string;
  experimentId: string;
  name: string;
  description: string;
  settings: Record<string, unknown>;
  input: Record<string, unknown>;
  expectedOutput: Record<string, unknown>;
  utterance: string;
  response?: string;
  logs?: string[];
  status: 'pending' | 'running' | 'completed' | 'error';
  createdAt: Date;
  updatedAt: Date;
}

export interface TestResult {
  id: string;
  testCaseId: string;
  status: 'success' | 'failure' | 'error';
  output: Record<string, unknown>;
  error?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface OrchestratorSettings {
  temperature?: number;
  maxTokens?: number;
  extensions?: string[];
  [key: string]: unknown;
}

export interface Orchestrator {
  id: string;
  name: string;
  version: string;
  description: string;
  documentation: string;
  settingsSchema: OrchestratorSettings;
}

export interface StreamMessage {
  type: 'response' | 'log' | 'error' | 'complete';
  content: string;
  timestamp: Date;
}
