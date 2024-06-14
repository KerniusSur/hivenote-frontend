import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ShareNoteForm, {
  ShareNoteFormValues,
} from "components/note/ShareNoteForm";

interface Props {
  open: boolean;
  dialogTitle?: string;
  handleSubmit: (values: ShareNoteFormValues) => void;
  handleClose: () => void;
}

const ShareNoteDialog = (props: Props) => {
  const { open, dialogTitle, handleSubmit, handleClose } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Dialog
      open={open}
      sx={{
        width: "100%",
        height: isMobile ? "100%" : "360px",
        minHeight: "360px",
        top: "calc(50% - 360px)",
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
      <Box
        sx={{
          display: "flex",
          padding: "2rem 2rem 1rem 2rem",
          boxSizing: "border-box",
          justifyContent: dialogTitle ? "space-between" : "flex-end",
        }}
      >
        {dialogTitle && <Typography variant="h4">{dialogTitle}</Typography>}
        <IconButton onClick={handleClose}>
          <CloseRounded />
        </IconButton>
      </Box>
      <ShareNoteForm handleSubmit={handleSubmit} />
    </Dialog>
  );
};

export default ShareNoteDialog;
