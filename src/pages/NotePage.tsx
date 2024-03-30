import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "utils/tools";
import { OutputData } from "@editorjs/editorjs";
import "./Editor.css";
import { useCallback, useEffect, useRef } from "react";

interface NotePageProps {}

const NotePage = (props: NotePageProps) => {
  const { noteId } = useParams();
  const editorCore = useRef(null);

  const ReactEditor = createReactEditorJS();
  let value = {
    blocks: [
      {
        type: "header",
        data: {
          text: "New header",
          level: 2,
        },
      },
    ],
  };
  useEffect(() => {
    console.log(value);
  }, [value]);

  const blocks = [
    {
      type: "header",
      data: {
        text: "New header",
        level: 2,
      },
    },
  ];

  const handleInitialize = useCallback((instance: any) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    if (!editorCore.current) return;
    const savedData = await (editorCore.current as any).save();
    console.log(savedData);
  }, []);

  const defaultValue: OutputData = {
    blocks: blocks,
  };

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
        <ReactEditor
          value={value}
          holder="custom"
          onInitialize={handleInitialize}
          onChange={(value) => {
            console.log(value);
          }}
          placeholder="Start writing your note here..."
          defaultValue={defaultValue}
          tools={EDITOR_JS_TOOLS}
        >
          <Box id="custom" 
            sx={{
              width: "100%",
              boxSizing: "border-box",
              // border: "1px solid #0E0E0E",
              borderRadius: "8px",
              height: "100%",
              minHeight: "400px",
            }}
          />
        </ReactEditor>
      </Box>
    </Box>
  );
};

export default NotePage;
