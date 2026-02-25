import { createBrowserRouter, Navigate } from "react-router-dom";
import RequireAdmin from "@/components/guards/RequireAdmin";

import AdminLayout from "@/components/layout/AdminLayout";
import MainLayout from "@/components/layout/MainLayout";

import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import GroupManagementPage from "@/features/admin/pages/GroupManagementPage";
import LecturerManagementPage from "@/features/admin/pages/LecturerManagementPage";
import AssignLecturerPage from "@/features/admin/pages/AssignLecturerPage";
import IntegrationConfigPage from "@/features/admin/pages/IntegrationConfigPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/statistics/pages/DashboardPage";
import GroupListPage from "@/features/groups/pages/GroupListPage";
import { TaskBoardPage } from "@/features/tasks/pages/TaskBoardPage";
import { ProgressReportPage } from "@/features/statistics/pages/ProgressReportPage";
import { SrsGeneratePage } from "@/features/requirements/pages/SrsGeneratePage";
import SyncPage from "@/features/sync/pages/SyncPage";
import GroupDetailPage from "@/features/groups/pages/GroupDetailPage";
import RequireUser from "@/components/guards/RequireUser";
import RequireSyncPermission from "@/components/guards/RequireSyncPermission";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  // ================= ADMIN =================
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

  // ================= USER (NON ADMIN) =================
  {
    element: <RequireUser />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/groups", element: <GroupListPage /> },
          { path: "/groups/:groupId", element: <GroupDetailPage /> },
          { path: "/tasks", element: <TaskBoardPage /> },
          { path: "/reports", element: <ProgressReportPage /> },
          { path: "/srs/generate", element: <SrsGeneratePage /> },
        ],
      },

      // Sync chỉ cho Lecturer + Team Leader
      {
        element: <RequireSyncPermission />,
        children: [{ path: "/sync", element: <SyncPage /> }],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
