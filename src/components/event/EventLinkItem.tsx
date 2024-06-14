import { Box, Typography } from "@mui/material";
import { EventResponse } from "api/data-contracts";

interface Props {
  event: EventResponse;
  handleClick: () => void;
}

const EventLinkItem = (props: Props) => {
  const { event, handleClick } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #e0e0e0",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box>
        <Typography variant="h6">{event.title}</Typography>
      </Box>
    </Box>
  );
};

export default EventLinkItem;
