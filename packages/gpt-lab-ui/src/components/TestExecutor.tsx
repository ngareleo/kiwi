import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';

interface TestExecutorProps {
  onComplete: () => void;
}

export const TestExecutor: React.FC<TestExecutorProps> = ({ onComplete }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Text>Executing test case...</Text>
        <Progress value={50} w="full" />
        <Box
          p={3}
          bg={bgColor}
          borderRadius="md"
          w="full"
          fontFamily="mono"
          fontSize="sm"
        >
          <Text>Response will appear here...</Text>
        </Box>
        <Button onClick={onComplete}>Complete</Button>
      </VStack>
    </Box>
  );
};
