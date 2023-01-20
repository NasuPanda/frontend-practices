import { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type players = "w" | "b";
type Props = {
  currentPlayer: players;
};

const PlayerIndicator: FC<Props> = ({ currentPlayer }) => {
  return (
    <Box>
      {/* TODO : w or b で Stone を表示するように変更する */}
      <Typography>{currentPlayer}</Typography>
    </Box>
  );
};

export default PlayerIndicator;
