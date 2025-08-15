import React from 'react';
import { Box } from '@chakra-ui/react';

// Simple implementation without react-resizable-panels
export const ResizablePanelGroup = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}) => (
  <Box
    className={`flex h-full w-full ${
      props.direction === 'vertical' ? 'flex-col' : 'flex-row'
    } ${className || ''}`}
  >
    {children}
  </Box>
);

export const ResizablePanel = ({
  children,
  className,
  defaultSize,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  defaultSize?: number;
}) => (
  <Box
    className={className}
    flex={defaultSize ? `0 0 ${defaultSize}%` : 1}
    {...props}
  >
    {children}
  </Box>
);

export const ResizableHandle = ({
  className,
  withHandle,
  ...props
}: {
  className?: string;
  withHandle?: boolean;
}) => (
  <Box
    className={`w-px bg-gray-200 hover:bg-gray-300 cursor-col-resize ${className || ''}`}
    {...props}
  />
);
