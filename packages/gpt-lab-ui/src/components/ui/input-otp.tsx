import { PinInput, PinInputField, HStack } from '@chakra-ui/react';
import React from 'react';

export const InputOTP = ({
  maxLength = 6,
  value,
  onChange,
  ...props
}: {
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <HStack>
      <PinInput value={value} onChange={onChange} {...props}>
        {Array.from({ length: maxLength }).map((_, index) => (
          <PinInputField key={index} />
        ))}
      </PinInput>
    </HStack>
  );
};

export const InputOTPGroup = ({ children }: { children: React.ReactNode }) => {
  return <HStack>{children}</HStack>;
};

export const InputOTPSlot = ({ index }: { index: number }) => {
  return <PinInputField />;
};

export const InputOTPSeparator = () => {
  return <span>-</span>;
};
