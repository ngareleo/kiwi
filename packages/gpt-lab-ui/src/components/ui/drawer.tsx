import {
  Drawer as ChakraDrawer,
  DrawerFooter as ChakraDrawerFooter,
  DrawerHeader as ChakraDrawerHeader,
  DrawerOverlay as ChakraDrawerOverlay,
  DrawerContent as ChakraDrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export const Drawer = ({
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
    <ChakraDrawer isOpen={isOpen} placement="right" onClose={onClose}>
      {children}
    </ChakraDrawer>
  );
};

export const DrawerTrigger = ({ children }: { children: React.ReactNode }) =>
  children;
export const DrawerPortal = ({ children }: { children: React.ReactNode }) =>
  children;
export const DrawerClose = DrawerCloseButton;
export const DrawerOverlay = ChakraDrawerOverlay;
export const DrawerContent = ChakraDrawerContent;
export const DrawerHeader = ChakraDrawerHeader;
export const DrawerFooter = ChakraDrawerFooter;
export const DrawerTitle = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const DrawerDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
