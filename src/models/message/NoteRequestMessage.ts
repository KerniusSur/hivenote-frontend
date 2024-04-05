import Message from "models/message/Message";

interface NoteRequestMessage extends Message {
  id: string;
}

export default NoteRequestMessage;
