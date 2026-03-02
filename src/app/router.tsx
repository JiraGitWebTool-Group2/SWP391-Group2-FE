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
import RepositoryManagementPage from "@/features/admin/pages/RepositoryManagementPage";
import AdminGroupDashboardPage from "@/features/admin/pages/AdminGroupDashboardPage";

import LoginPage from "@/features/auth/pages/LoginPage";

import GroupListPage from "@/features/groups/pages/GroupListPage";
import GroupDetailPage from "@/features/groups/pages/GroupDetailPage";
import { TaskBoardPage } from "@/features/tasks/pages/TaskBoardPage";

import ReportManagementPage from "@/features/report/pages/ReportManagementPage";
import ReportEditorPage from "@/features/report/pages/ReportEditorPage";
import ReportReviewPage from "@/features/report/pages/ReportReviewPage";
import ProgressReportPage from "@/features/report/pages/ProgressReportPage";

import { SrsGeneratePage } from "@/features/srs/pages/SrsGeneratePage";
import SrsManagementPage from "@/features/srs/pages/SrsManagementPage";
import SrsEditorPage from "@/features/srs/pages/SrsEditorPage";
import SrsReviewPage from "@/features/srs/pages/SrsReviewPage";

import SyncPage from "@/features/sync/pages/SyncPage";
import SyncResultPage from "@/features/sync/pages/SyncResultPage";

import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import SnapshotDetailPage from "@/features/snapshots/pages/SnapshotDetailPage";
import ProjectListPage from "@/features/admin/pages/ProjectListPage";

export const router = createBrowserRouter([
  // ================= LOGIN =================
  {
    path: "/login",
    element: <LoginPage />,
  },

  // ================= ADMIN ROUTES =================
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },

      // ===== GROUP =====
      { path: "groups", element: <GroupManagementPage /> },

      // ===== PROJECT (NEW FLOW) =====
      {
        path: "groups/:groupId/projects",
        element: <ProjectListPage />,
      },

      // ===== PROJECT DETAIL LEVEL =====
      {
        path: "projects/:projectId/integration",
        element: <IntegrationConfigPage />,
      },
      {
        path: "projects/:projectId/repositories",
        element: <RepositoryManagementPage />,
      },

      // ===== GROUP DASHBOARD (snapshot overview) =====
      {
        path: "groups/:groupId/dashboard",
        element: <AdminGroupDashboardPage />,
      },

      // ===== OTHER ADMIN =====
      { path: "lecturers", element: <LecturerManagementPage /> },
      { path: "assign", element: <AssignLecturerPage /> },
      { path: "users", element: <UserManagementPage /> },
    ],
  },

  // ================= USER ROUTES =================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      { path: "dashboard", element: <DashboardPage /> },

      { path: "groups", element: <GroupListPage /> },
      { path: "groups/:groupId", element: <GroupDetailPage /> },

      { path: "tasks", element: <TaskBoardPage /> },

      // ===== SYNC THEO PROJECT =====
      {
        path: "sync",
        element: <SyncPage />,
      },
      {
        path: "sync-result/:syncRunId",
        element: <SyncResultPage />,
      },
      {
        path: "snapshot/:snapshotId",
        element: <SnapshotDetailPage />,
      },

      // ===== SRS =====
      {
        path: "srs",
        children: [
          { index: true, element: <SrsGeneratePage /> },
          { path: "manage", element: <SrsManagementPage /> },
          { path: ":id", element: <SrsEditorPage /> },
          { path: "review/:id", element: <SrsReviewPage /> },
        ],
      },

      // ===== REPORT =====
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
