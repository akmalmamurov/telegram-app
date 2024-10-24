import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useTelegramStore = create(
  persist(
    (set) => ({
      userId: window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || null,
      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: "bovaqulov-telegram",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTelegramStore;


