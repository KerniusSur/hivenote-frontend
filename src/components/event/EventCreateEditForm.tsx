import { CancelOutlined, DeleteRounded } from "@mui/icons-material";
import {
  Box,
  Divider,
  SelectChangeEvent,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { EventResponse, NoteResponse } from "api/data-contracts";
import { Events } from "api/Events";
import { Notes } from "api/Notes";
import HiveButton from "components/HiveButton";
import HiveDatePicker from "components/HiveDatePicker";
import HiveDeleteConfirmDialog from "components/HiveDeleteConfirmDialog";
import HiveInput from "components/HiveInput";
import HiveSelect, { HiveSelectOptions } from "components/HiveSelect";
import HiveTimePicker from "components/HiveTimePicker";
import { Form, Formik, FormikHelpers } from "formik";
import CalendarEvent from "models/calendar/CalendarEvent";
import NoteAccessType from "models/note/NoteAccessType";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createApi } from "utils/api/ApiCreator";
import * as yup from "yup";

interface EventCreateEditFormProps {
  event?: EventResponse;
  isEdit?: boolean;
  newEvent?: CalendarEvent;
  handleSubmit: (
    values: EventFormValues,
    formikHelpers?: FormikHelpers<EventFormValues>
  ) => void;
  handleCancel?: () => void;
}

const EventCreateEditForm = (props: EventCreateEditFormProps) => {
  const { event, newEvent, isEdit, handleSubmit, handleCancel } = props;
  const eventAPI = useRef(createApi("event") as Events);
  const noteAPI = useRef(createApi("note") as Notes);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<NoteResponse[]>([]);
  const [noteOptions, setNoteOptions] = useState<HiveSelectOptions[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const query = {
      accessType: NoteAccessType.OWNER,
      accessType2: NoteAccessType.EDITOR,
    };
    const notes = await noteAPI.current.findAllFilteredBy(query);
    setNotes(notes);
    const noteOptions: HiveSelectOptions[] = notes.map((note) => ({
      value: note.id,
      label: note.title ?? "Untitled note",
    }));
    setNoteOptions(noteOptions);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!event) {
      return;
    }

    await eventAPI.current.delete(event.id);
    toast.success("Event deleted successfully");
  };

  const onSubmit = (
    values: EventFormValues,
    formikHelpers: FormikHelpers<EventFormValues>
  ) => {
    handleSubmit(values, formikHelpers);
  };

  return (
    <FormOuterContainer>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          newEvent
            ? getInitialValuesFromCalendarEvent(newEvent)
            : getInitialValues(event)
        }
        validationSchema={getValidationSchema()}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form
            style={{
              height: "100%",
            }}
          >
            <FormContainer>
              <HiveInput
                name="title"
                title="Title"
                placeholder="Title"
                required
              />
              <HiveInput
                name="description"
                title="Description"
                placeholder="Description"
                required
              />
              <HiveInput
                name="location"
                title="Location"
                placeholder="Location"
                required
              />
              <Divider
                orientation="horizontal"
                sx={{
                  marginTop: "1rem",
                  marginLeft: "0rem",
                }}
              />
              <HiveDatePicker title="Date" label="date" />
              <Box>
                <Typography variant="body2">Time</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <HiveTimePicker isClockInterface label="eventStart" />
                  <Typography variant="body1" alignSelf="center">
                    to
                  </Typography>
                  <HiveTimePicker isClockInterface label="eventEnd" />
                </Box>
                <HiveSelect
                  containerStyle={{
                    marginTop: "1rem",
                  }}
                  multiple
                  name="relatedToEvents"
                  title="Related to?"
                  options={noteOptions}
                />
              </Box>
            </FormContainer>
            <Box
              sx={{
                display: "flex",
                paddingBottom: "1rem",
                justifyContent:
                  handleCancel || isEdit ? "space-between" : "flex-end",
                width: "100%",
                position: "sticky",
                backgroundColor: "transparent",
                bottom: "0",
              }}
            >
              {!isEdit && handleCancel && (
                <HiveButton
                  compact
                  text="Cancel"
                  variant="outlined"
                  endIcon={<CancelOutlined />}
                  onClick={handleCancel}
                />
              )}
              {isEdit && (
                <HiveButton
                  compact
                  text="Delete"
                  variant="outlined"
                  startIcon={<DeleteRounded />}
                  onClick={handleDeleteDialogOpen}
                />
              )}
              <HiveButton
                compact
                text="Save"
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting || !formik.isValid}
              />
            </Box>
            {handleCancel && (
              <HiveDeleteConfirmDialog
                open={deleteDialogOpen}
                objectName="Event"
                handleClose={() => {
                  handleDeleteDialogClose();
                  handleCancel();
                }}
                handleDelete={handleDelete}
              />
            )}
          </Form>
        )}
      </Formik>
    </FormOuterContainer>
  );
};

export const FormOuterContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "1.5rem",
  boxSizing: "border-box",
  gap: "1rem",
  // backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  height: "100%",
}));

export const FormContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: "calc(100% - 36px)",
}));

const SectionContainer = styled(Box)(() => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    gap: "1rem",
    // backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    border: isMobile ? "none" : "1px solid #E9E9EB",
    padding: isMobile ? "0" : "1rem",
  };
});

export interface EventFormValues {
  title: string;
  description?: string;
  location?: string;
  date: Date | null;
  eventStart: Date | null;
  eventEnd: Date | null;
  relatedToEvents: string[];
}

const initialValues: EventFormValues = {
  title: "",
  description: "",
  location: "",
  date: null,
  eventStart: null,
  eventEnd: null,
  relatedToEvents: [],
};

const getInitialValues = (event?: EventResponse): EventFormValues => {
  if (!event) {
    return initialValues;
  }

  return {
    title: event.title,
    description: event.description,
    location: event.location,
    date: moment(event.eventStart).toDate(),
    eventStart: moment(event.eventStart).toDate(),
    eventEnd: moment(event.eventEnd).toDate(),
    relatedToEvents: event.notes.map((note) => note.id),
  };
};
const handleChange = (event: SelectChangeEvent<string[]>) => {
  const {
    target: { value },
  } = event;
  //  setPersonName(
  //    // On autofill we get a stringified value.
  //    typeof value === "string" ? value.split(",") : value
  //  );
};

const getInitialValuesFromCalendarEvent = (
  newEvent?: CalendarEvent
): EventFormValues => {
  if (!newEvent) {
    return initialValues;
  }

  return {
    title: newEvent.title,
    description: "",
    location: "",
    date: moment(newEvent.start).toDate(),
    eventStart: moment(newEvent.start).toDate(),
    eventEnd: moment(newEvent.end).toDate(),
    relatedToEvents: [],
  };
};

const getValidationSchema = () => {
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    location: yup.string().required("Location is required"),
    date: yup.date().required("Date is required"),
    eventStart: yup.date().required("Start time is required"),
    eventEnd: yup.date().required("End time is required"),
  });

  return validationSchema;
};

export default EventCreateEditForm;

interface StaticMobileButtonFooterProps {
  isEdit?: boolean;
  formik: FormikHelpers<EventFormValues>;
  handleDeleteClick: () => void;
}

export const StaticMobileButtonFooter = (
  props: StaticMobileButtonFooterProps
) => {
  const { isEdit, formik, handleDeleteClick } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
        padding: isMobile ? "1rem" : "none",
        paddingTop: isMobile ? "none" : "1.5rem",
        position: isMobile ? "fixed" : "none",
        bottom: isMobile ? "0" : "none",
        right: "0",
        gap: isMobile ? "1rem" : "1.5rem",
      }}
    >
      <Divider
        sx={{
          width: "calc(100% + 2rem)",
          marginRight: isMobile ? "-1rem" : "-1rem",
          marginTop: isMobile ? "-1rem" : "none",
        }}
      />
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: isEdit ? "space-between" : "flex-end",
          width: `calc(100% - 32px)`,
        }}
      >
        {isMobile && isEdit && (
          <HiveButton
            text="Delete"
            startIcon={<DeleteRounded />}
            variant="outlined"
            onClick={handleDeleteClick}
          />
        )}
        <HiveButton
          text={isEdit ? "Save" : "Create"}
          variant="contained"
          onClick={async () => formik.submitForm()}
        />
      </Box>
    </Box>
  );
};
