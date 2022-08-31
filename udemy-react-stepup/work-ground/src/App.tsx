import { FC } from 'react';
import './App.css';
import Greets from './components/Greets';

const App: FC = () => (
  <div className="App">
    <header className="App-header">
      <h2>Greets components</h2>
      <Greets name="Alice" times={4}>
        <p>foo bar</p>
      </Greets>
    </header>
  </div>
);

export default App;
