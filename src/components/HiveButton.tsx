import { Button, ButtonProps, Typography } from "@mui/material";

interface HiveButtonProps extends ButtonProps {
  text: string;
  compact?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const HiveButton = (props: HiveButtonProps) => {
  const { text, startIcon, compact = false, endIcon, ...other } = props;
  return (
    <Button
      fullWidth={!compact}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: compact
          ? props.variant === "outlined"
            ? "7px 19px"
            : "8px 20px"
          : "12px 24px",
      }}
      {...other}
    >
      {startIcon}
      <Typography variant="button">{props.text}</Typography>
      {props.endIcon}
    </Button>
  );
};

export default HiveButton;
