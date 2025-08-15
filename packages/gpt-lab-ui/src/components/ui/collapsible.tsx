import { Collapse, useDisclosure } from '@chakra-ui/react';
import React from 'react';

export const Collapsible = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <div {...props}>{children}</div>;
};

export const CollapsibleTrigger = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return <div {...props}>{children}</div>;
};

export const CollapsibleContent = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  isOpen?: boolean;
}) => {
  return (
    <Collapse in={props.isOpen} {...props}>
      {children}
    </Collapse>
  );
};
