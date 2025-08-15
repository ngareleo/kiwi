import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

export const Toggle = ({
  children,
  pressed,
  onPressedChange,
  ...props
}: {
  children: React.ReactNode;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}) => {
  const [isPressed, setIsPressed] = useState(pressed || false);

  const handleClick = () => {
    const newPressed = !isPressed;
    setIsPressed(newPressed);
    onPressedChange?.(newPressed);
  };

  return (
    <Button
      variant={isPressed ? 'solid' : 'outline'}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};
