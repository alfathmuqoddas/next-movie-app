import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export interface IAuthStore {
  userData: any;
  setUserData: (userData: any) => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (userData) => set((state) => ({ ...state, userData })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
