import GENERAL_EVENT from "models/events/GeneralEvents";
import CommentMessage from "models/message/CommentMessage";
import ComponentMessage from "models/message/ComponentMessage";
import NoteMessage from "models/message/NoteMessage";
import RoomMessage from "models/message/RoomMessage";
import { io, Socket } from "socket.io-client";
import { getSocketBaseUrl } from "utils";
import { create } from "zustand";

interface SocketStore {
  socket?: Socket;
  note: NoteMessage | undefined;
  receivedMessages:
    | NoteMessage[]
    | ComponentMessage[]
    | CommentMessage[]
    | any[];
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
  // init: (noteId?: string) => void;
}

const useSocketStore = create<SocketStore>((set, get) => ({
  socket: io(getSocketBaseUrl(), {
    autoConnect: true,
  }),
  receivedMessages: [],
  note: undefined,
  joinRoom: async (room: string) => {
    const message: RoomMessage = {
      room,
      isJoining: true,
    };

    await get().socket?.emitWithAck(GENERAL_EVENT.ROOM_REQUEST, message);
  },
  leaveRoom: async (room: string) => {
    const message: RoomMessage = {
      room,
      isJoining: false,
    };

    await get().socket?.emitWithAck(GENERAL_EVENT.ROOM_REQUEST, message);
  },

  // init: async (noteId?: string) => {
  //   if (!noteId) {
  //     noteId = window.location.pathname.split("/")[2];
  //   }

  //   let socket = get().socket;
  //   if (!socket) {
  //     const socketUrl = getSocketBaseUrl(noteId);
  //     socket = io(socketUrl, {
  //       autoConnect: false,
  //     });
  //   }

  //   socket
  //     .on(GENERAL_EVENT.CONNECT, () => {
  //       console.log("Connected to socket");
  //       const location = useLocation();
  //       if (location.pathname.includes("/note")) {
  //         const noteId = location.pathname.split("/")[2];
  //         const roomMessage: RoomMessage = {
  //           room: noteId,

  //         }
  //         socket.emit(GENERAL_EVENT.ROOM_REQUEST, noteId);
  //       }

  //       socket.on("disconnect", () => {
  //         // socket.rooms === {}
  //       });
  //     })
  //     .on(GENERAL_EVENT.DISCONNECT, () => {
  //       console.log("Disconnected from socket");
  //     })
  //     .on(NOTE.SERVER_EVENT.RETURN_NOTE, (message: NoteMessage) => {
  //       console.log("NOTE.SERVER_EVENT.RETURN_FETCHED", message);
  //       set({ note: message });
  //       set({ receivedMessages: [...get().receivedMessages, message] });
  //     })
  //     .on(
  //       COMPONENT.SERVER_EVENT.RETURN_COMPONENT,
  //       (message: ComponentMessage) => {
  //         console.log("COMPONENT.SERVER_EVENT.RETURN_FETCHED", message);
  //         set({ receivedMessages: [...get().receivedMessages, message] });
  //       }
  //     )
  //     .on(COMMENT.SERVER_EVENT.RETURN_COMMENT, (message: CommentMessage) => {
  //       console.log("COMMENT.SERVER_EVENT.RETURN_UPDATED", message);
  //       set({ receivedMessages: [...get().receivedMessages, message] });
  //     });

  //   socket.open();

  //   set({ socket });
  // },
}));

export default useSocketStore;
