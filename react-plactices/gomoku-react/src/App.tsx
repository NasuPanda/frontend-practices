import "./styles.css";
import Board from "./components/presentational/Board";
import WinnerIndicator from "./components/presentational/WinnerIndicator";

export default function App() {
  return (
    <div className="App">
      <WinnerIndicator winner={"プレイヤー白"} />
    </div>
  );
}
