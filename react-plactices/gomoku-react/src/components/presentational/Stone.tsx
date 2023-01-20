import { FC } from "react";

const Stone: FC = () => {
  return <div />;
};

export const WhiteStone: FC = () => {
  return <Stone>白</Stone>;
};

export const BlackStone: FC = () => {
  return <Stone>黒</Stone>;
};
