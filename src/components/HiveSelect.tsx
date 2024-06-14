import { Box, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useField } from "formik";

interface Props {
  name: string;
  title?: string;
  options: HiveSelectOptions[];
}

const HiveSelect = (props: Props) => {
  const { name, title, options } = props;
  const [field, meta, helpers] = useField(name);
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
          <Typography variant="body3">{props.title}</Typography>
        </Box>
      )}
      <Select
        fullWidth
        error={meta.touched && Boolean(meta.error)}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        sx={{
          borderRadius: "8px",
        }}
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
