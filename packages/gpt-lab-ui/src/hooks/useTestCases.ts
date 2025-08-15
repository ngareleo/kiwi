import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TestCase } from '../types';

export const useTestCases = (experimentId: string) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const { data: testCasesData } = useQuery({
    queryKey: ['testCases', experimentId],
    queryFn: async () => {
      // Mock data for now
      return [
        {
          id: '1',
          experimentId,
          name: 'Basic greeting',
          settings: {},
          utterance: 'Hello, I need help with my order',
          response:
            "Hello! I'd be happy to help you with your order. Could you please provide me with your order number?",
          logs: ['Processing request...', 'Generated response'],
          status: 'completed' as const,
          createdAt: new Date(),
        },
        {
          id: '2',
          experimentId,
          name: 'Complex issue',
          settings: {},
          utterance: 'I received the wrong item and want a refund',
          status: 'pending' as const,
          createdAt: new Date(),
        },
      ];
    },
  });

  useEffect(() => {
    if (testCasesData) {
      setTestCases(testCasesData);
    }
  }, [testCasesData]);

  return { testCases };
};
