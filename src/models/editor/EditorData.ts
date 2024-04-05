import EditorBlock from "models/editor/EditorBlock";

interface EditorData {
  time: number;
  blocks: EditorBlock[];
  version?: string;
}

export default EditorData;
