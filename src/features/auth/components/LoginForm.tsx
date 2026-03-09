import { Card, CardContent } from "@/components/ui/card";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/useLogin";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const LoginForm = () => {
  const { handleGoogleSuccess, handleGoogleError, isLoading, error } =
    useGoogleLogin();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Background lights */}
      <div className="absolute w-[700px] h-[700px] bg-indigo-400 opacity-30 blur-[140px] rounded-full -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-blue-400 opacity-30 blur-[130px] rounded-full -bottom-40 -right-40 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-300 opacity-20 blur-[120px] rounded-full top-[25%] right-[15%]"></div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-3xl rounded-3xl border border-white/40 bg-white/75 backdrop-blur-2xl shadow-[0_25px_90px_rgba(0,0,0,0.18)]">
          <CardContent className="p-16 space-y-12">
            {/* Header */}
            <div className="text-center space-y-5">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                SWP391 Portal
              </h1>

              <p className="text-gray-600 text-lg">
                Access the project management and academic collaboration
                platform
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-2"
              >
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-5">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-sm text-gray-500 font-medium">
                Sign in with Google
              </span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* Login Button */}
            <div className="flex justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-9 h-9 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">
                    Authenticating your account...
                  </span>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="p-2 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                  />
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="text-sm text-center text-gray-500 leading-relaxed pt-2">
              <p>Only authorized Google accounts can access this system.</p>
              <p className="mt-1">
                Please contact the administrator if you encounter any issues.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginForm;
