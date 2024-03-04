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
      fullWidth
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
      {...other}
    >
      {startIcon}
      <Typography
        variant="button"
        sx={{
          color:
            props.variant === "contained"
              ? AppTheme.palette.white
              : AppTheme.palette.black,
          padding: props.compact ? "8px 20px" : "12px 24px",
        }}
      >
        {props.text}
      </Typography>
      {props.endIcon}
    </Button>
  );
};

export default HiveButton;
