import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Orchestrator } from '../types';

export const useOrchestrators = () => {
  const [orchestrators, setOrchestrators] = useState<Orchestrator[]>([]);

  const { data: orchestratorsData } = useQuery({
    queryKey: ['orchestrators'],
    queryFn: async () => {
      // Mock data for now
      return [
        {
          id: 'kiwi-v1',
          name: 'Kiwi V1',
          version: '1.0.0',
          description: 'First generation orchestrator built on extensions',
          documentation:
            '# Kiwi V1\n\nThis is the first generation orchestrator...',
          settingsSchema: {},
        },
      ];
    },
  });

  useEffect(() => {
    if (orchestratorsData) {
      setOrchestrators(orchestratorsData);
    }
  }, [orchestratorsData]);

  return { orchestrators };
};
