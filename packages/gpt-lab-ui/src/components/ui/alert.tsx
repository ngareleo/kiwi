import React from 'react';
import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle as ChakraAlertTitle,
  AlertDescription as ChakraAlertDescription,
} from '@chakra-ui/react';

export interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  const status = variant === 'destructive' ? 'error' : 'info';

  return (
    <ChakraAlert status={status} {...props}>
      <AlertIcon />
      {children}
    </ChakraAlert>
  );
};

export const AlertTitle = ChakraAlertTitle;
export const AlertDescription = ChakraAlertDescription;
