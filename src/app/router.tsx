import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import GroupListPage from "../features/groups/pages/GroupListPage";
import GroupDetailPage from "../features/groups/pages/GroupDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/groups",
    element: <GroupListPage />,
  },
  {
    path: "/groups/:groupId",
    element: <GroupDetailPage />,
  },
]);
