import HiveLoadingSpinner from "components/HiveLoadingSpinner";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "utils/AuthStore";

interface RequireAuthProps {
  access?: string;
  children: any;
}

const RequireAuth = (props: RequireAuthProps) => {
  const { access, children } = props;

  const authStore = useAuthStore();

  const fetchAccount = async () => {
    await authStore.getMe();
  };
  useEffect(() => {
    fetchAccount();
  }, []);

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
