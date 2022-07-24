import './App.css';
import Article from "./components/Article"
import TextInput from './components/TextInput';
import Counter from "./components/Counter"

function App() {
  return (
    <div>
      <Article
        title={"this is a title"}
        content={"contents"}
      />
      <TextInput></TextInput>
      <Counter></Counter>
    </div>
  );
}
export default App;
