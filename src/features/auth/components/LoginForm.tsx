import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/useLogin";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const LoginForm = () => {
  const { handleGoogleSuccess, handleGoogleError, isLoading, error } =
    useGoogleLogin();

  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="w-full max-w-2xl rounded-3xl shadow-xl">
          <CardContent className="p-12 space-y-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold">SWP391 Portal</h1>

              <p className="text-gray-500 mt-2">
                Academic project collaboration system
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Role</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="admin">Admin</option>
                <option value="lecturer">Lecturer</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="flex justify-center">
              {isLoading ? (
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
              ) : (
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    handleGoogleSuccess(credentialResponse, role)
                  }
                  onError={handleGoogleError}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginForm;
