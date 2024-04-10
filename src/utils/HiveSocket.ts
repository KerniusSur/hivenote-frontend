import NOTE from "models/events/NoteEvents";
import NoteMessage from "models/message/NoteMessage";
import { io } from "socket.io-client";
import { getSocketBaseUrl } from "utils";

export const socket = io(getSocketBaseUrl(), {
  autoConnect: false,
}).connect();

socket.on("connect", () => {
  console.log("Connected to socket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from socket server");
});

socket.on(NOTE.SERVER_EVENT.RETURN_NOTE, (message: NoteMessage) => {
  console.log("NOTE.SERVER_EVENT.RETURN_NOTE", message);
});

export default socket;
