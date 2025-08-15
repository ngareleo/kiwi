import {
  Avatar as ChakraAvatar,
} from '@chakra-ui/react';
import React from 'react';

export const Avatar = ChakraAvatar;

export const AvatarImage = ({ src, ...props }: { src: string }) => {
  return <ChakraAvatar src={src} {...props} />;
};

export const AvatarFallback = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return <ChakraAvatar name={children as string} {...props} />;
};
