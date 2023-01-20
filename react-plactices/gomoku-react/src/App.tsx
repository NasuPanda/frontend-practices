import "./styles.css";
import Board from "./components/presentational/Board";
import WinnerIndicator from "./components/presentational/WinnerIndicator";
import PlayerIndicator from "./components/presentational/PlayerIndicator";

export default function App() {
  return (
    <div className="App">
      <Board h={10} w={10} />
    </div>
  );
}
