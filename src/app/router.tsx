import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";

/* Admin Pages */
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import GroupManagementPage from "@/features/admin/pages/GroupManagementPage";
import LecturerManagementPage from "@/features/admin/pages/LecturerManagementPage";
import AssignLecturerPage from "@/features/admin/pages/AssignLecturerPage";
import IntegrationConfigPage from "@/features/admin/pages/IntegrationConfigPage";

export const router = createBrowserRouter([
  /* Redirect root -> admin */
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },

  /* ================= ADMIN ================= */
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      /* Default dashboard */
      {
        index: true,
        element: <AdminDashboardPage />,
      },

      {
        path: "groups",
        element: <GroupManagementPage />,
      },
      {
        path: "lecturers",
        element: <LecturerManagementPage />,
      },
      {
        path: "assign",
        element: <AssignLecturerPage />,
      },
      {
        path: "integration",
        element: <IntegrationConfigPage />,
      },
    ],
  },

  /* 404 fallback */
  {
    path: "*",
    element: <Navigate to="/admin" replace />,
  },
]);
