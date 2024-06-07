import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import { Box, Input, useTheme } from "@mui/material";
import { NoteResponse } from "api/data-contracts";
import { Notes } from "api/Notes";
import AppTheme from "AppTheme";
import HiveEditor from "components/editor/HiveEditor";
import "components/editor/HiveEditor.css";
import HiveLoadingSpinner from "components/HiveLoadingSpinner";
import HiveNoteShareDialog from "components/HiveNoteShareDialog";
import EditorBlock from "models/editor/EditorBlock";
import EditorData from "models/editor/EditorData";
import NOTE from "models/events/NoteEvents";
import ComponentMessage from "models/message/ComponentMessage";
import MessageType from "models/message/MessageType";
import NoteMessage from "models/message/NoteMessage";
import NoteRequestMessage from "models/message/NoteRequestMessage";
import NoteAccessType from "models/note/NoteAccessType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createApi } from "utils/api/ApiCreator";
import useAuthStore from "utils/stores/AuthStore";
import useSocketStore from "utils/stores/SocketStore";
import "./Editor.css";

export interface NoteDataItem {
  text?: string;
  checked?: boolean;
}

const NotePage = () => {
  const { noteId } = useParams();
  const { socket, receivedMessages } = useSocketStore();
  const theme = useTheme();
  const noteAPI = createApi("note") as Notes;
  const account = useAuthStore((state) => state.account);

  const [noteMessage, setNoteMessage] = useState<NoteMessage | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editorData, setEditorData] = useState<EditorData | undefined>();
  const [testJsonOutput, setTestJsonOutput] = useState<string>("");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [note, setNote] = useState<NoteResponse | undefined>();
  const [isEditor, setIsEditor] = useState<boolean | undefined>(undefined);

  console.log("NotePage rerenedered");

  socket.on(NOTE.SERVER_EVENT.RETURN_NOTE, (message: NoteMessage) => {
    setNoteMessage(message);
    setEditorData(mapNoteToEditorData(message));
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

  const getNoteResponse = async () => {
    if (!noteId) {
      return;
    }
    setIsLoading(true);

    const response = await noteAPI.findById(noteId);
    setNote(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNote();
  }, [noteId, socket?.connected]);

  useEffect(() => {
    getNoteResponse();
  }, [noteId]);

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

    if (socket && socket.connected) {
      console.log("Socket is connected and is sending message", message);
      let res = await socket.emitWithAck(
        NOTE.CLIENT_EVENT.UPDATE_NOTE,
        message
      );
    }

    setNoteMessage(message);
  };

  const handleOpenShareDialog = () => {
    setIsShareDialogOpen(true);
  };

  const handleCloseShareDialog = () => {
    setIsShareDialogOpen(false);
  };

  const handleShareNote = async () => {};

  useEffect(() => {
    console.log("NotePage -> note", note);
    console.log("NotePage -> account", account);

    if (note && account) {
      const isEditor =
        note.collaborators.filter(
          (c) =>
            c.accessType !== NoteAccessType.VIEWER &&
            c.account?.id === account?.id
        ).length > 0;
      setIsEditor(isEditor);
      console.log("NotePage -> isEditor", isEditor);
    }

    return () => {
      setIsEditor(undefined);
    };
  }, [note, account]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Input
        id={"title-input-" + noteId}
        placeholder="Untitled"
        value={noteMessage?.title}
        disabled={!isEditor}
        sx={{
          fontFamily: "Roboto",
          fontSize: "36px",
          fontWeight: 700,
          lineHeight: "44px",
          border: "none",
          alignSelf: "center",
          ":before": {
            borderBottom: "none !important",
          },
          ":after": {
            borderBottom: "none !important",
          },
          "& .Mui-disabled": {
            color: theme.palette.text.primary,
            "-webkit-text-fill-color": theme.palette.text.primary,
          },
          paddingLeft: "1rem",
          marginBottom: "-1.5rem",
          paddingBottom: "1rem",
          paddingTop: "0.5rem",
          borderRadius: "12px 12px 0px 0px",
          width: "100%",
          maxWidth: "1400px",
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
          height: "100%",
        }}
      >
        <Box
          className="editor"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: AppTheme.palette.background.paper,
          }}
        >
          {isEditor !== undefined && editorData && !isLoading ? (
            <>
              {isEditor && (
                <HiveEditor
                  data={editorData}
                  onChange={handleNoteContentChange}
                  holder={"editorjs-container"}
                />
              )}
              {!isEditor && (
                <HiveEditor
                  data={editorData}
                  onChange={handleNoteContentChange}
                  holder={"editorjs-container"}
                  isReadOnly
                />
              )}
            </>
          ) : (
            <HiveLoadingSpinner size="large" />
          )}
        </Box>
        <HiveNoteShareDialog
          open={isShareDialogOpen}
          handleClose={handleCloseShareDialog}
          handleSubmit={handleShareNote}
        />
      </Box>
      {/* <Box>
        <Typography variant="h6">{testJsonOutput}</Typography>
      </Box> */}
    </Box>
  );
};

const mapNoteToEditorData = (note: NoteMessage): EditorData => {
  const editorData: EditorData = {
    time: 0,
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
        file: {
          url: component.properties.url || "",
        },
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
        url: block.data.file?.url,
      },
    };

    return component;
  });

  return components;
};

export default NotePage;
