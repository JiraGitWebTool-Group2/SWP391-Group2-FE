"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Github, GitBranch, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { CreateSyncRunRequest } from "../types";

interface Props {
  onSubmit: (payload: CreateSyncRunRequest) => Promise<void>;
}

export default function SyncForm({ onSubmit }: Props) {
  const [includeJira, setIncludeJira] = useState(false);
  const [includeGithub, setIncludeGithub] = useState(false);
  const [scope, setScope] = useState<"BACKLOG" | "SPRINT" | "CUSTOM">(
    "BACKLOG",
  );
  const [sprintId, setSprintId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!includeJira && !includeGithub) {
      toast.error("Thiếu nguồn dữ liệu", {
        description: "Vui lòng chọn ít nhất một nguồn (Jira hoặc GitHub).",
      });
      return;
    }

    if (scope === "SPRINT" && !sprintId) {
      toast.error("Thiếu Sprint ID", {
        description: "Vui lòng nhập Sprint ID khi chọn SPRINT.",
      });
      return;
    }

    const payload: CreateSyncRunRequest = {
      projectId: 1,
      includeJira,
      includeGithub,
      scopeType: scope,
      sprintId: scope === "SPRINT" ? sprintId : null,
    };

    try {
      setLoading(true);
      await onSubmit(payload);

      toast.success("Đồng bộ đã được khởi tạo", {
        description: "Hệ thống đang xử lý dữ liệu ở nền.",
      });
    } catch {
      toast.error("Đồng bộ thất bại", {
        description: "Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-6">
      <Card className="w-full max-w-3xl shadow-xl border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-primary">
            Data Synchronization
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Data Sources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Data Sources</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Jira */}
              <button
                type="button"
                onClick={() => setIncludeJira((prev) => !prev)}
                className={cn(
                  "relative rounded-xl border p-5 text-left transition-all duration-200",
                  "hover:shadow-md hover:-translate-y-0.5",
                  includeJira
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-muted",
                )}
              >
                {includeJira && (
                  <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-primary" />
                )}

                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Jira</div>
                    <div className="text-xs text-muted-foreground">
                      Synchronize issues & sprints
                    </div>
                  </div>
                </div>
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => setIncludeGithub((prev) => !prev)}
                className={cn(
                  "relative rounded-xl border p-5 text-left transition-all duration-200",
                  "hover:shadow-md hover:-translate-y-0.5",
                  includeGithub
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-muted",
                )}
              >
                {includeGithub && (
                  <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-primary" />
                )}

                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-xs text-muted-foreground">
                      Synchronize repositories & commits
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <Separator />

          {/* Scope */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Scope</h3>

            <Select
              value={scope}
              onValueChange={(value: any) => setScope(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phạm vi đồng bộ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BACKLOG">Full Project</SelectItem>
                <SelectItem value="SPRINT">Sprint cụ thể</SelectItem>
                <SelectItem value="CUSTOM">Custom</SelectItem>
              </SelectContent>
            </Select>

            {scope === "SPRINT" && (
              <Input
                type="number"
                placeholder="Sprint ID"
                value={sprintId ?? ""}
                onChange={(e) => setSprintId(Number(e.target.value))}
              />
            )}

            {scope === "CUSTOM" && (
              <p className="text-xs text-muted-foreground">
                Custom mode sẽ áp dụng rule cấu hình từ backend.
              </p>
            )}
          </div>

          <Separator />

          {/* Submit */}
          <Button
            className="w-full rounded-full h-11 text-sm font-medium shadow-md bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Start Synchronization
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
