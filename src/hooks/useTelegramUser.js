import { useEffect, useState } from "react";

export const useTelegramUser = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [error, setError] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // Check if we already have the userId in localStorage
    if (!userId) {
      if (tg?.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        setUserId(user.id); // Set the userId in state
        localStorage.setItem("userId", user.id); // Store userId in localStorage
      } else {
        setError("Telegram WebApp user data is not available.");
      }
    }
  }, [userId]);

  return { userId, error };
};
