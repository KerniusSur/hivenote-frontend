import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { surfaceLight } from "utils/theme/colors";

interface HiveSearchItemProps {
  title: string;
  description: string;
  handleClick: () => void;
  sx?: SxProps;
}

const HiveSearchItem = (props: HiveSearchItemProps) => {
  const { title, description, handleClick, sx } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "0.75rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        transition: "background-color 0.3s",
        ...sx,
      }}
      onClick={handleClick}
    >
      <Typography variant="label1">
        {title}
      </Typography>
      <Typography variant="label2">{description}</Typography>
    </Box>
  );
};

export default HiveSearchItem;
