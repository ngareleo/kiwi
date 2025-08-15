import { Select as ChakraSelect } from '@chakra-ui/react';
import React from 'react';

export const Select = ({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}) => {
  return (
    <ChakraSelect
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      {children}
    </ChakraSelect>
  );
};

export const SelectGroup = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <option value="">{placeholder}</option>
);
export const SelectTrigger = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const SelectLabel = ({ children }: { children: React.ReactNode }) => (
  <optgroup label={children as string} />
);
export const SelectItem = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => <option value={value}>{children}</option>;
export const SelectSeparator = () => null;
export const SelectScrollUpButton = () => null;
export const SelectScrollDownButton = () => null;
