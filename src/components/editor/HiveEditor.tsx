import EditorJS, { EditorConfig } from "@editorjs/editorjs";
import { Box, SxProps } from "@mui/material";
import { EDITOR_JS_TOOLS } from "config/editorToolsConfig";
import React, { memo, useEffect, useRef } from "react";
import "./HiveEditor.css";

interface HiveEditorProps extends EditorConfig {
  data: any;
  onChange: (data: any) => void;
  holderStyle?: React.CSSProperties;
  holderSx?: SxProps;
  isReadOnly?: boolean;
}

const HiveEditor = (props: HiveEditorProps) => {
  const { data, onChange, holder, isReadOnly, ...other } = props;
  const ref = useRef<EditorJS>();
  const holderRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        readOnly: isReadOnly,
        holder: holder,
        autofocus: true,
        ...other,
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          console.log("DATA:", data);
          onChange(data);
        },
      });

      ref.current = editor;
    }

    if (holder && typeof holder !== "string") {
      holderRef.current = holder;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return typeof holder === "string" ? (
    <Box id={holder} />
  ) : (
    <Box sx={{ width: "100%", height: "100%" }} ref={holderRef} />
  );
};

export default memo(HiveEditor);
