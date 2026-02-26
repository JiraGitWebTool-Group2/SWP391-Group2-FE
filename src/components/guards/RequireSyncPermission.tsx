// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthStore } from "@/stores/auth.store";

// export default function RequireSyncPermission() {
//   const { role } = useAuthStore((state) => ({
//     role: state.role,
//   }));

//   // team member không được sync
//   if (role?.toUpperCase() === "TEAM_MEMBER") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// }
