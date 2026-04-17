import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./Context/DarkModeProvider.jsx";
import { NotificationsProvider } from "./Context/NotificationsProvider.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme } from 'antd';

const queryClient = new QueryClient();

const loadingElement = document.getElementById("loading");
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <AuthProvider>
          <DarkModeProvider>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </DarkModeProvider>
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
if (loadingElement) {
  loadingElement.style.transition = "opacity 0.3s";
  loadingElement.style.opacity = "0";
  setTimeout(() => {
    loadingElement.style.display = "none";
  }, 300);
}
