import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminLayout from "@/components/layout/AdminLayout";

import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import GroupManagementPage from "@/features/admin/pages/GroupManagementPage";
import LecturerManagementPage from "@/features/admin/pages/LecturerManagementPage";
import AssignLecturerPage from "@/features/admin/pages/AssignLecturerPage";
import IntegrationConfigPage from "@/features/admin/pages/IntegrationConfigPage";
import ImportUserExcel from "@/features/admin/components/ImportUserExcel";
import AddUserPage from "@/features/admin/pages/AddUserPage";

export const router = createBrowserRouter([
  // Khi vào "/" tự động chuyển sang admin
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },

  // Admin routes (KHÔNG guard)
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "groups", element: <GroupManagementPage /> },
      { path: "lecturers", element: <LecturerManagementPage /> },
      { path: "assign", element: <AssignLecturerPage /> },
      { path: "integration", element: <IntegrationConfigPage /> },
      { path: "import-users", element: <ImportUserExcel /> },
      { path: "add-user", element: <AddUserPage /> },
    ],
  },

  // Nếu route sai thì quay lại admin
  {
    path: "*",
    element: <Navigate to="/admin" replace />,
  },
]);
