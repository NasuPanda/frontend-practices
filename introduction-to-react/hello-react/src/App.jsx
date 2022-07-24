import './App.css';
import Article from "./components/Article"
import TextInput from './components/TextInput';
import Counter from "./components/Counter"
import ToggleButton from './components/ToggleButton';

function App() {
  return (
    <div>
      <Article
        title={"this is a title"}
        content={"contents"}
      />
      <TextInput></TextInput>
      <Counter></Counter>
      <ToggleButton></ToggleButton>
    </div>
  );
}
export default App;
