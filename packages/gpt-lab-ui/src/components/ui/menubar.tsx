import {
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export const Menubar = ({ children }: { children: React.ReactNode }) => {
  return <HStack>{children}</HStack>;
};

export const MenubarMenu = ({ children }: { children: React.ReactNode }) => {
  return <Menu>{children}</Menu>;
};

export const MenubarTrigger = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <MenuButton as={Button} variant="ghost" {...props}>
      {children}
    </MenuButton>
  );
};

export const MenubarContent = ({ children }: { children: React.ReactNode }) => {
  return <MenuList>{children}</MenuList>;
};

export const MenubarItem = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <MenuItem {...props}>{children}</MenuItem>;
};

export const MenubarCheckboxItem = ({
  children,
  checked,
  ...props
}: {
  children: React.ReactNode;
  checked?: boolean;
}) => {
  return (
    <MenuItemOption value="" isChecked={checked} {...props}>
      {children}
    </MenuItemOption>
  );
};

export const MenubarRadioItem = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <MenuItemOption value="" {...props}>
      {children}
    </MenuItemOption>
  );
};

export const MenubarLabel = ({ children }: { children: React.ReactNode }) => {
  return <MenuGroup title={children as string} />;
};

export const MenubarSeparator = () => <MenuDivider />;
export const MenubarShortcut = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const MenubarGroup = MenuGroup;
export const MenubarPortal = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const MenubarSub = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const MenubarSubContent = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const MenubarSubTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const MenubarRadioGroup = MenuOptionGroup;
