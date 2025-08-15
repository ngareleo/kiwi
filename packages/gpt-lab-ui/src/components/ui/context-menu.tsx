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

export const ContextMenu = ({ children }: { children: React.ReactNode }) => {
  return <Menu>{children}</Menu>;
};

export const ContextMenuTrigger = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <MenuButton as="div" {...props}>
      {children}
    </MenuButton>
  );
};

export const ContextMenuContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MenuList>{children}</MenuList>;
};

export const ContextMenuItem = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <MenuItem {...props}>{children}</MenuItem>;
};

export const ContextMenuCheckboxItem = ({
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

export const ContextMenuRadioItem = ({
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

export const ContextMenuLabel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MenuGroup title={children as string} />;
};

export const ContextMenuSeparator = () => <MenuDivider />;
export const ContextMenuShortcut = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const ContextMenuGroup = MenuGroup;
export const ContextMenuPortal = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const ContextMenuSub = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const ContextMenuSubContent = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const ContextMenuSubTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const ContextMenuRadioGroup = MenuOptionGroup;
