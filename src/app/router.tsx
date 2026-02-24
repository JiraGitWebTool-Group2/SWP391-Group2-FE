import { createBrowserRouter, Navigate } from "react-router-dom";
import RequireAdmin from "@/components/guards/RequireAdmin";
import RequireAuth from "@/components/guards/RequireAuth";

import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import GroupManagementPage from "@/features/admin/pages/GroupManagementPage";
import LecturerManagementPage from "@/features/admin/pages/LecturerManagementPage";
import AssignLecturerPage from "@/features/admin/pages/AssignLecturerPage";
import IntegrationConfigPage from "@/features/admin/pages/IntegrationConfigPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/statistics/pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  // 🔐 ADMIN ONLY
  {
    element: <RequireAdmin />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "groups", element: <GroupManagementPage /> },
          { path: "lecturers", element: <LecturerManagementPage /> },
          { path: "assign", element: <AssignLecturerPage /> },
          { path: "integration", element: <IntegrationConfigPage /> },
        ],
      },
    ],
  },

  // 🔐 USER (non-admin)
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
