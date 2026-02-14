import { createBrowserRouter } from "react-router-dom";
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
  /* ================= LOGIN (no layout) ================= */
  {
    path: "/login",
    element: <LoginPage />,
  },

  /* ================= MAIN APP LAYOUT ================= */
  {
    path: "/",
    element: <App />,
    children: [
      /* ================= DASHBOARD ================= */
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },

      /* ================= GROUPS ================= */
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

      /* ================= TASK BOARD ================= */
      {
        path: "tasks",
        element: <TaskBoardPage />,
      },

      /* ================= SRS ================= */
      {
        path: "srs",
        children: [
          {
            path: "generate",
            element: <SrsGeneratePage />,
          },
          {
            path: "preview",
            element: <SrsPreview />,
          },
          {
            path: "traceability",
            element: <TraceabilityTable />,
          },
        ],
      },

      /* ================= REPORT ================= */
      {
        path: "reports",
        element: <ProgressReportPage />,
      },

      /* ================= SYNC ================= */
      {
        path: "sync",
        element: <SyncForm />,
      },

      /* ================= USER ================= */
      {
        path: "profile",
        element: <UserProfilePage />,
      },
    ],
  },
]);
