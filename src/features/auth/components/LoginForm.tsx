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
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Background blur blobs */}
      <div className="absolute w-[500px] h-[500px] bg-blue-200 opacity-40 blur-3xl rounded-full -top-20 -left-20"></div>
      <div className="absolute w-[500px] h-[500px] bg-indigo-200 opacity-40 blur-3xl rounded-full -bottom-20 -right-20"></div>

      <div className="relative flex items-center gap-24">
        {/* LEFT IMAGE */}
        <motion.img
          src="https://i.ytimg.com/vi/OEGm7LXAN_c/maxresdefault.jpg"
          alt="github"
          className="w-44 opacity-80"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="w-[420px] rounded-3xl shadow-2xl border border-gray-200 bg-white/90 backdrop-blur">
            <CardContent className="p-10 space-y-8">
              {/* HEADER */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  SWP391 Portal
                </h1>

                <p className="text-gray-500 text-sm">
                  Connect your academic project tools
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex gap-2 items-center">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {/* ROLE SELECT CENTER */}
              <div className="flex flex-col items-center space-y-3">
                <p className="text-sm font-medium text-gray-600">
                  Select your role
                </p>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="
                    w-64
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-2
                    text-center
                    shadow-sm
                    bg-white
                    focus:ring-2
                    focus:ring-blue-500
                    focus:outline-none
                    transition
                  "
                >
                  <option value="admin">Admin</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="student">Student</option>
                </select>
              </div>

              {/* LOGIN */}
              <div className="flex justify-center pt-4">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    <span className="text-xs text-gray-500">
                      Authenticating...
                    </span>
                  </div>
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

        {/* RIGHT IMAGE */}
        <motion.img
          src="https://www.logicgate.com/wp-content/smush-webp/plt-jira-01-hero-01.png.webp"
          alt="jira"
          className="w-44 opacity-80"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default LoginForm;
