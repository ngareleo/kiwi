import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Progress,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';

interface StreamingResponseProps {
  testCaseName: string;
  response: string;
  logs: string[];
  progress: number;
  isStreaming: boolean;
  onComplete: () => void;
  onCancel: () => void;
}

export const StreamingResponse: React.FC<StreamingResponseProps> = ({
  testCaseName,
  response,
  logs,
  progress,
  isStreaming,
  onComplete,
  onCancel,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const logBgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box p={6} bg={bgColor} h="full" overflow="auto">
      <VStack spacing={4} align="stretch" h="full">
        <HStack justify="space-between">
          <Heading size="md">Running: {testCaseName}</Heading>
          <HStack>
            <Button variant="outline" onClick={onCancel} size="sm">
              Cancel
            </Button>
            {!isStreaming && (
              <Button colorScheme="green" onClick={onComplete} size="sm">
                Complete
              </Button>
            )}
          </HStack>
        </HStack>

        <Progress value={progress} colorScheme="green" />

        <Box>
          <Text fontWeight="medium" mb={2}>
            Logs:
          </Text>
          <Box
            p={3}
            bg={logBgColor}
            borderRadius="md"
            border="1px"
            borderColor={borderColor}
            fontFamily="mono"
            fontSize="sm"
            maxH="150px"
            overflowY="auto"
          >
            {logs.map((log, index) => (
              <Text key={index} mb={1}>
                [{new Date().toLocaleTimeString()}] {log}
              </Text>
            ))}
          </Box>
        </Box>

        <Box flex={1}>
          <Text fontWeight="medium" mb={2}>
            Response:
          </Text>
          <Box
            p={4}
            bg={logBgColor}
            borderRadius="md"
            border="1px"
            borderColor={borderColor}
            minH="200px"
            flex={1}
          >
            <Text whiteSpace="pre-wrap">
              {response}
              {isStreaming && (
                <Text as="span" animation="pulse 1s infinite">
                  |
                </Text>
              )}
            </Text>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};
