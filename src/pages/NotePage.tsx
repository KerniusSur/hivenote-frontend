import { Box, Input, Typography } from "@mui/material";
import HiveEditor from "components/HiveEditor";
import HiveLoadingSpinner from "components/HiveLoadingSpinner";
import EditorBlock from "models/editor/EditorBlock";
import EditorData from "models/editor/EditorData";
import NOTE from "models/events/NoteEvents";
import ComponentMessage from "models/message/ComponentMessage";
import MessageType from "models/message/MessageType";
import NoteMessage from "models/message/NoteMessage";
import NoteRequestMessage from "models/message/NoteRequestMessage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSocketStore from "utils/stores/SocketStore";
import { v4 as uuid } from "uuid";
import "../components/HiveEditor.css";
import "./Editor.css";
import LinkedListUtil from "utils/LinkedListUtil";
import LinkedList from "models/general/LinkedList";

export interface NoteDataItem {
  text?: string;
  checked?: boolean;
}

const NotePage = () => {
  const { noteId } = useParams();
  const { socket, receivedMessages } = useSocketStore();

  const [noteMessage, setNoteMessage] = useState<NoteMessage | undefined>();
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editorData, setEditorData] = useState<EditorData | undefined>();
  const [testJsonOutput, setTestJsonOutput] = useState<string>("");

  // socket.on(NOTE.SERVER_EVENT.RETURN_NOTE, (message: NoteMessage) => {
  socket.on("RETURN_NOTE", (message: NoteMessage) => {
    setNoteMessage(message);
    if (message.title) {
      setTitle(message.title);
    }
  });

  const fetchNote = async () => {
    setIsLoading(true);
    if (!socket?.connected || !noteId) {
      setIsLoading(false);
      return;
    }

    const noteRequest: NoteRequestMessage = {
      id: noteId,
      type: MessageType.CLIENT,
      room: noteId,
    };

    if (socket && socket.connected) {
      const response: NoteMessage = await socket.emitWithAck(
        NOTE.CLIENT_EVENT.FETCH_NOTE,
        noteRequest
      );

      console.log("fetchNote -> note", response);
      setNoteMessage(response);
      setEditorData(mapNoteToEditorData(response));
      setTestJsonOutput(JSON.stringify(response.components, null, 2));
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, socket?.connected]);

  useEffect(() => {
    console.log("Received messages: ", receivedMessages);
  }, [receivedMessages]);

  const handleNoteTitleChange = async (title: string, coverUrl?: string) => {
    if (!noteId || !editorData?.blocks) {
      toast.error("NoteId not found");
      return;
    }

    const message: NoteMessage = {
      id: noteId,
      title: title,
      coverUrl: coverUrl,
      components: getComponentListFromBlocks(editorData.blocks),
      type: MessageType.CLIENT,
      room: noteId,
      comments: [],
    };
    setTitle(title);

    if (socket && socket.connected) {
      console.log("Socket is connected and is sending message", message);
      socket.emit(NOTE.CLIENT_EVENT.UPDATE_NOTE, message);
    }
    setNoteMessage(message);
  };

  const handleNoteContentChange = async (data: EditorData) => {
    if (!noteId) {
      toast.error("Note ID not found");
      return;
    }

    const message: NoteMessage = mapEditorDataToNote(data, noteMessage);
    message.title = noteMessage?.title;
    message.coverUrl = noteMessage?.coverUrl;

    console.log("handleNoteComponentChange", message.title);

    if (socket && socket.connected) {
      console.log("Socket is connected and is sending message", message);
      let res = await socket.emitWithAck(
        NOTE.CLIENT_EVENT.UPDATE_NOTE,
        message
      );
    }

    setNoteMessage(message);
  };

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
        value={title}
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
          handleNoteTitleChange(e.target.value, noteMessage?.coverUrl);
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
          {editorData && !isLoading ? (
            <HiveEditor
              data={editorData}
              onChange={handleNoteContentChange}
              editorblock={"editorjs-container"}
            />
          ) : (
            <HiveLoadingSpinner size="large" />
          )}
        </Box>
      </Box>
      <Box>
        <Typography variant="h6">{testJsonOutput}</Typography>
      </Box>
    </Box>
  );
};

const mapNoteToEditorData = (note: NoteMessage): EditorData => {
  const editorData: EditorData = {
    time: 0,
    // blocks: getBlocksFromComponents(note.components),
    blocks: getBlockListFromComponents(note.components),
  };

  return editorData;
};

const getBlockListFromComponents = (
  components: ComponentMessage[]
): EditorBlock[] => {
  const blocks: EditorBlock[] = components.map((component) => {
    const block: EditorBlock = {
      id: component.id,
      type: component.componentType,
      data: {
        text: component.properties.text,
        level: component.properties.level,
        items: component.properties.items as any[],
        title: component.properties.title,
        message: component.properties.message,
        alignment: component.properties.alignment,
        caption: component.properties.caption,
        html: component.properties.html,
        link: component.properties.link,
      },
    };

    return block;
  });

  return blocks;
};

const mapEditorDataToNote = (
  data: EditorData,
  currentNote?: NoteMessage
): NoteMessage => {
  const note: NoteMessage = {
    id: currentNote?.id,
    room: currentNote?.room,
    title: currentNote?.title,
    coverUrl: currentNote?.coverUrl,
    type: MessageType.CLIENT,
    components: getComponentListFromBlocks(data.blocks),
    comments: [],
  };

  return note;
};

const getComponentListFromBlocks = (
  blocks: EditorBlock[]
): ComponentMessage[] => {
  let priority = 1;
  const components: ComponentMessage[] = blocks.map((block) => {
    const component: ComponentMessage = {
      id: block.id,
      priority: priority++,
      componentType: block.type,
      properties: {
        text: block.data.text,
        level: block.data.level,
        items: block.data.items as any[],
        title: block.data.title,
        message: block.data.message,
        alignment: block.data.alignment,
        caption: block.data.caption,
        html: block.data.html,
        link: block.data.link,
      },
    };

    return component;
  });

  return components;
};

//  <Box>
//    {editorData?.blocks.map((block: any, index: number) => (
//      <Box
//        key={index}
//        sx={{
//          display: "flex",
//          flexDirection: "column",
//          gap: "4px",
//          border: "1px solid #0E0E0E",
//          borderRadius: "8px",
//        }}
//      >
//        <Typography variant="h6">{block.type}</Typography>
//        <Typography>{block.data.text}</Typography>
//        <Typography variant="h6">{block.data.level}</Typography>
//        {/* <Typography>{block.data.items}</Typography> */}
//        {/* {block.data.items &&
//               // block.data.items.map((item: any, index: number) => (
//               //   <Box key={index}>
//               //     {typeof item === "string" ? (
//               //       <Typography>{item}</Typography>
//               //     ) : (
//               //       <>
//               //         <Typography>{item.text}</Typography>
//               //         <Typography>{item.checked}</Typography>
//               //       </>
//               //     )}
//               //   </Box>
//               // ))}
//             //  <Typography>{block.data.title}</Typography>
//             // <Typography>{block.data.message}</Typography>
//             // <Typography>{block.data.alignment}</Typography>
//             // <Typography>{block.data.caption}</Typography>
//             // <Typography>{block.data.html}</Typography>
//             */}
//      </Box>
//    ))}
//  </Box>;

export default NotePage;