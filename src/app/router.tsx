import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import { UserProfilePage } from "@/features/user/pages/UserProfilePage";
import GroupListPage from "@/features/groups/pages/GroupListPage";
import GroupDetailPage from "@/features/groups/pages/GroupDetailPage";

export const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <UserProfilePage />,
  //   },
  //   {
  //     path: "/",
  //     element: <GroupListPage />,
  //   },
  {
    path: "/",
    element: <GroupDetailPage />,
  },
]);
