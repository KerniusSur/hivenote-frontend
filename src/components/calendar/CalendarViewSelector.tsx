import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { View } from "react-big-calendar";

interface CalendarViewSelectorProps {
  selectedView: View;
  setSelectedView: (view: View) => void;
}

export const CalendarViewSelector = ({
  selectedView,
  setSelectedView,
}: CalendarViewSelectorProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        display: "flex",
        padding: "4px",
        boxSizing: "border-box",
        gap: "4px",
        backgroundColor: "#F4F4F5",
        borderRadius: "4px",
        width: isMobile ? "100%" : "fit-content",
      }}
    >
      <Button
        sx={{
          padding: "8px 16px",
          backgroundColor: selectedView === "day" ? "#FFF" : "#F4F4F5",
          transition: "all 0.3s ease",
          boxShadow:
            selectedView === "day"
              ? "0px 1px 4px 0px rgba(0, 0, 0, 0.19);"
              : "none",
          "&:hover": {
            opacity: 0.7,
            backgroundColor: "#FFF",
          },
          width: isMobile ? "100%" : "fit-content",
        }}
        onClick={() => setSelectedView("day")}
      >
        <Typography
          variant="body3"
          fontWeight={600}
          color={selectedView === "day" ? "text.primary" : "#585C65"}
        >
          Day
        </Typography>
      </Button>
      <Button
        sx={{
          padding: "8px 16px",
          backgroundColor: selectedView === "week" ? "#FFF" : "#F4F4F5",
          transition: "all 0.3s ease",
          boxShadow:
            selectedView === "week"
              ? "0px 1px 4px 0px rgba(0, 0, 0, 0.19);"
              : "none",
          "&:hover": {
            opacity: 0.7,
            backgroundColor: "#FFF",
          },
          width: isMobile ? "100%" : "fit-content",
        }}
        onClick={() => setSelectedView("week")}
      >
        <Typography
          variant="body3"
          fontWeight={600}
          color={selectedView === "week" ? "text.primary" : "#585C65"}
        >
          Week
        </Typography>
      </Button>
    </Box>
  );
};

export default CalendarViewSelector;
