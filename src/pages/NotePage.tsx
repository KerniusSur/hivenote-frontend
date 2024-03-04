import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

interface NotePageProps {}

const NotePage = (props: NotePageProps) => {
  const { noteId } = useParams();
  return (
    <Box>
      <Box>
        
      </Box>
    </Box>
  );
};

export default NotePage;
