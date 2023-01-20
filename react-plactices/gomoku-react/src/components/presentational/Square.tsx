import { FC, SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import { WhiteStone, BlackStone } from "./Stone";
import { players } from "../../types";

type Props = {
  // 碁石は 白or黒or存在しない
  stone: players | null;
  onClick: (e: SyntheticEvent) => void;
};
const squareBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: 1,
  borderColor: "text.primary",
  borderRadius: 2,
  width: 50,
  height: 50,
  margin: 1
};

const Square: FC<Props> = ({ stone = "b", onClick }) => {
  return (
    <Box sx={squareBoxStyle} onClick={onClick}>
      {stone === "b" && <BlackStone />}
      {stone === "w" && <WhiteStone />}
    </Box>
  );
};

export default Square;
