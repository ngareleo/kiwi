import { Box } from '@chakra-ui/react';
import React from 'react';

export const ScrollArea = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box overflowY="auto" {...props}>
      {children}
    </Box>
  );
};

export const ScrollBar = () => null;
