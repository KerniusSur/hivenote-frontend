import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { EventResponse } from "api/data-contracts";
import EventCreateEditForm from "components/EventCreateEditForm";
import CalendarEvent from "models/calendar/CalendarEvent";

interface EventCreateEditDialogProps {
  open: boolean;
  isEdit?: boolean;
  dialogTitle?: string;
  event?: EventResponse;
  newEvent?: CalendarEvent;
  handleSubmit: (values: any) => void;
  handleClose: () => void;
  handleCancel?: () => void;
}

const EventCreateEditDialog = (props: EventCreateEditDialogProps) => {
  const {
    open,
    isEdit,
    dialogTitle,
    event,
    newEvent,
    handleSubmit,
    handleClose,
    handleCancel,
  } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");

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
      <EventCreateEditForm
        isEdit={isEdit}
        event={event}
        newEvent={newEvent}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Dialog>
  );
};

export default EventCreateEditDialog;
