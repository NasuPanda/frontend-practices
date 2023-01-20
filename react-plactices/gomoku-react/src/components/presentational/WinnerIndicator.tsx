import { FC, useState } from "react";
import ResetButton from "./ResetButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

type displayPlayerNames = "プレイヤー白" | "プレイヤー黒";
type Props = {
  winner: displayPlayerNames;
};

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const WinnerIndicator: FC<Props> = ({ winner }) => {
  // モーダルの制御
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button onClick={handleOpen}>オープン</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography variant="h3">Result</Typography>
          <Typography variant="h5" mb={3}>
            勝者は {winner} です！
          </Typography>
          <ResetButton />
        </Box>
      </Modal>
    </>
  );
};

export default WinnerIndicator;
