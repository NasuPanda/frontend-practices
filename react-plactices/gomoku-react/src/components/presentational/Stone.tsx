import { FC } from "react";
import Box from "@mui/material/Box";

type Props = {
  color: "w" | "b";
};
const stoneStyles = {
  borderRadius: "50%",
  borderColor: "text.primary",
  border: 1,
  width: 30,
  height: 30
};

const Stone: FC<Props> = ({ color }) => {
  return <Box sx={stoneStyles} bgcolor={color === "b" ? "black" : "white"} />;
};

export const WhiteStone: FC = () => {
  return <Stone color={"w"} />;
};

export const BlackStone: FC = () => {
  return <Stone color={"b"} />;
};
