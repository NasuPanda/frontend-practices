import { FC } from 'react';
import './App.css';
import PrimaryButton from './components/atoms/button/PrimaryButton';
import SearchInput from './components/molecules/SearchInput';

const App: FC = () => (
  <div className="App">
    <h2>Atoms</h2>
    <PrimaryButton>PrimaryButton</PrimaryButton>
    <br />
    <h2>Molecules</h2>
    <SearchInput />
  </div>
);

export default App;
