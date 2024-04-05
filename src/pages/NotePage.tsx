import { Box, Input, Typography } from "@mui/material";
import {
  AccountPublicResponse,
  CommentResponse,
  NoteResponse,
} from "api/data-contracts";
import { Notes } from "api/Notes";
import HiveEditor from "components/HiveEditor";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
import { getSocketBaseUrl } from "utils";
import { createApi } from "utils/ApiCreator";
import useNoteStore from "utils/NoteStore";
import "../components/HiveEditor.css";
import "./Editor.css";
import useSocketStore, { ClientMessage, MessageType } from "utils/SocketStore";

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

export interface EditorBlock {
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

export type EditorComponentTypes = [
  "header",
  "paragraph",
  "list",
  "checklist",
  "image",
  "link",
];

export interface EditorData {
  time: number;
  blocks: EditorBlock[];
  version?: string;
}

export interface NoteDataItem {
  text?: string;
  checked?: boolean;
}

export interface OtherNoteData {
  id?: string;
  title?: string;
  coverUrl?: string;
  comments?: CommentResponse[];
  collaborators?: AccountPublicResponse[];
  isArchived?: boolean;
  isDeleted?: boolean;
}

const NotePage = (props: NotePageProps) => {
  const { noteId } = useParams();

  const noteAPI = useRef(createApi("note") as Notes);
  const { socket, isSocketConnected, sendMessage } = useSocketStore();
  const { setHasUpdates } = useNoteStore();

  // const [components, setComponents] = useState<any>(INITIAL_DATA);
  const [components, setComponents] = useState<EditorData>(INITIAL_DATA);
  const [otherNoteData, setOtherNoteData] = useState<
    OtherNoteData | undefined
  >();
  const [note, setNote] = useState<NoteResponse | undefined>();
  // const [isConnected, setIsConnected] = useState(
  //   socketRef.current?.connected || false
  // );
  const [isSaving, setIsSaving] = useState(false);
  // const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId]);

  const getNote = async () => {
    if (!noteId) return;
    const response = await noteAPI.current.findById(noteId);
    setNote(response);
    const otherData: OtherNoteData = {
      id: response.id,
      title: response.title,
      coverUrl: response.coverUrl,
      comments: response.comments,
      collaborators: response.collaborators,
      isArchived: response.isArchived,
      isDeleted: response.isDeleted,
    };
    // const socketURL = getSocketBaseUrl(noteId);
    // console.log("Socket URL: ", socketURL);
    // const newSocket = io(socketURL, {
    //   autoConnect: true,
    // });
    // newSocket.open();
    // setSocket(newSocket);

    setOtherNoteData(otherData);
  };

  const updateNote = async () => {
    if (
      !noteId ||
      !otherNoteData?.title ||
      (otherNoteData.title === note?.title &&
        otherNoteData.coverUrl === note?.coverUrl)
    )
      return;
    const response = await noteAPI.current.update({
      id: noteId,
      title: otherNoteData?.title,
      coverUrl: otherNoteData?.coverUrl,
      isArchived: otherNoteData?.isArchived,
      isDeleted: otherNoteData?.isDeleted,
    });
    setHasUpdates(true);
  };

  useEffect(() => {
    if (!otherNoteData) return;
    updateNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherNoteData?.title, otherNoteData?.coverUrl]);

  const handleDataChange = async (data: EditorData) => {
    console.log("Data changed: ", data.blocks);
    console.log("isSocketConnected: ", isSocketConnected);
    console.log("Socket: ", socket);
    setIsSaving(true);
    setComponents(data);

    if (!noteId) {
      console.error("Note ID not found");
      return;
    }

    const message: ClientMessage = {
      room: noteId,
      type: MessageType.CLIENT,
      message: "Note data changed",
      data: data.blocks,
    };

    if (socket && socket.connected) {
      console.log("Sending message: ", message);
        const res  = await sendMessage(message);
      console.log("Response: ", res);
    }

    // console.log("Sending message: ", message);
    // const response = await socketRef.current?.emitWithAck(
    //   "send_message",
    //   message
    // );
    // console.log("Response: ", response);
    // setIsSaving(false);
  };

  useEffect(() => {
    // console.log("Note ID: ", noteId);
    // if (!noteId) return;
    // const socketURL = getSocketBaseUrl(noteId);
    // console.log("Socket URL: ", socketURL);
    // socketRef.current = io(socketURL, {
    //   autoConnect: false,
    // });
    // socketRef.current.connect();

    // const onConnect = () => {
    //   setIsConnected(true);
    //   console.log("Connected to server");
    // };

    // const onDisconnect = () => {
    //   setIsConnected(false);
    //   console.log("Disconnected from server");
    // };

    const onGetMessage = (data: any) => {
      console.log("Message received: ", data);
    };

    const beforeLoad = async () => {
      console.log("Before load event");
      if (!noteId) return;
      // setIsSaving(true);
      const socketURL = getSocketBaseUrl(noteId);

      // setIsSaving(false);
    };

    // socketRef.current.on("connect", onConnect);
    // socketRef.current.on("disconnect", onDisconnect);
    // socketRef.current.on("get_message", onGetMessage);

    // const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
    //   console.log("Before unload event");
    //   if (!noteId) return;
    //   // event.preventDefault();

    //   // setIsSaving(true);
    //   const message = {
    //     room: noteId,
    //     type: "CLIENT",
    //     message: "Note data changed",
    //     data: components.blocks,
    //   };
    //   const response = await socketRef.current?.emitWithAck(
    //     "send_message",
    //     message
    //   );
    //   console.log("Response: ", response);
    //   // setIsSaving(false);
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    // return () => {
    //   // console.log("Cleanup");
    //   // socketRef.current?.off("connect", onConnect);
    //   // socketRef.current?.off("disconnect", onDisconnect);
    //   // socketRef.current?.off("get_message", onGetMessage);
    //   // socketRef.current?.disconnect();
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
  //     console.log("Before unload event");
  //     if (!noteId) return;
  //     event.preventDefault();

  //     setIsSaving(true);
  //     const message = {
  //       room: noteId,
  //       type: "CLIENT",
  //       message: "Note data changed",
  //       data: components.blocks,
  //     };
  //     const response = await socketRef.current?.emitWithAck(
  //       "send_message",
  //       message
  //     );
  //     console.log("Response: ", response);
  //     setIsSaving(false);
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "48px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Input
        id={"title-input-" + noteId}
        placeholder="Untitled"
        value={otherNoteData?.title !== "Untitled" ? otherNoteData?.title : ""}
        sx={{
          border: "none",
          ":before": {
            borderBottom: "none !important",
          },
          ":after": {
            borderBottom: "none !important",
          },
          fontFamily: "Roboto, sans-serif",
          fontSize: "40px",
          lineHeight: "120%",
          fontWeight: 600,
          color: "#000000",
        }}
        onChange={(e) => {
          setOtherNoteData({ ...otherNoteData, title: e.target.value });
        }}
      />
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
          {noteId && (
            <HiveEditor
              data={components}
              onChange={handleDataChange}
              editorblock={"editorjs-container"}
            />
          )}
        </Box>
      </Box>
      <Box>
        {components.blocks.map((block: any, index: number) => (
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
