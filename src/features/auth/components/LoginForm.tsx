// features/auth/components/LoginForm.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Users } from "lucide-react";

const LoginForm = () => {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          SWP391 Project Management System
        </CardTitle>
        <CardDescription>
          Đăng nhập hệ thống quản lý yêu cầu & tiến độ dự án
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="student@fpt.edu.vn"
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              required
            />
          </div>
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label>Role</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="lecturer">Lecturer</option>
              <option value="leader">Team Leader</option>
              <option value="member">Team Member</option>
            </select>
          </div>
        </div>

        {/* Login */}
        <Button
          type="submit"
          className="w-full bg-blue-400 text-black hover:bg-blue-600"
        >
          Login
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full " />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google login */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2 hover:bg-gray-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-4 w-4"
          />
          Login with Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
