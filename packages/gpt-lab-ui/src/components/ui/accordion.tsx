import {
  Accordion as ChakraAccordion,
  AccordionItem as ChakraAccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import React from 'react';

export const Accordion = ChakraAccordion;
export const AccordionItem = ChakraAccordionItem;

export const AccordionTrigger = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <AccordionButton {...props}>
      {children}
      <AccordionIcon />
    </AccordionButton>
  );
};

export const AccordionContent = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <AccordionPanel {...props}>{children}</AccordionPanel>;
};
