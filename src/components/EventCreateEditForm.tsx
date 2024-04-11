import { CancelOutlined, DeleteRounded } from "@mui/icons-material";
import { Box, Divider, styled, Typography, useMediaQuery } from "@mui/material";
import { EventResponse } from "api/data-contracts";
import { Events } from "api/Events";
import HiveButton from "components/HiveButton";
import HiveDatePicker from "components/HiveDatePicker";
import HiveDeleteConfirmDialog from "components/HiveDeleteConfirmDialog";
import HiveInput from "components/HiveInput";
import HiveTimePicker from "components/HiveTimePicker";
import dayjs from "dayjs";
import { Form, Formik, FormikHelpers } from "formik";
import CalendarEvent from "models/calendar/CalendarEvent";
import { useRef, useState } from "react";
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
  const { event, isEdit, handleSubmit, handleCancel } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const eventAPI = useRef(createApi("event") as Events);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

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
        initialValues={getInitialValues(event)}
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
              <SectionContainer
                sx={{
                  border: isMobile ? "none" : "1px solid #E9E9EB",
                  padding: isMobile ? "0" : "1rem",
                }}
              >
                <HiveDatePicker
                  title="Date"
                  label="date"
                  onChange={async (newDate: any) =>
                    formik.setFieldValue("date", dayjs(newDate).toDate())
                  }
                />
                <Box>
                  <Typography
                    variant="body1"
                    fontSize={14}
                    fontWeight={600}
                    color="text.secondary"
                  >
                    Time
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <HiveTimePicker isClockInterface label="startTime" />
                    <Typography variant="body1" alignSelf="center">
                      to
                    </Typography>
                    <HiveTimePicker isClockInterface label="endTime" />
                  </Box>
                </Box>
              </SectionContainer>
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
                handleClose={handleDeleteDialogClose}
                handleDelete={handleDelete}
              />
            )}
          </Form>
        )}
      </Formik>
    </FormOuterContainer>
  );
};

const FormOuterContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "1.5rem",
  boxSizing: "border-box",
  gap: "1rem",
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  height: "100%",
}));

const FormContainer = styled(Box)(() => ({
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
    backgroundColor: "#FFFFFF",
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
}

const initialValues: EventFormValues = {
  title: "",
  description: "",
  location: "",
  date: null,
  eventStart: null,
  eventEnd: null,
};

const getInitialValues = (event?: EventResponse): EventFormValues => {
  if (!event) {
    return initialValues;
  }

  return {
    title: event.title,
    description: event.description,
    location: event.location,
    date: new Date(event.eventStart),
    eventStart: new Date(event.eventStart),
    eventEnd: new Date(event.eventEnd),
  };
};

const getValidationSchema = () => {
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    location: yup.string().required("Location is required"),
    date: yup.date().required("Date is required"),
    startTime: yup.string().required("Start time is required"),
    endTime: yup.string().required("End time is required"),
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
        backgroundColor: "#FFFFFF",
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
            color="inherit"
            startIcon={<DeleteRounded />}
            onClick={handleDeleteClick}
          />
        )}
        <HiveButton
          text={isEdit ? "Save" : "Create"}
          color="primary"
          onClick={async () => formik.submitForm()}
        />
      </Box>
    </Box>
  );
};
