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
import UserManagementPage from "@/features/admin/pages/UserManagementPage";

import LoginPage from "@/features/auth/pages/LoginPage";

import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import GroupListPage from "@/features/groups/pages/GroupListPage";
import GroupDetailPage from "@/features/groups/pages/GroupDetailPage";
import { TaskBoardPage } from "@/features/tasks/pages/TaskBoardPage";
import ReportManagementPage from "@/features/report/pages/ReportManagementPage";
import ReportEditorPage from "@/features/report/pages/ReportEditorPage";
import ReportReviewPage from "@/features/report/pages/ReportReviewPage";
import SyncPage from "@/features/sync/pages/SyncPage";
import ProgressReportPage from "@/features/report/pages/ProgressReportPage";
import { SrsGeneratePage } from "@/features/srs/pages/SrsGeneratePage";
import SrsManagementPage from "@/features/srs/pages/SrsManagementPage";
import SrsEditorPage from "@/features/srs/pages/SrsEditorPage";
import SrsReviewPage from "@/features/srs/pages/SrsReviewPage";

export const router = createBrowserRouter([
  // ================= ROOT REDIRECT =================
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  // ================= LOGIN =================
  {
    path: "/login",
    element: <LoginPage />,
  },

  // ================= ADMIN =================
  {
    path: "/admin",
    element: <AdminLayout />,
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
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "sync", element: <SyncPage /> },
      { path: "groups", element: <GroupListPage /> },
      { path: "groups/:groupId", element: <GroupDetailPage /> },
      { path: "tasks", element: <TaskBoardPage /> },

      {
        path: "srs",
        children: [
          { index: true, element: <SrsGeneratePage /> },
          { path: "manage", element: <SrsManagementPage /> },
          { path: ":id", element: <SrsEditorPage /> },
          { path: "review/:id", element: <SrsReviewPage /> },
        ],
      },

      // ===== REPORTS =====
      {
        path: "reports",
        children: [
          { index: true, element: <ProgressReportPage /> },
          { path: "manage", element: <ReportManagementPage /> },
          { path: "editor", element: <ReportEditorPage /> },
          { path: "review/:reportId", element: <ReportReviewPage /> },
        ],
      },
    ],
  },

  // ================= 404 =================
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
