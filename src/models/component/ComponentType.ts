enum ComponentTypeEnum {
  header = "header",
  paragraph = "paragraph",
  list = "list",
  checklist = "checklist",
  image = "image",
  link = "link",
  linkTool = "linkTool",
}

type ComponentType = keyof typeof ComponentTypeEnum;

export { ComponentTypeEnum };
export default ComponentType;
