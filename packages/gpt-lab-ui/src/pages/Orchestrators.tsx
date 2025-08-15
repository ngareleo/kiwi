import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  Card,
  CardBody,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { useOrchestrators } from '../hooks/useOrchestrators';

export const Orchestrators: React.FC = () => {
  const { orchestrators } = useOrchestrators();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box p={8}>
      <Container maxW="6xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="xl" mb={4}>
              Orchestrators
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Available orchestrators for running experiments
            </Text>
          </Box>

          <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
            {orchestrators.map((orchestrator) => (
              <Card
                key={orchestrator.id}
                bg={bgColor}
                border="1px"
                borderColor={borderColor}
              >
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Box>
                      <Heading size="md" mb={2}>
                        {orchestrator.name}
                      </Heading>
                      <Badge colorScheme="brand">{orchestrator.version}</Badge>
                    </Box>
                    <Text color="gray.600">{orchestrator.description}</Text>
                    <Box>
                      <Heading size="sm" mb={2}>
                        Documentation
                      </Heading>
                      <Box
                        p={3}
                        bg="gray.50"
                        borderRadius="md"
                        fontSize="sm"
                        fontFamily="mono"
                      >
                        {orchestrator.documentation}
                      </Box>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};
