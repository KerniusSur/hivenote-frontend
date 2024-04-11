import { Box, Typography, useMediaQuery } from "@mui/material";
import moment from "moment";

interface WeekHeaderProps {
  date: Date;
}

export const WeekHeader = (props: WeekHeaderProps) => {
  const { date } = props;
  const today = moment();
  const isToday = moment(props.date).isSame(today, "day");
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="6px"
      sx={{
        cursor: "default",
      }}
    >
      <Typography
        variant="body1"
        fontSize={14}
        color={isWeekend(date) ? "text.light" : "text.tertiary"}
      >
        {moment(date).locale("LT").format("ddd")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          height: isMobile ? "30px" : "40px",
          width: isMobile ? "30px" : "40px",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isToday ? "rgba(0, 0, 0, 0.7)" : "transparent",
        }}
      >
        <Typography
          variant={isMobile ? "body1" : "h6"}
          fontWeight={isMobile ? 600 : 700}
          color={
            isToday
              ? "#FFFFFF"
              : isWeekend(date)
                ? "text.light"
                : "text.primary"
          }
        >
          {moment(date).format("DD")}
        </Typography>
      </Box>
    </Box>
  );
};

export default WeekHeader;

export const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
