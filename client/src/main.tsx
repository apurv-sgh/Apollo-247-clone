import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>
);
