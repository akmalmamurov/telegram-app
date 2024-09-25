import { createContext, useState, useEffect } from "react";
const UserContext = createContext();

export const Context = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

    if (telegramUser) {
      setUserId(telegramUser);
      localStorage.setItem("userId", telegramUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};
