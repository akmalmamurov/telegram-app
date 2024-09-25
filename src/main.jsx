import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext.jsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);
