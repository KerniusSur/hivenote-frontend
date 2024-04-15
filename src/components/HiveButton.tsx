import { Button, ButtonProps, Typography } from "@mui/material";
import AppTheme from "AppTheme";

interface HiveButtonProps extends ButtonProps {
  text: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  compact?: boolean;
}

const HiveButton = (props: HiveButtonProps) => {
  const { text, startIcon, endIcon, ...other } = props;
  return (
    <Button
      fullWidth={!props.compact}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: props.compact
          ? props.variant === "outlined"
            ? "7px 19px"
            : "8px 20px"
          : "12px 24px",
      }}
      {...other}
    >
      {startIcon}
      <Typography
        variant="button"
      >
        {props.text}
      </Typography>
      {props.endIcon}
    </Button>
  );
};

export default HiveButton;
