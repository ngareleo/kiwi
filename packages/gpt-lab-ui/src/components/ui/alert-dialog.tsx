import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogFooter as ChakraAlertDialogFooter,
  AlertDialogHeader as ChakraAlertDialogHeader,
  AlertDialogContent as ChakraAlertDialogContent,
  AlertDialogOverlay as ChakraAlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export const AlertDialog = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const { isOpen, onClose } = useDisclosure({
    isOpen: open,
    onClose: () => onOpenChange?.(false),
  });

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={React.createRef()}
    >
      {children}
    </ChakraAlertDialog>
  );
};

export const AlertDialogTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => children;
export const AlertDialogPortal = ({
  children,
}: {
  children: React.ReactNode;
}) => children;
export const AlertDialogOverlay = ChakraAlertDialogOverlay;
export const AlertDialogContent = ChakraAlertDialogContent;
export const AlertDialogHeader = ChakraAlertDialogHeader;
export const AlertDialogFooter = ChakraAlertDialogFooter;
export const AlertDialogTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const AlertDialogDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const AlertDialogAction = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => (
  <Button colorScheme="red" {...props}>
    {children}
  </Button>
);
export const AlertDialogCancel = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => (
  <Button variant="outline" {...props}>
    {children}
  </Button>
);
