import { Box, IconButton, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

export const Carousel = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <Box {...props}>{children}</Box>;
};

export const CarouselContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <HStack>{children}</HStack>;
};

export const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <Box>{children}</Box>;
};

export const CarouselPrevious = ({ onClick }: { onClick?: () => void }) => {
  return (
    <IconButton
      aria-label="Previous"
      icon={<ChevronLeftIcon />}
      onClick={onClick}
      variant="outline"
      size="sm"
    />
  );
};

export const CarouselNext = ({ onClick }: { onClick?: () => void }) => {
  return (
    <IconButton
      aria-label="Next"
      icon={<ChevronRightIcon />}
      onClick={onClick}
      variant="outline"
      size="sm"
    />
  );
};

export type CarouselApi = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};
