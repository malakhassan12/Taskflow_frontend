import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./Context/DarkModeProvider.jsx";

const loadingElement = document.getElementById("loading");
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </BrowserRouter>,
);
if (loadingElement) {
  loadingElement.style.transition = "opacity 0.3s";
  loadingElement.style.opacity = "0";
  setTimeout(() => {
    loadingElement.style.display = "none";
  }, 300);
}
