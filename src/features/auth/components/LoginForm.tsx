import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";

const LoginForm = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // ✅ lấy hàm login

  const handleLogin = () => {
    // mock token
    login("mock-access-token", role);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <Card className="w-full max-w-xl shadow-2xl rounded-3xl border-0">
        <CardHeader className="text-center space-y-3 pt-10">
          <CardTitle className="text-3xl font-bold tracking-tight">
            SWP391 Project Portal
          </CardTitle>
          <p className="text-base text-muted-foreground">
            Sign in with your Google account
          </p>
        </CardHeader>

        <CardContent className="space-y-8 pb-12 px-10">
          <div className="space-y-3">
            <label className="text-base font-medium">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-14 rounded-xl border border-gray-300 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose your role</option>
              <option value="admin">Admin</option>
              <option value="lecturer">Lecturer</option>
              <option value="leader">Team Leader</option>
              <option value="member">Team Member</option>
            </select>
          </div>

          <Button
            onClick={handleLogin} // ✅ thêm onClick
            disabled={!role}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-base rounded-xl flex items-center justify-center gap-3 transition shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
