import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { router } from "./router";

import "@/styles/global.css";
import { AuthProvider } from "@/features/auth/authContext";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        {" "}
        {/* 👈 thêm ở đây */}
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
