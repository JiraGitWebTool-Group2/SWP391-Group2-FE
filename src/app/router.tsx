import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminLayout from "@/components/layout/AdminLayout";
import MainLayout from "@/components/layout/MainLayout";

import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import SemesterManagementPage from "@/features/admin/pages/SemesterManagementPage";
import ClassManagementPage from "@/features/admin/pages/ClassManagementPage";
import AdminClassDetailPage from "@/features/admin/pages/AdminClassDetailPage";

import LecturerManagementPage from "@/features/admin/pages/LecturerManagementPage";
import AssignLecturerPage from "@/features/admin/pages/AssignLecturerPage";
import IntegrationConfigPage from "@/features/admin/pages/IntegrationConfigPage";
import UserManagementPage from "@/features/admin/pages/UserManagementPage";
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
import LecturerDetailPage from "@/features/admin/pages/LecturerDetailPage";

export const router = createBrowserRouter([
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

      // ===== SEMESTER =====
      {
        path: "semesters",
        element: <SemesterManagementPage />,
      },

      // ===== CLASS LIST OF SEMESTER =====
      {
        path: "semesters/:semesterId/classes",
        element: <ClassManagementPage />,
      },

      // ===== CLASS DETAIL =====
      {
        path: "classes/:classId",
        element: <AdminClassDetailPage />,
      },

      // ===== ASSIGN LECTURER =====
      {
        path: "classes/:classId/assign",
        element: <AssignLecturerPage />,
      },

      // ===== PROJECT INTEGRATION =====
      {
        path: "projects/:projectId/integration",
        element: <IntegrationConfigPage />,
      },

      // ===== GROUP DASHBOARD =====
      {
        path: "groups/:groupId/dashboard",
        element: <AdminGroupDashboardPage />,
      },

      // ===== LECTURERS =====
      {
        path: "lecturers",
        element: <LecturerManagementPage />,
      },
      {
        path: "lecturers/:id",
        element: <LecturerDetailPage />,
      },

      // ===== USERS =====
      {
        path: "users",
        element: <UserManagementPage />,
      },
    ],
  },

  // ================= USER =================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      {
        path: "dashboard",
        element: <DashboardPage />,
      },

      {
        path: "groups",
        element: <GroupListPage />,
      },
      {
        path: "groups/:groupId",
        element: <GroupDetailPage />,
      },

      {
        path: "tasks",
        element: <TaskBoardPage />,
      },

      // ===== SYNC =====
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
          { path: "manage", element: <SrsManagementPage /> }, //student manage
          { path: ":id", element: <SrsEditorPage /> }, //student edit
          { path: "review/:id", element: <SrsReviewPage /> }, //lecturer review
        ],
      },

      // ===== REPORT =====
      {
        path: "reports",
        children: [
          { index: true, element: <ProgressReportPage /> },
          { path: "manage", element: <ReportManagementPage /> }, //student manage
          { path: "editor", element: <ReportEditorPage /> }, //student edit
          { path: "review/:reportId", element: <ReportReviewPage /> }, //lecturer review
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
