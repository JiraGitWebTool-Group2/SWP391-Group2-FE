import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/useLogin";
import { AlertCircle } from "lucide-react";

const LoginForm = () => {
  const { handleGoogleSuccess, handleGoogleError, isLoading, error } =
    useGoogleLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <Card className="w-full max-w-xl shadow-2xl rounded-3xl border-0">
        <CardHeader className="text-center space-y-3 pt-10">
          <CardTitle className="text-3xl font-bold tracking-tight">
            SWP391 Project Portal
          </CardTitle>
          <p className="text-base text-muted-foreground">
            Đăng nhập với tài khoản Google
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pb-12 px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="flex flex-col items-center gap-3">
            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
              />
            )}
          </div>

          <div className="text-xs text-gray-500 text-center mt-4">
            <p>Chỉ sử dụng email được cấp phép</p>
            <p className="mt-1">Liên hệ admin nếu gặp vấn đề</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
