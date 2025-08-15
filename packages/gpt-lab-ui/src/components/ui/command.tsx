import { Input, VStack, Text, Box, Divider } from '@chakra-ui/react';
import React from 'react';

export const Command = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <VStack align="stretch" {...props}>
      {children}
    </VStack>
  );
};

export const CommandDialog = ({
  children,
  open,
}: {
  children: React.ReactNode;
  open?: boolean;
}) => {
  if (!open) return null;
  return <Box>{children}</Box>;
};

export const CommandInput = ({
  placeholder,
  ...props
}: {
  placeholder?: string;
}) => {
  return <Input placeholder={placeholder} {...props} />;
};

export const CommandList = ({ children }: { children: React.ReactNode }) => {
  return <VStack align="stretch">{children}</VStack>;
};

export const CommandEmpty = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text textAlign="center" py={4}>
      {children}
    </Text>
  );
};

export const CommandGroup = ({ children }: { children: React.ReactNode }) => {
  return <VStack align="stretch">{children}</VStack>;
};

export const CommandItem = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box p={2} cursor="pointer" _hover={{ bg: 'gray.100' }} {...props}>
      {children}
    </Box>
  );
};

export const CommandShortcut = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Text fontSize="sm" color="gray.500">
      {children}
    </Text>
  );
};

export const CommandSeparator = () => <Divider />;
