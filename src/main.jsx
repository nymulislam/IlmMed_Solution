import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/Routers";
import AuthProvider from "./Providers/AuthProvider";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className="max-w-screen-xl mx-auto overflow-x-hidden bg-[#d6f5e3]">
            <RouterProvider router={router}></RouterProvider>
          </div>
        </HelmetProvider>
        <Toaster richColors />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
