import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CalendarViewSelector from "components/calendar/CalendarViewSelector";
import moment from "moment";
import { View } from "react-big-calendar";
import { hexToRgba } from "utils/ObjectUtils";
import { surfaceDark, surfaceLight } from "utils/theme/colors";

interface CalendarHeaderProps {
  selectedView: View;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setSelectedView: (view: View) => void;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { selectedView, selectedDate, setSelectedDate, setSelectedView } =
    props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  const handleNextWeek = () => {
    setSelectedDate(moment(selectedDate).add(1, "week").toDate());
  };

  const handlePreviousWeek = () => {
    setSelectedDate(moment(selectedDate).subtract(1, "week").toDate());
  };

  const handleNextMonth = () => {
    setSelectedDate(moment(selectedDate).add(1, "month").toDate());
  };

  const handlePreviousMonth = () => {
    setSelectedDate(moment(selectedDate).subtract(1, "month").toDate());
  };

  const handleNextDay = () => {
    setSelectedDate(moment(selectedDate).add(1, "day").toDate());
  };

  const handlePreviousDay = () => {
    setSelectedDate(moment(selectedDate).subtract(1, "day").toDate());
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      {!isMobile && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginRight: "auto",
              flex: 1.3,
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {selectedView !== "day" && (
                <Typography
                  variant="h4"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {moment(selectedDate).locale("LT").format("MMMM")}{" "}
                  {moment(selectedDate).format("YYYY")}
                </Typography>
              )}
              {selectedView === "week" && (
                <>
                  <Divider flexItem orientation="vertical" />
                  <Typography variant="h5" fontSize={18}>
                    {moment(selectedDate).format("w")} week
                  </Typography>
                </>
              )}
              {selectedView === "day" && (
                <Typography variant="h3" textTransform="capitalize">
                  {moment(selectedDate)
                    .weekday(selectedDate.getDay() - 1)
                    .locale("LT")
                    .format("ddd")}
                  , {moment(selectedDate).format("DD")}
                </Typography>
              )}
            </Box>
            <Box display="flex">
              <CalendarViewSelector
                selectedView={selectedView}
                setSelectedView={setSelectedView}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            gap="12px"
            flex={1}
            justifyContent="flex-end"
            alignItems="center"
            marginLeft="24px"
          >
            <IconButton
              sx={{
                padding: "12px",
                borderRadius: "12px",
                height: "44px",
                width: "44px",
                backgroundColor:
                  theme.palette.mode === "light"
                    ? surfaceLight.surfaceContainerHighest
                    : surfaceDark.surfaceContainerHighest,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? surfaceLight.surfaceContainerHigh
                      : surfaceDark.surfaceContainerHigh,
                },
              }}
              onClick={
                selectedView === "day"
                  ? handlePreviousDay
                  : selectedView === "week"
                    ? handlePreviousWeek
                    : handlePreviousMonth
              }
            >
              <ChevronLeftRounded color="primary" />
            </IconButton>
            <IconButton
              sx={{
                padding: "12px",
                borderRadius: "12px",
                height: "44px",
                width: "44px",
                backgroundColor:
                  theme.palette.mode === "light"
                    ? surfaceLight.surfaceContainerHighest
                    : surfaceDark.surfaceContainerHighest,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? surfaceLight.surfaceContainerHigh
                      : surfaceDark.surfaceContainerHigh,
                },
              }}
              onClick={
                selectedView === "day"
                  ? handleNextDay
                  : selectedView === "week"
                    ? handleNextWeek
                    : handleNextMonth
              }
            >
              <ChevronRightRounded color="primary" />
            </IconButton>
          </Box>
        </>
      )}
      {isMobile && (
        <Box display="flex" flexDirection="column" gap="16px" width="100%">
          <CalendarViewSelector
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="1rem"
          >
            <Box display="flex" alignItems="center" gap="16px">
              {selectedView !== "day" && (
                <Typography
                  variant="h4"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {moment(selectedDate).locale("LT").format("MMMM")}{" "}
                  {moment(selectedDate).format("YYYY")}
                </Typography>
              )}
              {selectedView === "day" && (
                <Typography variant="h4" textTransform="capitalize">
                  {moment(selectedDate)
                    .weekday(selectedDate.getDay())
                    .locale("LT")
                    .format("ddd")}
                  , {moment(selectedDate).format("DD")}
                </Typography>
              )}
            </Box>
            <Box
              display="flex"
              gap="12px"
              justifyContent="flex-end"
              alignItems="center"
              marginLeft="24px"
            >
              <IconButton
                sx={{
                  padding: "12px",
                  borderRadius: "12px",
                  height: "44px",
                  width: "44px",
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? surfaceLight.surfaceContainerHighest
                      : surfaceDark.surfaceContainerHighest,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? surfaceLight.surfaceContainerHigh
                        : surfaceDark.surfaceContainerHigh,
                  },
                }}
                onClick={
                  selectedView === "day"
                    ? handlePreviousDay
                    : selectedView === "week"
                      ? handlePreviousWeek
                      : handlePreviousMonth
                }
              >
                <ChevronLeftRounded color="primary" />
              </IconButton>
              <IconButton
                sx={{
                  padding: "12px",
                  borderRadius: "12px",
                  height: "44px",
                  width: "44px",
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? surfaceLight.surfaceContainerHighest
                      : surfaceDark.surfaceContainerHighest,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? surfaceLight.surfaceContainerHigh
                        : surfaceDark.surfaceContainerHigh,
                  },
                }}
                onClick={
                  selectedView === "day"
                    ? handleNextDay
                    : selectedView === "week"
                      ? handleNextWeek
                      : handleNextMonth
                }
              >
                <ChevronRightRounded />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CalendarHeader;
