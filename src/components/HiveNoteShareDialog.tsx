import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

interface HiveNoteShareDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

const HiveNoteShareDialog = (props: HiveNoteShareDialogProps) => {
  const { open, handleClose, handleSubmit } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");

  const onsSubmit = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      sx={{
        width: "100%",
      }}
      PaperProps={{
        sx: {
          maxWidth: isMobile ? "100%" : "1000px",
          maxHeight: isMobile ? "100%" : "817px",
          width: "100%",
          borderRadius: "12px",
          margin: isMobile ? "0" : "2rem",
          height: "100%",
          overflowX: "hidden",
        },
      }}
    >
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onsSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HiveNoteShareDialog;
