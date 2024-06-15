import { Box, Typography, useMediaQuery } from "@mui/material";
import {
  DesktopTimePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useField } from "formik";
import { useState } from "react";

interface HiveTimePickerProps {
  title?: string;
  label: string;
  supportText?: string;
  isClockInterface?: boolean;
}

const HiveTimePicker = (props: HiveTimePickerProps) => {
  const { title, label, supportText, isClockInterface } = props;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Europe/Vilnius");

  const [field, meta, helper] = useField(label);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [value, setValue] = useState<string | null | undefined>(
    dayjs(field.value).toISOString()
  );

  const handleChange = (newValue: string | null | undefined) => {
    setValue(newValue);
    field.onChange({
      target: { name: label, value: dayjs(newValue).toDate() },
    });
  };

  const submitValue = (value: string | null | undefined) => {
    setValue(value);
    helper.setValue(dayjs(value).toDate());
    field.onChange({ target: { name: label, value: dayjs(value).toDate() } });
  };


  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "4px",
      }}
    >
      {title && (
        <Typography variant="body2">
          {title}
        </Typography>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {(isMobile || isClockInterface) && (
          <MobileTimePicker
            {...field}
            // variant='outlined'
            ampm={false}
            value={field.value ? (dayjs(field.value) as any) : null}
            format="HH:mm"
            slotProps={{
              mobilePaper: {
                sx: {
                  borderRadius: "4px",
                  "& .MuiTimePickerToolbar-hourMinuteLabel": {
                    "& .MuiButtonBase-root": {
                      background: "transparent !important",
                    },
                  },
                },
              },
            }}
            sx={{
              "& :hover": {
                outline: " !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3872E1 !important",
                },
              },
              "&:focus": {
                outline: "none !important",
                color: "text.primary",
                borderWidth: "1px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "13px 16px",
                height: "24px",
                color: "text.secondary",
              },
              "& .MuiInputBase-root": {
                ...inputStyle,
              },
            }}
            onChange={handleChange}
            onAccept={submitValue}
          />
        )}
        {!isMobile && !isClockInterface && (
          <DesktopTimePicker
            {...field}
            ampm={false}
            value={field.value ? (dayjs(field.value) as any) : null}
            format="HH:mm"
            slotProps={{
              desktopPaper: {
                sx: {
                  borderRadius: "4px",
                  "& .MuiTimePickerToolbar-hourMinuteLabel": {
                    "& .MuiButtonBase-root": {
                      background: "transparent !important",
                    },
                  },
                },
              },
            }}
            sx={{
              "& :hover": {
                outline: " !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3872E1 !important",
                },
              },
              "&:focus": {
                outline: "none !important",
                color: "text.primary",
                borderWidth: "1px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "13px 16px",
                height: "24px",
                color: "text.secondary",
              },
              "& .MuiInputBase-root": {
                ...inputStyle,
              },
            }}
            onChange={handleChange}
            onAccept={submitValue}
          />
        )}
      </LocalizationProvider>
      {supportText && (
        <Typography color="text.tertiary" variant="body1" fontSize={14}>
          {supportText}
        </Typography>
      )}
      {meta.touched && meta.error && (
        <Typography variant="h6" color="#EB0E0E">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

const inputStyle = {
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  gap: "12px",
  borderRadius: "4px",
};

export default HiveTimePicker;
