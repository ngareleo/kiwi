import {
  Experiment,
  TestCase,
  Orchestrator,
  TestResult,
  ApiResponse,
} from '../types';
import { create } from 'zustand';

class DataStore {
  private experiments: Map<string, Experiment> = new Map();
  private orchestrators: Map<string, Orchestrator> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    this.initializeDefaultData();
  }

  private loadFromStorage() {
    try {
      const experimentsData = localStorage.getItem('kiwi-experiments');
      const orchestratorsData = localStorage.getItem('kiwi-orchestrators');

      if (experimentsData) {
        const experiments = JSON.parse(experimentsData);
        experiments.forEach((exp: any) => {
          exp.createdAt = new Date(exp.createdAt);
          exp.lastModified = new Date(exp.lastModified);
          exp.testCases = exp.testCases.map((tc: any) => ({
            ...tc,
            createdAt: new Date(tc.createdAt),
          }));
        });
        this.experiments = new Map(
          experiments.map((exp: Experiment) => [exp.id, exp])
        );
      }

      if (orchestratorsData) {
        const orchestrators = JSON.parse(orchestratorsData);
        this.orchestrators = new Map(
          orchestrators.map((orch: Orchestrator) => [orch.id, orch])
        );
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(
        'kiwi-experiments',
        JSON.stringify(Array.from(this.experiments.values()))
      );
      localStorage.setItem(
        'kiwi-orchestrators',
        JSON.stringify(Array.from(this.orchestrators.values()))
      );
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }

  private initializeDefaultData() {
    if (this.orchestrators.size === 0) {
      const kiwiV1: Orchestrator = {
        id: 'kiwi-v1',
        name: 'Kiwi V1',
        version: '1.0.0',
        description:
          'First generation orchestrator built on extension concepts',
        documentation: `# Kiwi V1 Orchestrator

## Overview
Kiwi V1 is the first generation orchestrator built heavily on the concept of extensions. Each extension adds capabilities to the base orchestrator.

## Extensions
- **Base Extension**: Core functionality
- **NLP Extension**: Natural language processing capabilities
- **Memory Extension**: Context and session management
- **Tool Extension**: External tool integration

## Configuration
Each extension accepts input settings that need to be passed during test case execution.

## Usage
Configure your test case settings based on the extensions you want to use.`,
        settingsSchema: {
          temperature: { type: 'number', default: 0.7, min: 0, max: 1 },
          maxTokens: { type: 'number', default: 1000, min: 1, max: 4000 },
          extensions: { type: 'array', default: ['base', 'nlp'] },
        },
      };
      this.orchestrators.set(kiwiV1.id, kiwiV1);
      this.saveToStorage();
    }

    if (this.experiments.size === 0) {
      const sampleExperiment: Experiment = {
        id: 'exp-1',
        name: 'Sample Experiment',
        description: 'A sample experiment to test the orchestrator',
        config: { environment: 'development' },
        lastModified: new Date(),
        createdAt: new Date(),
        orchestrator: 'kiwi-v1',
        systemPrompt:
          'You are a helpful AI assistant. Respond clearly and concisely.',
        formatPrompt:
          'Format your response in markdown with clear headers and bullet points.',
        testCases: [],
      };
      this.experiments.set(sampleExperiment.id, sampleExperiment);
      this.saveToStorage();
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // Experiments
  getExperiments(): Experiment[] {
    return Array.from(this.experiments.values());
  }

  getExperiment(id: string): Experiment | undefined {
    return this.experiments.get(id);
  }

  createExperiment(
    experiment: Omit<Experiment, 'id' | 'createdAt' | 'lastModified'>
  ): Experiment {
    const newExperiment: Experiment = {
      ...experiment,
      id: `exp-${Date.now()}`,
      createdAt: new Date(),
      lastModified: new Date(),
    };
    this.experiments.set(newExperiment.id, newExperiment);
    this.saveToStorage();
    this.notify();
    return newExperiment;
  }

  updateExperiment(id: string, updates: Partial<Experiment>): void {
    const experiment = this.experiments.get(id);
    if (experiment) {
      const updated = { ...experiment, ...updates, lastModified: new Date() };
      this.experiments.set(id, updated);
      this.saveToStorage();
      this.notify();
    }
  }

  // Test Cases
  createTestCase(
    experimentId: string,
    testCase: Omit<TestCase, 'id' | 'createdAt' | 'experimentId'>
  ): TestCase {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');

    const newTestCase: TestCase = {
      ...testCase,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    experiment.testCases.push(newTestCase);
    this.updateExperiment(experimentId, { testCases: experiment.testCases });
    return newTestCase;
  }

  updateTestCase(
    experimentId: string,
    testCaseId: string,
    updates: Partial<TestCase>
  ): void {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) return;

    const testCaseIndex = experiment.testCases.findIndex(
      (tc) => tc.id === testCaseId
    );
    if (testCaseIndex !== -1) {
      experiment.testCases[testCaseIndex] = {
        ...experiment.testCases[testCaseIndex],
        ...updates,
      };
      this.updateExperiment(experimentId, { testCases: experiment.testCases });
    }
  }

  // Orchestrators
  getOrchestrators(): Orchestrator[] {
    return Array.from(this.orchestrators.values());
  }

  getOrchestrator(id: string): Orchestrator | undefined {
    return this.orchestrators.get(id);
  }
}

export const dataStore = new DataStore();

interface ZustandStore {
  testCases: TestCase[];
  testResults: TestResult[];
  fetchTestCases: () => Promise<void>;
  fetchTestResults: (testCaseId: string) => Promise<void>;
}

export const useDataStore = create<ZustandStore>((set, get, store) => ({
  testCases: [],
  testResults: [],
  fetchTestCases: async () => {
    const response = await fetch('/api/testcases');
    const data: ApiResponse<TestCase[]> = await response.json();
    set({ testCases: data.data });
  },
  fetchTestResults: async (testCaseId: string) => {
    const response = await fetch(`/api/testcases/${testCaseId}/results`);
    const data: ApiResponse<TestResult[]> = await response.json();
    set({ testResults: data.data });
  },
}));
