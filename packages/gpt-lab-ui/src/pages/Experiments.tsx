import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const Experiments: React.FC = () => {
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('blue.200', 'blue.700');
  const textColor = useColorModeValue('blue.900', 'blue.100');
  const subtextColor = useColorModeValue('blue.800', 'blue.200');

  return (
    <Box p={8}>
      <Container maxW="4xl">
        <VStack spacing={8} py={12} textAlign="center">
          <Heading size="xl" color="gray.900">
            Welcome to Kiwi Devtools
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Select an experiment from the left sidebar to get started, or create
            a new one.
          </Text>
          <Box
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
            borderRadius="lg"
            p={6}
            textAlign="left"
            w="full"
          >
            <Heading size="lg" color={textColor} mb={3}>
              Getting Started
            </Heading>
            <List spacing={2} color={subtextColor}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Click on an experiment in the left sidebar to view its test
                cases
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Create new test cases to experiment with different inputs
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Execute test cases to see how your orchestrator responds
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                View logs and responses in real-time
              </ListItem>
            </List>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
