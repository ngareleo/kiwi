import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';
import React from 'react';

export const HoverCard = ({ children }: { children: React.ReactNode }) => {
  return <Popover trigger="hover">{children}</Popover>;
};

export const HoverCardTrigger = PopoverTrigger;

export const HoverCardContent = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <PopoverContent {...props}>{children}</PopoverContent>;
};
