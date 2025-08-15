import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import React from 'react';

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <Menu>{children}</Menu>;
};

export const DropdownMenuTrigger = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <MenuButton {...props}>{children}</MenuButton>;
};

export const DropdownMenuContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MenuList>{children}</MenuList>;
};

export const DropdownMenuItem = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <MenuItem {...props}>{children}</MenuItem>;
};

export const DropdownMenuCheckboxItem = ({
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

export const DropdownMenuRadioItem = ({
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

export const DropdownMenuLabel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MenuGroup title={children as string} />;
};

export const DropdownMenuSeparator = () => <MenuDivider />;
export const DropdownMenuShortcut = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const DropdownMenuGroup = MenuGroup;
export const DropdownMenuPortal = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const DropdownMenuSub = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const DropdownMenuSubContent = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const DropdownMenuSubTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const DropdownMenuRadioGroup = MenuOptionGroup;
