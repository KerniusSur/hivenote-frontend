import { Account } from "api/Account";
import { Auth } from "api/Auth";
import { Events } from "api/Events";
import { Notes } from "api/Notes";
import { toast } from "react-toastify";
import { getBaseUrl } from "utils";

const notifyError = (message: string) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

export const createApi = (type: string): any => {
  // eslint-disable-next-line
  let returnValue;
  switch (type) {
    case "auth": {
      returnValue = new Auth({ baseURL: getBaseUrl() });
      break;
    }
    case "account": {
      returnValue = new Account({ baseURL: getBaseUrl() });
      break;
    }

    case "note": {
      returnValue = new Notes({ baseURL: getBaseUrl() });
      break;
    }

    case "event": {
      returnValue = new Events({ baseURL: getBaseUrl() });
      break;
    }

    default: {
      console.error("could not find api with type:", type);
      break;
    }
  }

  returnValue?.instance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      notifyError(
        error?.response?.data || error?.message || error?.error?.message
      );
      throw new Error(
        error?.response?.data ?? error?.message ?? error?.error?.message
      );
    }
  );

  return returnValue;
};
