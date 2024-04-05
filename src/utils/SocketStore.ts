import { EditorBlock } from "pages/NotePage";
import ioClient, { Socket } from "socket.io-client";
import { getSocketBaseUrl } from "utils";
import { create } from "zustand";

interface SocketStore {
  noteId?: string;
  setNoteId: (noteId: string) => void;
  socket?: Socket;
  setSocket: (socket: Socket) => void;
  isSocketConnected: boolean;
  setIsSocketConnected: (isSocketConnected: boolean) => void;
  receivedMessages: any[];
  sendMessage: (message: ClientMessage) => Promise<any>;
  init: (noteId?: string) => void;
  disconnect: (noteId?: string) => void;
}

export interface ClientMessage {
  room: string;
  type: MessageType;
  message: string;
  data: EditorBlock[];
}

export enum MessageType {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

const useSocketStore = create<SocketStore>((set, get) => ({
  noteId: undefined,
  socket: undefined,
  isSocketConnected: false,
  receivedMessages: [],
  setNoteId: (noteId: string) => {
    set({ noteId });
  },
  setSocket: (socket: Socket) => {
    set({ socket });
  },
  setIsSocketConnected: (isSocketConnected: boolean) => {
    set({ isSocketConnected });
  },
  sendMessage: async (message: ClientMessage) => {
    const { socket } = get();
    const response = await socket?.emitWithAck("send_message", message);
    return response;
  },
  init: (noteId?: string) => {
    if (!noteId) {
      noteId = window.location.pathname.split("/")[2];
    }
    set({ noteId });

    if (get().isSocketConnected && get().noteId !== noteId) {
      get().disconnect();
    }

    const socketUrl = getSocketBaseUrl(noteId);
    const socket = ioClient(socketUrl, {
      autoConnect: false,
      closeOnBeforeunload: true,
    });
    socket
      .on("connect", () => {
        console.log("Connected to socket");
        set({ isSocketConnected: true });
      })
      .on("disconnect", () => {
        console.log("Disconnected from socket");
        set({ isSocketConnected: false });
      })
      .on("get_message", (message: any) => {
        console.log("Received message", message);
        set({ receivedMessages: [...get().receivedMessages, message] });
      });

    socket.open();

    if (socket.connected) {
      set({ isSocketConnected: true });
    }

    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    socket?.off("connect");
    socket?.off("disconnect");
    socket?.off("get_message");
    socket?.disconnect();

    set({ noteId: undefined });
    set({ socket: undefined });
    set({ isSocketConnected: false });
    set({ receivedMessages: [] });
  },
}));

export default useSocketStore;
