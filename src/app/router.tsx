import { createBrowserRouter, Navigate } from "react-router-dom";

// ===== GUARDS =====
import RequireUser from "@/components/guards/RequireUser";

// ===== LAYOUTS =====
import AdminLayout from "@/components/layout/AdminLayout";
import MainLayout from "@/components/layout/MainLayout";

// ===== ADMIN PAGES =====
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import SemesterManagementPage from "@/features/admin/pages/SemesterManagementPage";
import ClassManagementPage from "@/features/admin/pages/ClassManagementPage";
import AdminClassDetailPage from "@/features/admin/pages/AdminClassDetailPage";

import LecturerManagementPage from "@/features/admin/pages/LecturerManagementPage";
import AssignLecturerPage from "@/features/admin/pages/AssignLecturerPage";
import IntegrationConfigPage from "@/features/admin/pages/IntegrationConfigPage";
import UserManagementPage from "@/features/admin/pages/UserManagementPage";
// import AdminGroupDashboardPage from "@/features/admin/pages/AdminGroupDashboardPage";
import LecturerDetailPage from "@/features/admin/pages/LecturerDetailPage";

// ===== AUTH PAGES =====
import LoginPage from "@/features/auth/pages/LoginPage";

// ===== USER PAGES =====
import GroupListPage from "@/features/groups/pages/GroupListPage";
import GroupDetailPage from "@/features/groups/pages/GroupDetailPage";
import { TaskBoardPage } from "@/features/tasks/pages/TaskBoardPage";
import SyncPage from "@/features/sync/pages/SyncPage";
import SyncResultPage from "@/features/sync/pages/SyncResultPage";
import SnapshotDetailPage from "@/features/snapshots/pages/SnapshotDetailPage";

// ===== SRS PAGES =====
import { SrsGeneratePage } from "@/features/srs/pages/SrsGeneratePage";
import SrsManagementPage from "@/features/srs/pages/SrsManagementPage";
import SrsEditorPage from "@/features/srs/pages/SrsEditorPage";
import SrsReviewPage from "@/features/srs/pages/SrsReviewPage";

// ===== REPORT PAGES =====
import ReportManagementPage from "@/features/report/pages/ReportManagementPage";
import ReportEditorPage from "@/features/report/pages/ReportEditorPage";
import ReportReviewPage from "@/features/report/pages/ReportReviewPage";
import ProgressReportPage from "@/features/report/pages/ProgressReportPage";

import RequireAdmin from "@/components/guards/RequireAdmin";
import RepositoryPage from "@/features/admin/pages/RepositoryPage";

import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import DashboardPageDetail from "@/features/dashboard/pages/DashboardPageDetail";

import ClassListPage from "@/features/groups/pages/ClassListPage";
import ClassDetailPage from "@/features/groups/pages/ClassDetailPage";

import { UserProfilePage } from "@/features/user/pages/UserProfilePage";
import GroupProjectPage from "@/features/groups/pages/GroupProjectPage";

export const router = createBrowserRouter([
  // ================= LOGIN =================
  {
    path: "/login",
    element: <LoginPage />,
  },

  // ================= ADMIN =================
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
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

      {
        path: "projects/:projectId/repository",
        element: <RepositoryPage />,
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

  // ================= USER (STUDENT & LECTURER) =================
  {
    path: "/",
    element: (
      <RequireUser>
        <MainLayout />
      </RequireUser>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // ================= COMMON =================
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "classes",
        element: <ClassListPage />,
      },
      {
        path: "classes/:classId",
        element: <ClassDetailPage />,
      },
      {
        path: "groups/:groupId",
        element: <GroupDetailPage />,
      },
      {
        path: "groups/:groupId/dashboard",
        element: <DashboardPageDetail />,
      },

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

      // ===== PROJECT (STUDENT ACCESS) =====
      {
        path: "projects/:projectId/integration",
        element: <IntegrationConfigPage />,
      },
      {
        path: "projects/:projectId/repository",
        element: <RepositoryPage />,
      },

      // ================= STUDENT =================
      {
        element: <RequireUser allowedRoles={["STUDENT"]} />,
        children: [
          {
            path: "project",
            element: <GroupProjectPage />,
          },
          {
            path: "tasks",
            element: <TaskBoardPage />,
          },

          // ----- SRS -----
          {
            path: "srs",
            element: <SrsGeneratePage />,
          },
          {
            path: "srs/manage",
            element: <SrsManagementPage />,
          },
          {
            path: "srs/:id",
            element: <SrsEditorPage />,
          },

          // ----- REPORT -----
          {
            path: "reports",
            element: <ProgressReportPage />,
          },
          {
            path: "reports/manage",
            element: <ReportManagementPage />,
          },
          {
            path: "reports/editor",
            element: <ReportEditorPage />,
          },
        ],
      },

      // ================= LECTURER =================
      {
        element: <RequireUser allowedRoles={["LECTURER"]} />,
        children: [
          {
            path: "profile",
            element: <UserProfilePage />,
          },
          {
            path: "srs/review/:id",
            element: <SrsReviewPage />,
          },
          {
            path: "reports/review/:reportId",
            element: <ReportReviewPage />,
          },
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
