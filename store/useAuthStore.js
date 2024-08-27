import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      userData: null,
      setUserData: (userData) => set((state) => ({ ...state, userData })),
    }),
    {
      name: "auth-store", // unique name
      storage: createJSONStorage(() => sessionStorage), // can be any top-level async/sync storage
    }
  )
);

export default useAuthStore;
