import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { EventResponse } from "api/data-contracts";
import { Events } from "api/Events";
import EventCreateEditForm from "components/event/EventCreateEditForm";
import CalendarEvent from "models/calendar/CalendarEvent";
import { useEffect, useRef, useState } from "react";
import { createApi } from "utils/api/ApiCreator";

interface EventCreateEditDialogProps {
  paramEventId?: string;
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
    paramEventId,
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

  const [eventResponse, setEvent] = useState<EventResponse | undefined>(
    undefined
  );

  const eventAPI = useRef(createApi("event") as Events);

  useEffect(() => {
    if (paramEventId) {
      // Fetch event by id
      console.log("Fetch event by id: ", paramEventId);
      handleFetchEvent();
    }
  }, [paramEventId]);

  const handleFetchEvent = async () => {
    if (paramEventId) {
      const response = await eventAPI.current.findById(paramEventId);
      setEvent(response);
    }
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
      {paramEventId && eventResponse && (
        <EventCreateEditForm
          isEdit={true}
          event={eventResponse}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}
      {!paramEventId && (
        <EventCreateEditForm
          isEdit={isEdit}
          event={event}
          newEvent={newEvent}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}
    </Dialog>
  );
};

export default EventCreateEditDialog;
