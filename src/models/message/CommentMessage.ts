import Message from "models/message/Message";

interface CommentMessage extends Message {
  id: string;
  body: string;
  noteLine: number;
  isResolved: boolean;
  authorId: string;
  parentId?: string;
}

export default CommentMessage;
