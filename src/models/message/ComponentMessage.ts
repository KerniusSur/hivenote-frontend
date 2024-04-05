import { ComponentProperties } from "api/data-contracts";
import ComponentType from "models/component/ComponentType";
import Message from "models/message/Message";

interface ComponentMessage extends Message {
  id?: string;
  componentType: ComponentType;
  properties: ComponentProperties;
}

export default ComponentMessage;
