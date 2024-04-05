import { Auth } from "api/Auth";
import { MeResponse } from "api/data-contracts";
import { getBaseUrl } from "utils";
import { create } from "zustand";

interface AuthStore {
  account?: MeResponse;
  getMe: () => Promise<MeResponse>;
  isStateReady: boolean;
}

const authApi = new Auth({ baseURL: getBaseUrl() });

const useAuthStore = create<AuthStore>((set) => ({
  account: undefined,
  isStateReady: false,
  getMe: async () => {
    const response = await authApi.getMe();
    set({ account: response, isStateReady: true });
    return response;
  },
}));

export default useAuthStore;
