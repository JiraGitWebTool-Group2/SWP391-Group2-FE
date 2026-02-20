import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

/* ===== Auth ===== */
import LoginPage from "../features/auth/pages/LoginPage";

/* ===== Dashboard ===== */
import { DashboardPage } from "@/features/statistics/pages/DashboardPage";

/* ===== Groups ===== */
import GroupListPage from "@/features/groups/pages/GroupListPage";
import GroupDetailPage from "@/features/groups/pages/GroupDetailPage";

/* ===== User ===== */
import { UserProfilePage } from "@/features/user/pages/UserProfilePage";

/* ===== Task Board ===== */
import { TaskBoardPage } from "@/features/tasks/pages/TaskBoardPage";

/* ===== SRS ===== */
import { SrsGeneratePage } from "@/features/requirements/pages/SrsGeneratePage";
import { SrsPreview } from "@/features/requirements/srs/SrsPreview";
import { TraceabilityTable } from "@/features/requirements/srs/TraceabilityTable";

/* ===== Report ===== */
import { ProgressReportPage } from "@/features/statistics/pages/ProgressReportPage";

/* ===== Sync ===== */
import SyncForm from "@/features/sync/components/SyncForm";

export const router = createBrowserRouter([
  /* ================= DEFAULT REDIRECT ================= */
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  /* ================= LOGIN (NO LAYOUT) ================= */
  {
    path: "/login",
    element: <LoginPage />,
  },

  /* ================= MAIN APP LAYOUT ================= */
  {
    path: "/app",
    element: <App />,
    children: [
      /* ===== DASHBOARD ===== */
      {
        path: "dashboard",
        element: <DashboardPage />,
      },

      /* ===== GROUPS ===== */
      {
        path: "groups",
        children: [
          {
            index: true,
            element: <GroupListPage />,
          },
          {
            path: ":groupId",
            element: <GroupDetailPage />,
          },
        ],
      },

      /* ===== TASK BOARD ===== */
      {
        path: "tasks",
        element: <TaskBoardPage />,
      },

      /* ===== SRS ===== */
      {
        path: "srs/generate",
        element: <SrsGeneratePage />,
      },
      {
        path: "srs/preview",
        element: <SrsPreview />,
      },
      {
        path: "srs/traceability",
        element: <TraceabilityTable />,
      },

      /* ===== REPORT ===== */
      {
        path: "reports",
        element: <ProgressReportPage />,
      },

      /* ===== SYNC ===== */
      {
        path: "sync",
        element: <SyncForm />,
      },

      /* ===== USER ===== */
      {
        path: "profile",
        element: <UserProfilePage />,
      },
    ],
  },
]);
