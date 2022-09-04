import './App.css';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme/theme';
import Router from './router/Router';

const App: FC = () => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
