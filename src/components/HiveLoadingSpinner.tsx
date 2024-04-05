import { Box, CircularProgress } from "@mui/material";

interface HiveLoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

const HiveLoadingSpinner = (props: HiveLoadingSpinnerProps) => {
  const { size = "medium" } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress
        color="primary"
        thickness={2}
        sx={{
          width:
            size === "small" ? "24px" : size === "medium" ? "36px" : "48px",
          height:
            size === "small" ? "24px" : size === "medium" ? "36px" : "48px",
        }}
      />
    </Box>
  );
};

export default HiveLoadingSpinner;
