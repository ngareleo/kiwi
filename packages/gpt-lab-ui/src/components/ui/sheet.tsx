import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export const Sheet = ({
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
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      {children}
    </Drawer>
  );
};

export const SheetTrigger = ({ children }: { children: React.ReactNode }) =>
  children;
export const SheetClose = DrawerCloseButton;
export const SheetPortal = ({ children }: { children: React.ReactNode }) =>
  children;
export const SheetOverlay = DrawerOverlay;
export const SheetContent = DrawerContent;
export const SheetHeader = DrawerHeader;
export const SheetFooter = DrawerFooter;
export const SheetTitle = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const SheetDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
