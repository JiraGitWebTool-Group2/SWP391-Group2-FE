import { createBrowserRouter, Navigate } from "react-router-dom";

import RequireAdmin from "@/components/guards/RequireAdmin";
import RequireUser from "@/components/guards/RequireUser";

import AdminLayout from "@/components/layout/AdminLayout";
import MainLayout from "@/components/layout/MainLayout";

import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import GroupManagementPage from "@/features/admin/pages/GroupManagementPage";
import LecturerManagementPage from "@/features/admin/pages/LecturerManagementPage";
import AssignLecturerPage from "@/features/admin/pages/AssignLecturerPage";
import IntegrationConfigPage from "@/features/admin/pages/IntegrationConfigPage";

import LoginPage from "@/features/auth/pages/LoginPage";

import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import GroupListPage from "@/features/groups/pages/GroupListPage";
import GroupDetailPage from "@/features/groups/pages/GroupDetailPage";
import { TaskBoardPage } from "@/features/tasks/pages/TaskBoardPage";
import { ProgressReportPage } from "@/features/report/pages/ProgressReportPage";
import SyncPage from "@/features/sync/pages/SyncPage";
import UserManagementPage from "@/features/admin/pages/UserManagementPage";

export const router = createBrowserRouter([
  // ================= LOGIN =================
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },

  // ================= ADMIN =================
  {
    path: "/admin",
    element: <AdminLayout />, // 🔥 BẮT BUỘC PHẢI CÓ
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "groups", element: <GroupManagementPage /> },
      { path: "lecturers", element: <LecturerManagementPage /> },
      { path: "assign", element: <AssignLecturerPage /> },
      { path: "integration", element: <IntegrationConfigPage /> },
      { path: "users", element: <UserManagementPage /> },
    ],
  },

  // ================= USER =================
  {
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/sync", element: <SyncPage /> },
          { path: "/groups", element: <GroupListPage /> },
          { path: "/groups/:groupId", element: <GroupDetailPage /> },
          { path: "/tasks", element: <TaskBoardPage /> },
          { path: "/reports", element: <ProgressReportPage /> },
        ],
      },
    ],
  },

  // ================= FALLBACK =================
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
