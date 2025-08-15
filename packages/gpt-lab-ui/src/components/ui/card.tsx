import React from 'react';
import { Box, BoxProps, Heading, Text } from '@chakra-ui/react';

export interface CardProps extends BoxProps {}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      shadow="sm"
      _dark={{ bg: 'gray.800' }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const CardHeader: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box p={6} pb={0} {...props}>
      {children}
    </Box>
  );
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Heading size="lg" mb={2}>
      {children}
    </Heading>
  );
};

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Text color="gray.600" fontSize="sm">
      {children}
    </Text>
  );
};

export const CardContent: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box p={6} {...props}>
      {children}
    </Box>
  );
};

export const CardFooter: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box p={6} pt={0} display="flex" alignItems="center" {...props}>
      {children}
    </Box>
  );
};
