import GENERAL_EVENT from "models/events/GeneralEvents";
import NOTE from "models/events/NoteEvents";
import CommentMessage from "models/message/CommentMessage";
import ComponentMessage from "models/message/ComponentMessage";
import NoteMessage from "models/message/NoteMessage";
import RoomMessage from "models/message/RoomMessage";
import { Socket } from "socket.io-client";
import { socket } from "utils/HiveSocket";
import { create } from "zustand";

interface SocketStore {
  socket: Socket;
  note: NoteMessage | undefined;
  receivedMessages:
    | NoteMessage[]
    | ComponentMessage[]
    | CommentMessage[]
    | any[];
  joinRoom: (room: string) => Promise<boolean>;
  leaveRoom: (room: string) => Promise<boolean>;
}

const useSocketStore = create<SocketStore>((set, get) => {
  const newSocket = socket.on(
    NOTE.SERVER_EVENT.RETURN_NOTE,
    (message: NoteMessage) => {
      console.log("NOTE.SERVER_EVENT.RETURN_NOTE", message);
      set({ note: message });
    }
  );

  return {
    socket: newSocket,
    receivedMessages: [],
    note: undefined,
    joinRoom: async (room: string) => {
      const roomMessage: RoomMessage = {
        isJoining: true,
        room,
      };
      const socket = get().socket;

      const hasJoinedSuccessfully = await socket.emitWithAck(
        GENERAL_EVENT.ROOM_REQUEST,
        roomMessage
      );

      return hasJoinedSuccessfully;
    },
    leaveRoom: async (room: string) => {
      const roomMessage: RoomMessage = {
        room,
        isJoining: false,
      };

      const socket = get().socket;

      const hasLeftSuccessfully = await socket.emitWithAck(
        GENERAL_EVENT.ROOM_REQUEST,
        roomMessage
      );

      return hasLeftSuccessfully;
    },
  };
});

export default useSocketStore;
