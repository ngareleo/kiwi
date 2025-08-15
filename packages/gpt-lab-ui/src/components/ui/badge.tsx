import React from 'react';
import {
  Badge as ChakraBadge,
  BadgeProps as ChakraBadgeProps,
} from '@chakra-ui/react';

export interface BadgeProps extends ChakraBadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  ...props
}) => {
  const getColorScheme = () => {
    switch (variant) {
      case 'secondary':
        return 'gray';
      case 'destructive':
        return 'red';
      case 'outline':
        return 'gray';
      default:
        return 'blue';
    }
  };

  const getVariant = () => {
    return variant === 'outline' ? 'outline' : 'solid';
  };

  return (
    <ChakraBadge
      colorScheme={getColorScheme()}
      variant={getVariant()}
      {...props}
    />
  );
};
