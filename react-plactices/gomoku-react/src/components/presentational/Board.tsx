import { FC } from "react";
import Square from "./Square";
import Box from "@mui/material/Box";

type Props = {
  h: number;
  w: number;
};

const Board: FC<Props> = ({ h = 10, w = 10 }) => {
  return (
    <Box display="flex" flexDirection="column">
      {[...Array(h)].map(() => {
        return (
          <Box display="flex">
            {[...Array(w)].map(() => {
              return (
                <Square stone={"b"} onClick={() => console.log("click")} />
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export default Board;
