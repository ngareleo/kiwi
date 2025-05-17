import { Box, Center, Heading } from '@chakra-ui/react';
import { Layout } from './components/Layout';
import { Root } from './Root';

function App() {
  return (
    <Root>
      <Layout
        main={
          <Center>
            <Heading>{'Kiwi devtools'}</Heading>
          </Center>
        }
        sidePane={<Box></Box>}
      />
    </Root>
  );
}

export default App;
