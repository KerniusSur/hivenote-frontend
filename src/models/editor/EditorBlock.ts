import ComponentType from "models/component/ComponentType";

interface EditorBlock {
  id?: string;
  type: ComponentType;
  data: {
    text?: string;
    level?: number;
    items?: EditorBlockDataItemType[] | string[];
    title?: string;
    message?: string;
    alignment?: string;
    caption?: string;
    html?: string;
    link?: string;
  };
}

export interface EditorBlockDataItemType {
  text?: string;
  checked?: boolean;
}

export default EditorBlock;
