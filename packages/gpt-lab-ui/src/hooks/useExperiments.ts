import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Experiment } from '../types';

export const useExperiments = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  const { data: experimentsData, isLoading } = useQuery({
    queryKey: ['experiments'],
    queryFn: async () => {
      // Mock data for now
      return [
        {
          id: '1',
          name: 'Customer Support Bot',
          description: 'Testing customer support responses',
          config: {},
          lastModified: new Date('2024-01-15'),
          createdAt: new Date('2024-01-10'),
          orchestrator: 'kiwi-v1',
          systemPrompt: 'You are a helpful customer support agent.',
          formatPrompt: 'Respond in a friendly and professional manner.',
          testCases: [
            {
              id: '1',
              experimentId: '1',
              name: 'Basic greeting',
              settings: {},
              utterance: 'Hello',
              status: 'completed' as const,
              createdAt: new Date(),
            },
            {
              id: '2',
              experimentId: '1',
              name: 'Refund request',
              settings: {},
              utterance: 'I want a refund',
              status: 'pending' as const,
              createdAt: new Date(),
            },
          ],
        },
        {
          id: '2',
          name: 'Code Review Assistant',
          description: 'Automated code review suggestions',
          config: {},
          lastModified: new Date('2024-01-12'),
          createdAt: new Date('2024-01-08'),
          orchestrator: 'kiwi-v1',
          systemPrompt: 'You are an expert code reviewer.',
          formatPrompt: 'Provide constructive feedback on code quality.',
          testCases: [
            {
              id: '3',
              experimentId: '2',
              name: 'React component review',
              settings: {},
              utterance: 'Review this component',
              status: 'completed' as const,
              createdAt: new Date(),
            },
          ],
        },
      ];
    },
  });

  useEffect(() => {
    if (experimentsData) {
      setExperiments(experimentsData);
    }
  }, [experimentsData]);

  return { experiments, isLoading };
};
