import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const NotFound: React.FC = () => {
  const { tokens } = useTheme();

  return (
    <Box p={8}>
      <Container maxW="4xl">
        <VStack spacing={8} py={12} textAlign="center">
          <Heading size="xl" color={tokens.colors.text.primary}>
            404 - Page Not Found
          </Heading>
          <Text fontSize="xl" mb={4}>
            We&apos;re sorry, but we can&apos;t find the page you&apos;re
            looking for.
          </Text>
          <Text color="gray.500" mb={8}>
            Let&apos;s get you back on track.
          </Text>
          <Box
            bg={tokens.colors.error[50]}
            border="1px"
            borderColor={tokens.colors.error[200]}
            borderRadius="lg"
            p={6}
            textAlign="center"
            w="full"
          >
            <Text color={tokens.colors.error[900]} mb={4}>
              It looks like you've wandered off the beaten path.
            </Text>
            <Button as={Link} to="/" colorScheme="blue" size="lg">
              Go Home
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default NotFound;
