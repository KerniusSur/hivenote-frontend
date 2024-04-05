enum ComponentTypeEnum {
  header = "header",
  paragraph = "paragraph",
  list = "list",
  checklist = "checklist",
  image = "image",
  link = "link",
}

type ComponentType = keyof typeof ComponentTypeEnum;

export { ComponentTypeEnum };
export default ComponentType;
