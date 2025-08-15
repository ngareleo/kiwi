import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink,
  BreadcrumbSeparator as ChakraBreadcrumbSeparator,
} from '@chakra-ui/react';
import React from 'react';

export const Breadcrumb = ChakraBreadcrumb;
export const BreadcrumbList = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const BreadcrumbItem = ChakraBreadcrumbItem;
export const BreadcrumbLink = ChakraBreadcrumbLink;
export const BreadcrumbPage = ({ children }: { children: React.ReactNode }) => (
  <span>{children}</span>
);
export const BreadcrumbSeparator = ChakraBreadcrumbSeparator;
export const BreadcrumbEllipsis = () => <span>...</span>;
