import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import { GenreProvider } from "./context/Genre.tsx";
import { SearchProvider } from "./context/Search.tsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SearchProvider>
        <GenreProvider>
          {/* <QueryClientProvider client={queryClient}> */}
          <App />
          {/* </QueryClientProvider> */}
        </GenreProvider>
      </SearchProvider>
    </ThemeProvider>
  </React.StrictMode>
);
