import type { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import CountDownTimer from './components/CountDownTimer';
import './App.css';

const App: FC = () => (
  <>
    <Heading size="lg" as="h1" my={8}>
      {import.meta.env.VITE_APP_TITLE}
    </Heading>
    <CountDownTimer />
  </>
);

export default App;
