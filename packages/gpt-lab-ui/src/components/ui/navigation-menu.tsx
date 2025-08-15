import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
} from '@chakra-ui/react';
import React from 'react';

export const NavigationMenu = ({ children }: { children: React.ReactNode }) => {
  return <HStack>{children}</HStack>;
};

export const NavigationMenuList = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <HStack>{children}</HStack>;
};

export const NavigationMenuItem = Menu;

export const NavigationMenuTrigger = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <MenuButton as={Button} {...props}>
      {children}
    </MenuButton>
  );
};

export const NavigationMenuContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MenuList>{children}</MenuList>;
};

export const NavigationMenuLink = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <MenuItem {...props}>{children}</MenuItem>;
};

export const NavigationMenuViewport = () => null;
export const NavigationMenuIndicator = () => null;
