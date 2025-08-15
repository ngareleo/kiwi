import {
  useToast as useChakraToast,
  createStandaloneToast,
} from '@chakra-ui/react';
import React from 'react';

const { ToastContainer, toast } = createStandaloneToast();

export const ToastProvider = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <ToastContainer />
  </>
);

export const ToastViewport = () => null;

export const Toast = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const ToastAction = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const ToastClose = () => null;
export const ToastTitle = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const ToastDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;

export const useToast = useChakraToast;

// Export types for compatibility
export type ToastActionElement = React.ReactNode;
export type ToastProps = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
