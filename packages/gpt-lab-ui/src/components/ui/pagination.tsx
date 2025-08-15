import { Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';

export const Pagination = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <HStack {...props}>{children}</HStack>;
};

export const PaginationContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <HStack>{children}</HStack>;
};

export const PaginationItem = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const PaginationLink = ({
  children,
  isActive,
  ...props
}: {
  children: React.ReactNode;
  isActive?: boolean;
}) => {
  return (
    <Button variant={isActive ? 'solid' : 'outline'} size="sm" {...props}>
      {children}
    </Button>
  );
};

export const PaginationPrevious = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <Button variant="outline" size="sm" {...props}>
      {children}
    </Button>
  );
};

export const PaginationNext = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <Button variant="outline" size="sm" {...props}>
      {children}
    </Button>
  );
};

export const PaginationEllipsis = () => {
  return <Text>...</Text>;
};
