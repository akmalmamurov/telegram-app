import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useTelegramStore = create(
  persist(
    (set) => ({
      tg: window?.Telegram?.WebApp,
      userId: window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || null,
      setUserId: (id) => set({ userId: id }),
      expandWebApp: () => {
        const tg = window?.Telegram?.WebApp;
        if (tg) tg.expand();
      },
    }),
    {
      name: "bovaqulov-telegram",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTelegramStore;
