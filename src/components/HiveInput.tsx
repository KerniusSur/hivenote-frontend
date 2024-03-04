import {
  Box,
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
  Typography,
} from "@mui/material";
import { useField } from "formik";

interface HiveInputProps extends OutlinedTextFieldProps {
  name: string;
  title?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const HiveInput = (props: HiveInputProps) => {
  const { name, title, startIcon, endIcon, ...other } = props;
  const [field, meta, helpers] = useField(props.name);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
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
          <Typography variant="body3">{props.title}</Typography>
        </Box>
      )}
      <TextField
        fullWidth
        className="textfield-input"
        error={meta.touched && Boolean(meta.error)}
        InputLabelProps={{
          style: {
            marginTop: "-3px",
          },
        }}
        InputProps={{
          ...getInputProps(props.startIcon, props.endIcon),
        }}
        {...field}
        {...other}
      />
      {meta.touched && meta.error && (
        <Typography variant="body4" color="#EB0E0E">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default HiveInput;

const getInputAdornment = (position: "end" | "start", Icon?: JSX.Element) => {
  return Icon === undefined ? undefined : (
    <InputAdornment position={position}>{Icon}</InputAdornment>
  );
};

const getInputProps = (startIcon?: JSX.Element, endIcon?: JSX.Element) => {
  if (startIcon === undefined && endIcon === undefined) {
    return undefined;
  }
  const startAdornment = getInputAdornment("start", startIcon);
  const endAdornment = getInputAdornment("end", endIcon);
  if (startAdornment && endAdornment) {
    return {
      startAdornment: startAdornment,
      endAdornment: endAdornment,
    };
  } else if (startAdornment) {
    return {
      startAdornment: startAdornment,
    };
  } else if (endAdornment) {
    return {
      endAdornment: endAdornment,
    };
  }
};

HiveInput.defaultProps = {
  variant: "outlined",
};
