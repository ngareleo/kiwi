import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export const Dialog = ({
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
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};

export const DialogTrigger = ({ children }: { children: React.ReactNode }) =>
  children;
export const DialogPortal = ({ children }: { children: React.ReactNode }) =>
  children;
export const DialogClose = ModalCloseButton;
export const DialogOverlay = ModalOverlay;
export const DialogContent = ModalContent;
export const DialogHeader = ModalHeader;
export const DialogFooter = ModalFooter;
export const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const DialogDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
