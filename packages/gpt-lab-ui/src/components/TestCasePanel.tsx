import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Button,
  Text,
  Divider,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { CloseIcon, AddIcon } from '@chakra-ui/icons';
import { useExperiments } from '../hooks/useExperiments';
import { useTestCases } from '../hooks/useTestCases';
import { useTheme } from '../hooks/useTheme';
import { TestCase } from '../types';

interface TestCasePanelProps {
  experimentId: string;
  onClose: () => void;
  onEditProperty: (property: string, value: string, title: string) => void;
  onRunTestCase: (testCaseId: string, testCaseName: string) => void;
}

export const TestCasePanel: React.FC<TestCasePanelProps> = ({
  experimentId,
  onClose,
  onEditProperty,
  onRunTestCase,
}) => {
  const { experiments } = useExperiments();
  const { testCases } = useTestCases(experimentId);
  const { tokens } = useTheme();

  const experiment = experiments.find((exp) => exp.id === experimentId);

  const handlePropertyClick = (
    property: string,
    value: string,
    title: string
  ) => {
    onEditProperty(property, value, title);
  };

  const handleRunTestCase = (testCase: TestCase) => {
    onRunTestCase(testCase.id, testCase.name);
  };

  return (
    <Box
      w="400px"
      bg={tokens.colors.background.primary}
      borderLeft="1px"
      borderColor={tokens.colors.border.primary}
      p={4}
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Heading size="md">Test Cases</Heading>
          <IconButton
            aria-label="Close panel"
            icon={<CloseIcon />}
            size="sm"
            variant="ghost"
            onClick={onClose}
          />
        </HStack>

        <HStack justify="space-between">
          <Button leftIcon={<AddIcon />} colorScheme="brand" size="sm" flex={1}>
            New Test Case
          </Button>
        </HStack>

        {experiment && (
          <>
            <VStack spacing={2} align="stretch">
              <Heading size="sm" color={tokens.colors.text.secondary}>
                Properties
              </Heading>

              <Text
                p={2}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: tokens.colors.background.tertiary }}
                onClick={() =>
                  handlePropertyClick(
                    'systemPrompt',
                    experiment.systemPrompt,
                    'System Prompt'
                  )
                }
                fontSize="sm"
              >
                System Prompt
              </Text>

              <Text
                p={2}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: tokens.colors.background.tertiary }}
                onClick={() =>
                  handlePropertyClick(
                    'formatPrompt',
                    experiment.formatPrompt,
                    'Format Prompt'
                  )
                }
                fontSize="sm"
              >
                Format Prompt
              </Text>
            </VStack>

            <Divider />
          </>
        )}

        <VStack spacing={3} align="stretch">
          {testCases.map((testCase) => (
            <Box
              key={testCase.id}
              p={3}
              borderRadius="md"
              border="1px"
              borderColor={tokens.colors.border.primary}
            >
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="medium" fontSize="sm">
                  {testCase.name}
                </Text>
                <Button
                  size="sm"
                  colorScheme="green"
                  variant="solid"
                  onClick={() => handleRunTestCase(testCase)}
                  _hover={{ transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                >
                  Run
                </Button>
              </HStack>
              <Text fontSize="xs" color={tokens.colors.text.secondary} mb={2}>
                {testCase.utterance}
              </Text>
              <Text
                fontSize="xs"
                color={
                  testCase.status === 'completed'
                    ? tokens.colors.success[500]
                    : tokens.colors.warning[500]
                }
                textTransform="capitalize"
              >
                {testCase.status}
              </Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};
