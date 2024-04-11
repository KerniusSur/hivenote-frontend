import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import HiveButton from "components/HiveButton";

interface HiveDeleteConfirmDialogProps {
  open: boolean;
  objectName: string;
  handleClose: () => void;
  handleDelete: () => void;
}

const HiveDeleteConfirmDialog = (props: HiveDeleteConfirmDialogProps) => {
  const { open, objectName, handleClose, handleDelete } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDeleteClick = () => {
    handleDelete();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : "472px",
          margin: isMobile ? "16px" : "auto",
          padding: "2rem 1.5rem 1.5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          borderRadius: "1rem",
        },
      }}
      onClose={handleClose}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">Delete {objectName}</Typography>
        <IconButton onClick={handleClose}>
          <CloseRounded />
        </IconButton>
      </Box>
      <Typography variant="body1">
        Are you sure you want to delete {objectName}?<br />
        This will delete all data
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <HiveButton text="Cancel" color="secondary" onClick={handleClose} />
        <HiveButton
          text="Confirm"
          color="primary"
          onClick={handleDeleteClick}
        />
      </Box>
    </Dialog>
  );
};

export default HiveDeleteConfirmDialog;
