import "./styles.css";
import Board from "./components/presentational/Board";
import WinnerIndicator from "./components/presentational/WinnerIndicator";
import PlayerIndicator from "./components/presentational/PlayerIndicator";
import { WhiteStone, BlackStone } from "./components/presentational/Stone";

export default function App() {
  return (
    <div className="App">
      <PlayerIndicator currentPlayer={"w"} />
      <WhiteStone />
      <BlackStone />
    </div>
  );
}
