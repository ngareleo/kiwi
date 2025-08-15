import { useState, useEffect } from 'react';

interface StreamingState {
  isStreaming: boolean;
  testCaseId: string;
  testCaseName: string;
  response: string;
  logs: string[];
  progress: number;
}

export const useStreamingExecution = () => {
  const [streamingState, setStreamingState] = useState<StreamingState>({
    isStreaming: false,
    testCaseId: '',
    testCaseName: '',
    response: '',
    logs: [],
    progress: 0,
  });

  const startStreaming = (testCaseId: string, testCaseName: string) => {
    setStreamingState({
      isStreaming: true,
      testCaseId,
      testCaseName,
      response: '',
      logs: [],
      progress: 0,
    });
  };

  const stopStreaming = () => {
    setStreamingState((prev) => ({
      ...prev,
      isStreaming: false,
    }));
  };

  useEffect(() => {
    if (!streamingState.isStreaming || !streamingState.testCaseId) return;

    const simulateStreaming = async () => {
      console.log(
        `Starting test execution for test case: ${streamingState.testCaseId}`
      );

      // Simulate initial logs
      setStreamingState((prev) => ({
        ...prev,
        logs: ['Initializing test case execution...'],
        progress: 10,
      }));

      await new Promise((resolve) => setTimeout(resolve, 500));

      setStreamingState((prev) => ({
        ...prev,
        logs: [...prev.logs, 'Processing user utterance...'],
        progress: 25,
      }));

      await new Promise((resolve) => setTimeout(resolve, 500));

      setStreamingState((prev) => ({
        ...prev,
        logs: [...prev.logs, 'Generating response...'],
        progress: 50,
      }));

      // Simulate streaming response
      const fullResponse =
        "Hello! I'd be happy to help you with your request. Let me process that information and provide you with a comprehensive response that addresses your needs.";

      for (let i = 0; i <= fullResponse.length; i += 3) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setStreamingState((prev) => ({
          ...prev,
          response: fullResponse.slice(0, i),
          progress: 50 + (i / fullResponse.length) * 40,
        }));
      }

      setStreamingState((prev) => ({
        ...prev,
        logs: [...prev.logs, 'Response generation completed'],
        progress: 100,
        isStreaming: false,
      }));

      console.log('Test case execution completed');
    };

    simulateStreaming();
  }, [streamingState.isStreaming, streamingState.testCaseId]);

  return {
    streamingState,
    startStreaming,
    stopStreaming,
  };
};
