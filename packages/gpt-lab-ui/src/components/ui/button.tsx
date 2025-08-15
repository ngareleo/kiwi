import React from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export interface ButtonProps
  extends Omit<ChakraButtonProps, 'variant' | 'size'> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'default', size = 'default', asChild = false, ...props },
    ref
  ) => {
    const getVariant = () => {
      switch (variant) {
        case 'destructive':
          return 'solid';
        case 'outline':
          return 'outline';
        case 'secondary':
          return 'solid';
        case 'ghost':
          return 'ghost';
        case 'link':
          return 'link';
        default:
          return 'solid';
      }
    };

    const getColorScheme = () => {
      switch (variant) {
        case 'destructive':
          return 'red';
        case 'secondary':
          return 'gray';
        default:
          return 'blue';
      }
    };

    const getSize = () => {
      switch (size) {
        case 'sm':
          return 'sm';
        case 'lg':
          return 'lg';
        case 'icon':
          return 'sm';
        default:
          return 'md';
      }
    };

    return (
      <ChakraButton
        ref={ref}
        variant={getVariant()}
        colorScheme={
          variant !== 'ghost' && variant !== 'link'
            ? getColorScheme()
            : undefined
        }
        size={getSize()}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
