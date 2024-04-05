import HiveLoadingSpinner from "components/HiveLoadingSpinner";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "utils/AuthStore";
import useSocketStore from "utils/SocketStore";

interface RequireAuthProps {
  access?: string;
  tag: string;
  children: any;
}

const RequireAuth = (props: RequireAuthProps) => {
  const { access, children, tag } = props;

  const authStore = useAuthStore();
  const socketStore = useSocketStore();
  const location = useLocation();

  const fetchAccount = async () => {
    await authStore.getMe();
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    if (tag === "note-page") {
      const noteId = location.pathname.split("/")[2];
      if (noteId !== socketStore.note?.id) {
        socketStore.joinRoom(noteId);
      }

      if (socketStore.note?.id) {
        socketStore.leaveRoom(socketStore.note.id);
      }

      // if (!socketStore.socket?.connected) {
      // socketStore.init(noteId);
      //   return;
      // }

      // if (socketStore.socket?.connected && socketStore.note?.id !== noteId) {
      //   socketStore.socket.disconnect();
      //   socketStore.init(noteId);
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, location.pathname, socketStore.socket?.connected]);

  const isAlreadyLoggedIn = () =>
    authStore.account &&
    (window.location.pathname.includes("/login") ||
      window.location.pathname.includes("/register"));

  if (isAlreadyLoggedIn()) {
    return <Navigate replace to="" />;
  }

  if (!authStore.isStateReady) {
    return <HiveLoadingSpinner size="medium" />;
  }

  if (access === "USER" && authStore.account) {
    return children;
  }

  if (!access) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default RequireAuth;
