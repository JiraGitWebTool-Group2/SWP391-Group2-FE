import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

export function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-6">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            User Profile
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your personal information
          </p>
        </div>

        {/* Profile Card */}
        <Card className="rounded-3xl border-0 bg-white/70 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-blue-200/50">
          <CardHeader className="flex flex-col items-center space-y-4 pb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <User className="text-white" size={32} />
            </div>
            <CardTitle className="text-xl font-semibold text-slate-700">
              Profile Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Name</label>
              <Input
                placeholder="Enter your name"
                className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">
                Email
              </label>
              <Input
                placeholder="Enter your email"
                className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>

            {/* Button */}
            <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
