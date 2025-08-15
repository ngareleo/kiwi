import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Button,
  Text,
  Divider,
  Spinner,
  Center,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useExperiments } from '../hooks/useExperiments';
import { useTheme } from '../hooks/useTheme';

interface SidebarProps {
  onExperimentSelect: (id: string) => void;
  selectedExperimentId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onExperimentSelect,
  selectedExperimentId,
}) => {
  const { experiments, isLoading } = useExperiments();
  const { tokens } = useTheme();

  if (isLoading) {
    return (
      <Box
        w="280px"
        bg={tokens.colors.background.primary}
        borderRight="1px"
        borderColor={tokens.colors.border.primary}
        p={4}
      >
        <Center h="200px">
          <Spinner />
        </Center>
      </Box>
    );
  }

  return (
    <Box
      w="280px"
      bg={tokens.colors.background.primary}
      borderRight="1px"
      borderColor={tokens.colors.border.primary}
      p={4}
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md">Experiments</Heading>

        <Button leftIcon={<AddIcon />} colorScheme="brand" size="sm">
          New Experiment
        </Button>

        <Divider />

        <VStack spacing={2} align="stretch">
          {experiments.map((experiment) => (
            <Box
              key={experiment.id}
              p={2}
              borderRadius="md"
              cursor="pointer"
              bg={
                selectedExperimentId === experiment.id
                  ? tokens.colors.primary[50]
                  : 'transparent'
              }
              border={selectedExperimentId === experiment.id ? '1px' : 'none'}
              borderColor={tokens.colors.primary[200]}
              _hover={{ bg: tokens.colors.primary[50] }}
              onClick={() => onExperimentSelect(experiment.id)}
            >
              <VStack align="stretch" spacing={1}>
                <Text fontWeight="medium" fontSize="sm" noOfLines={1}>
                  {experiment.name}
                </Text>

                <HStack justify="space-between" align="center">
                  <Badge colorScheme="blue" size="sm" fontSize="xs">
                    {experiment.orchestrator}
                  </Badge>
                  <Text fontSize="xs" color={tokens.colors.text.tertiary}>
                    {experiment.testCases.length} test
                    {experiment.testCases.length !== 1 ? 's' : ''}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};
