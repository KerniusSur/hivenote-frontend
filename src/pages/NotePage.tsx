import { Box, Typography } from "@mui/material";
import { Note } from "api/Note";
import HiveEditor from "components/HiveEditor";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createApi } from "utils/ApiCreator";
import "../components/HiveEditor.css";
import "./Editor.css";
// import { socket } from "../socket";
import { ContactSupport, ContactSupportOutlined } from "@mui/icons-material";
import { io, Socket } from "socket.io-client";
import { getSocketBaseUrl } from "utils";

interface NotePageProps {}

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
    // {
    //   type: "image",
    //   data: {
    //     file: {
    //       url: "../assets/yes_yes.png",
    //     },
    //     caption: "Image caption",
    //     withBorder: true,
    //     withBackground: true,
    //     stretched: true,
    //   },
    // },
  ],
};

interface EditorBlock {
  id?: string;
  type: EditorComponentTypes | string;
  data: {
    text?: string;
    level?: number;
    items?: NoteDataItem[] | string[];
    title?: string;
    message?: string;
    alignment?: string;
    caption?: string;
    html?: string;
    link?: string;
  };
}

type EditorComponentTypes = [
  "header",
  "paragraph",
  "list",
  "checklist",
  "image",
  "link",
];

interface EditorData {
  time: number;
  blocks: EditorBlock[];
  version?: string;
}

interface NoteDataItem {
  text?: string;
  checked?: boolean;
}

const NotePage = (props: NotePageProps) => {
  const { noteId } = useParams();
  const socket = useRef<Socket | null>(null);

  const [data, setData] = useState<EditorData>(INITIAL_DATA);
  // const [data, setData] = useState<any>(INITIAL_DATA);
  const [isConnected, setIsConnected] = useState(
    socket.current?.connected || false
  );

  const noteAPI = useRef(createApi("note") as Note);

  const handleDataChange = (data: EditorData) => {
    console.log("Data changed: ", data.blocks);
    setData(data);

    if (!socket.current || socket.current.disconnected) {
      console.log("Not connected to server");
      return;
    }

    const message = {
      room: noteId,
      type: "CLIENT",
      message: "Note data changed",
      data: data.blocks,
    };

    console.log("Sending message: ", message);

    socket.current?.emit("send_message", message);
  };

  useEffect(() => {
    if (!noteId) return;
    const socketURL = getSocketBaseUrl(noteId);
    const currentSocket = io(socketURL, {
      autoConnect: true,
    });

    socket.current = currentSocket;

    const onConnect = () => {
      setIsConnected(true);
      console.log("Connected to server");
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    };

    const onGetMessage = (data: any) => {
      console.log("Message received: ", data);
    };

    currentSocket.on("connect", onConnect);
    currentSocket.on("disconnect", onDisconnect);
    currentSocket.on("get_message", onGetMessage);

    return () => {
      console.log("Cleanup");
      currentSocket.off("connect", onConnect);
      currentSocket.off("disconnect", onDisconnect);
      currentSocket.off("get_message", onGetMessage);
      currentSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!noteId) return;
      // save data to server
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          className="editor"
          style={{
            width: "100%",
          }}
        >
          <HiveEditor
            data={data}
            onChange={handleDataChange}
            editorblock="editorjs-container"
          />
        </Box>
      </Box>
      <Box>
        {data.blocks.map((block: any, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              border: "1px solid #0E0E0E",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">{block.type}</Typography>
            <Typography>{block.data.text}</Typography>
            <Typography variant="h6">{block.data.level}</Typography>
            {/* <Typography>{block.data.items}</Typography> */}
            {/* {block.data.items &&  
              // block.data.items.map((item: any, index: number) => (
              //   <Box key={index}>
              //     {typeof item === "string" ? (
              //       <Typography>{item}</Typography>
              //     ) : (
              //       <>
              //         <Typography>{item.text}</Typography>
              //         <Typography>{item.checked}</Typography>
              //       </>
              //     )}
              //   </Box>
              // ))}
            //  <Typography>{block.data.title}</Typography>
            // <Typography>{block.data.message}</Typography>
            // <Typography>{block.data.alignment}</Typography>
            // <Typography>{block.data.caption}</Typography>
            // <Typography>{block.data.html}</Typography> 
            */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NotePage;
