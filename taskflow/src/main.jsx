import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./Context/DarkModeProvider.jsx";
import { NotificationsProvider } from "./Context/NotificationsProvider.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider,  } from "antd";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <AuthProvider>
          <DarkModeProvider>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </DarkModeProvider>
        </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
