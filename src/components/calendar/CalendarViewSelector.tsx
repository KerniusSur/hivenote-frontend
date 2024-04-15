import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { View } from "react-big-calendar";
import {
  elevationDark,
  elevationLight,
  surfaceDark,
  surfaceLight,
} from "utils/theme/colors";

interface CalendarViewSelectorProps {
  selectedView: View;
  setSelectedView: (view: View) => void;
}

export const CalendarViewSelector = ({
  selectedView,
  setSelectedView,
}: CalendarViewSelectorProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        padding: "4px",
        boxSizing: "border-box",
        gap: "4px",
        backgroundColor:
          theme.palette.mode === "light"
            ? surfaceLight.surfaceContainerHighest
            : surfaceDark.surfaceContainerHighest,
        borderRadius: "4px",
        width: isMobile ? "100%" : "fit-content",
      }}
    >
      <Button
        sx={{
          padding: "8px 16px",
          backgroundColor:
            selectedView === "day"
              ? theme.palette.mode === "light"
                ? surfaceLight.surfaceContainer
                : surfaceDark.surfaceContainer
              : "transparent",
          transition: "all 0.3s ease",
          boxShadow:
            selectedView === "day"
              ? theme.palette.mode === "light"
                ? elevationLight.elevation1
                : elevationDark.elevation1
              : "none",
          width: isMobile ? "100%" : "fit-content",
        }}
        onClick={() => setSelectedView("day")}
      >
        <Typography
          variant="body3"
          fontWeight={600}
          color={selectedView === "day" ? "text.primary" : "text.disabled"}
        >
          Day
        </Typography>
      </Button>
      <Button
        sx={{
          padding: "8px 16px",
          backgroundColor:
            selectedView === "week"
              ? theme.palette.mode === "light"
                ? surfaceLight.surfaceContainer
                : surfaceDark.surfaceContainer
              : "transparent",
          transition: "all 0.3s ease",
          boxShadow:
            selectedView === "week"
              ? theme.palette.mode === "light"
                ? elevationLight.elevation1
                : elevationDark.elevation1
              : "none",
          "&:hover": {
            // opacity: 0.9,
          },
          width: isMobile ? "100%" : "fit-content",
        }}
        onClick={() => setSelectedView("week")}
      >
        <Typography
          variant="body3"
          fontWeight={600}
          color={selectedView === "week" ? "text.primary" : "text.disabled"}
        >
          Week
        </Typography>
      </Button>
    </Box>
  );
};

export default CalendarViewSelector;
