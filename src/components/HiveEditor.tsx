import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "config/editorToolsConfig";
import { memo, useEffect, useRef } from "react";

interface HiveEditorProps {
  data: any;
  onChange: (data: any) => void;
  editorblock: string;
}

const HiveEditor = ({ data, onChange, editorblock }: HiveEditorProps) => {
  const ref = useRef<EditorJS>();
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,
        autofocus: true,
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });

      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div id={editorblock} />;
};

export default memo(HiveEditor);
