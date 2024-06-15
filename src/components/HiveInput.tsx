import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import {
  BaseTextFieldProps,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useField } from "formik";
import { useState } from "react";

interface HiveInputProps extends BaseTextFieldProps {
  name: string;
  title?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const HiveInput = (props: HiveInputProps) => {
  const { name, title, startIcon, endIcon, ...other } = props;
  const [field, meta, helpers] = useField(props.name);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const theme = useTheme();

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
          <Typography variant="body2">{props.title}</Typography>
        </Box>
      )}
      <TextField
        fullWidth
        variant="outlined"
        error={meta.touched && Boolean(meta.error)}
        InputLabelProps={{
          style: {
            marginTop: "-3px",
          },
        }}
        InputProps={{
          ...getInputProps(props.startIcon, props.endIcon),
          endAdornment: props.type === "password" && (
            <IconButton
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                color: theme.palette.text.secondary,
                marginRight: "-8px",
              }}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <VisibilityRounded />
              ) : (
                <VisibilityOffRounded />
              )}
            </IconButton>
          ),
        }}
        {...other}
        {...field}
        type={
          props.type === "password" && isPasswordVisible ? "text" : props.type
        }
      />
      {meta.touched && meta.error && (
        <Typography variant="body2" color="error.main">
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
