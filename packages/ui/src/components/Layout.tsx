import { Flex } from '@chakra-ui/react';
import * as React from 'react';

type Props = {
  sidePane: React.ReactNode;
  main: React.ReactNode;
};

export const Layout: React.FC<Props> = (props) => {
  return (
    <Flex>
      <Flex>{props.sidePane}</Flex>
      <Flex>{props.main}</Flex>
    </Flex>
  );
};
