import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import type { UserGetMe } from "../types";
import { authService } from "../services";

export function UserProfilePage() {
  const [user, setUser] = useState<UserGetMe | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getMe();
        setUser(data);
      } catch (err) {
        console.log("Cannot get user");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-6">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Profile Card */}
        <Card className="rounded-3xl border-0 bg-white/70 backdrop-blur-xl shadow-2xl">
          <CardContent className="space-y-6 px-8 pb-8">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Name</label>

              <Input
                value={user.fullName}
                readOnly
                className="h-11 rounded-xl border-slate-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Email
              </label>

              <Input
                value={user.email}
                readOnly
                className="h-11 rounded-xl border-slate-200"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Role</label>

              <Input
                value={user.role}
                readOnly
                className="h-11 rounded-xl border-slate-200"
              />
            </div>

            {/* Button */}
            <Button
              disabled
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg"
            >
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
