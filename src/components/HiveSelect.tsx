import {
  BaseSelectProps,
  Box,
  Chip,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import { CSSProperties } from "react";
import { toast } from "react-toastify";

interface Props extends BaseSelectProps {
  name: string;
  title?: string;
  options: HiveSelectOptions[];
  containerStyle?: CSSProperties;
}

const HiveSelect = (props: Props) => {
  const { name, title, options, ...other } = props;
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: SelectChangeEvent<typeof field.value>) => {
    const {
      target: { value },
    } = event;
    if (other.multiple) {
      if (field.value.length >= 5) {
        toast.error("You can link an event to a maximum of 5 notes");
      }

      (field.value as string[]).includes(value[1])
        ? helpers.setValue(
            field.value.filter((val: string) => val !== value[1])
          )
        : helpers.setValue([...field.value, value[1]]);
      return;
    }

    helpers.setValue(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
        ...props.containerStyle,
      }}
    >
      {props.title && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">{props.title}</Typography>
        </Box>
      )}
      <Select
        {...field}
        {...other}
        fullWidth
        error={meta.touched && Boolean(meta.error)}
        value={other.multiple ? [field.value] : field.value}
        onChange={handleChange}
        sx={{
          borderRadius: "8px",
        }}
        renderValue={(selected: any[]) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              width: "100%",
            }}
          >
            {console.log("selected", selected)}
            {selected[0].length > 0 &&
              selected[0].map((value: string, index: number) => (
                <Box
                  key={value}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label={
                      options.find((option) => option.value === value)?.label
                    }
                  />
                </Box>
              ))}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <Typography variant="body2" color="error.main">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export interface HiveSelectOptions {
  value: string | number;
  label: string;
}

export default HiveSelect;
