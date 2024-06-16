import { EventOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { EventResponse, NoteMinResponse } from "api/data-contracts";
import { elevationLight } from "utils/theme/colors";

interface Props {
  note: NoteMinResponse;
  handleClick: () => void;
}

const NoteLinkItem = (props: Props) => {
  const { note, handleClick } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #e0e0e0",
        cursor: "pointer",
        minWidth: "100px",
        borderRadius: "6px",
        width: "100%",
        boxShadow: elevationLight.elevation1,
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <EventOutlined
          sx={{
            width: "20px",
          }}
        />
        <Typography
          variant="body1"
          fontSize={18}
          sx={{
            fontStyle: "italic",
          }}
        >
          {note.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default NoteLinkItem;
