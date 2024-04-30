import { InputBase, InputBaseProps, useTheme } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { surfaceLight } from "utils/theme/colors";
import * as yup from "yup";

interface HiveSearchProps extends InputBaseProps {
  name: string;
  hasResults: boolean;
}

const HiveSearchFormik = (props: HiveSearchProps) => {
  const { name, hasResults, ...other } = props;
  const [field] = useField(name);
  const formikContext = useFormikContext();

  return (
    <InputBase
      {...field}
      {...other}
      value={field.value}
      autoFocus
      fullWidth
      sx={{
        flex: 1,
        padding: "0!important",
        borderRadius: hasResults ? "1rem 1rem 0 0" : "16px",
        paddingLeft: "1rem",
        backgroundColor: surfaceLight.surfaceContainerHigh,
      }}
      placeholder="Search"
      inputProps={{
        "aria-label": "",
        sx: {
          padding: "1rem 1.5rem",
        },
      }}
      style={{
        margin: 0,
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          formikContext.submitForm();
        }
      }}
    />
  );
};

export default HiveSearchFormik;

export const HiveSearch = (props: HiveSearchProps) => {
  const { name, hasResults, ...other } = props;
  const theme = useTheme();

  return (
    <InputBase
      {...other}
      fullWidth
      autoFocus
      sx={{
        flex: 1,
        padding: "0!important",
        borderRadius: hasResults ? "1rem 1rem 0 0" : "16px",
        paddingLeft: "1rem",
        backgroundColor: theme.palette.background.paper,
      }}
      placeholder="Search"
      inputProps={{
        "aria-label": "",
        sx: {
          padding: "1.5rem 1.5rem",
        },
      }}
      style={{
        margin: 0,
      }}
    />
  );
};

export interface HiveSearchValues {
  searchString: string;
}

export const initialHiveSearchValues: HiveSearchValues = {
  searchString: "",
};

export const hiveSearchValidationSchema = yup.object().shape({
  searchString: yup.string(),
});
