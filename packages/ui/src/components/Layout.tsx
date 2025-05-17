import { Flex } from '@chakra-ui/react';
import * as React from 'react';

type Props = {
  header: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
  main: React.ReactNode;
};

export const Layout: React.FC<Props> = (props) => {
  return (
    <Flex>
      <Flex>{props.header}</Flex>
      <Flex>
        <Flex>{props.left}</Flex>
        <Flex>{props.main}</Flex>
        <Flex>{props.right}</Flex>
      </Flex>
    </Flex>
  );
};
