import MessageType from "models/message/MessageType";

interface Message {
  type?: MessageType;
  room?: string;
}

export default Message;
