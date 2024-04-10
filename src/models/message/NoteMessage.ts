import LinkedList from "models/general/LinkedList";
import {
  default as CommentMessage,
  default as ComponentMessage,
} from "models/message/ComponentMessage";
import Message from "models/message/Message";

interface NoteMessage extends Message {
  id?: string;
  title?: string;
  coverUrl?: string;
  components: ComponentMessage[];
  // components: LinkedList<ComponentMessage>
  comments: CommentMessage[];
}

export default NoteMessage;
