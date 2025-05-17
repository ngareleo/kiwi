import { Header, Layout, LeftPane, MainPane, RightPane } from './components';
import { Root } from './Root';

function App() {
  return (
    <Root>
      <Layout
        main={<MainPane />}
        left={<LeftPane />}
        right={<RightPane />}
        header={<Header />}
      />
    </Root>
  );
}

export default App;
