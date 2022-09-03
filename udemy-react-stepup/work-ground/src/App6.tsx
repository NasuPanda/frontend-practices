import { FC } from 'react';
import './App.css';
import PrimaryButton from './components/atoms/button/PrimaryButton';
import SecondaryButton from './components/atoms/button/SecondaryButton';

const App: FC = () => (
  <div className="App">
    <h1>Hello</h1>
    <div>
      <PrimaryButton>Children</PrimaryButton>
      <PrimaryButton>検索</PrimaryButton>
    </div>
    <div>
      <SecondaryButton>Secondary</SecondaryButton>
    </div>
  </div>
);

export default App;
