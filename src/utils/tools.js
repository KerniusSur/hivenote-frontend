import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  // warning: Warning,
  // code: {
  //   class: Code,
  //   inlineToolbar: true,
  // },
  // inlineCode: InlineCode,
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching
    },
  },
  image: {
    class: SimpleImage,
    // on: ("keydown", (e: any) => {
    //       if (e.code === "Tab") {
    //         ref.current.blocks.insertNewBlock();
    //       }
    //     }   ),
    config: {
      endpoints: {
        byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
        byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      },
    },
  },
  raw: {
    class: Raw,
  },
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1,
      toolbox: {
        title: "Header",
        data: [
          {
            icon: "<b>H1</b>",
            level: 1,
          },
          {
            icon: "<b>H2</b>",
            level: 2,
          },
          {
            icon: "<b>H4</b>",
            level: 4,
          },
          {
            icon: "<b>H5</b>",
            level: 5,
          },
          {
            icon: "<b>H6</b>",
            level: 6,
          },
        ],
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  marker: {
    class: Marker,
    inlineToolbar: true,
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
    levels: [1, 2, 3, 4, 5, 6],
    defaultLevel: 1,
  },
  delimiter: {
    class: Delimiter,
    inlineToolbar: true,
  },
  simpleImage: {
    class: SimpleImage,
    inlineToolbar: true,
  },
};
