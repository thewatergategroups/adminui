import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root container missing in index.html");
}

const queryClient = new QueryClient();
createRoot(rootElement).render(
    <React.StrictMode>
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>
);
