import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import { GroupDetailPage } from "@/features/groups/pages/GroupDetailPage";
import { GroupListPage } from "@/features/groups/pages/GroupListPage";
import { SrsGeneratePage } from "@/features/requirements/pages/SrsGeneratePage";
import { SrsPreview } from "@/features/requirements/srs/SrsPreview";
import { TraceabilityTable } from "@/features/requirements/srs/TraceabilityTable";
import { DashboardPage } from "@/features/statistics/pages/DashboardPage";
import { ProgressReportPage } from "@/features/statistics/pages/ProgressReportPage";
import SyncPage from "@/features/sync/pages/SyncPage";
import { TaskBoardPage } from "@/features/tasks/pages/TaskBoardPage";
import { UserProfilePage } from "@/features/user/pages/UserProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProfilePage />,
  },
]);
