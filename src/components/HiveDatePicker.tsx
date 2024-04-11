import { CalendarTodayRounded } from "@mui/icons-material";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useField } from "formik";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Vilnius");

interface HiveDatePickerProps {
  title?: string;
  label: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

const HiveDatePicker = (props: HiveDatePickerProps) => {
  const { title, label, minDate, maxDate, disabled } = props;
  const [field, meta] = useField(label);
  const [open, setOpen] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "4px",
      }}
      sx={{
        ":focus-visible": {
          outline: "none !important",
          color: "text.primary",
        },
      }}
    >
      {title && (
        <Typography
          variant="body1"
          fontWeight={600}
          fontSize={14}
          color="text.secondary"
        >
          {title}
        </Typography>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"lt"}>
        {!isMobile && (
          <DatePicker
            open={open}
            openTo="day"
            disablePast={false}
            disabled={disabled}
            maxDate={maxDate ? (dayjs(maxDate) as any) : null}
            minDate={minDate ? (dayjs(minDate) as any) : null}
            slotProps={{
              inputAdornment: {
                position: "end",
                component: () => (
                  <IconButton
                    disabled={disabled}
                    sx={{
                      marginRight: "-8px",
                    }}
                    onClick={handleOpen}
                  >
                    <CalendarTodayRounded />
                  </IconButton>
                ),
              },
            }}
            sx={{
              "& :hover": {
                outline: "none !important",
                color: "text.primary",
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px",
                paddingRight: "16px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "13px 0px 13px 16px",
                height: "24px",
                color: "text.secondary",
              },
            }}
            {...field}
            format="YYYY.MM.DD"
            value={field.value ? (dayjs(field.value) as any) : null}
            onChange={(value) =>
              field.onChange({
                target: { name: label, value: value?.toDate() },
              })
            }
            onClose={handleClose}
          />
        )}
        {isMobile && (
          <MobileDatePicker
            disablePast={false}
            disabled={disabled}
            maxDate={maxDate ? (dayjs(maxDate) as any) : null}
            minDate={minDate ? (dayjs(minDate) as any) : null}
            slotProps={{
              mobilePaper: {
                sx: {
                  borderRadius: "4px",
                },
              },
            }}
            sx={{
              "& :hover": {
                outline: "none !important",
                color: "text.primary",
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px",
                paddingRight: "16px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "13px 0px 13px 16px",
                height: "24px",
                color: "text.secondary",
              },
            }}
            {...field}
            format="YYYY.MM.DD"
            value={field.value ? (dayjs(field.value) as any) : null}
            onChange={(value) =>
              field.onChange({
                target: { name: label, value: value?.toDate() },
              })
            }
            onClose={handleClose}
          />
        )}
      </LocalizationProvider>
      {meta.touched && meta.error && (
        <Typography variant="h6" color="#EB0E0E">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default HiveDatePicker;
