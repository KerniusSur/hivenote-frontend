import { Box } from "@mui/material";
import { EventResponse } from "api/data-contracts";

interface Props {
  event: EventResponse;
  handleClick: () => void;
}

const EventLinkItem = (props: Props) => {
  const { event, handleClick } = props;
  return (
    <Box>
      <Box></Box>
    </Box>
  );
};

export default EventLinkItem;
