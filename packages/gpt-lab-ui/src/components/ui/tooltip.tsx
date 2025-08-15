import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react';
import React from 'react';

export const TooltipProvider = ({ children }: { children: React.ReactNode }) =>
  children;

export const Tooltip = ({
  children,
  ...props
}: TooltipProps & { children: React.ReactNode }) => {
  return <ChakraTooltip {...props}>{children}</ChakraTooltip>;
};

export const TooltipTrigger = ({ children }: { children: React.ReactNode }) =>
  children;

export const TooltipContent = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <div {...props}>{children}</div>;
};
