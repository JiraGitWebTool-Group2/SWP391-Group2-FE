// import { useState } from "react";
// import { loginApi } from "../services";
// import type { LoginRequest } from "../types";

// export const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const login = async (data: LoginRequest) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await loginApi(data);

//       localStorage.setItem("accessToken", res.data.accessToken);
//       localStorage.setItem("refreshToken", res.data.refreshToken);

//       return true;
//     } catch (err: any) {
//       setError(
//         err.response?.data?.message || err.response?.data || "Login failed",
//       );
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login, loading, error };
// };
