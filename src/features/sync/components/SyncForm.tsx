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
  onSubmit: (payload: Omit<CreateSyncRunRequest, "projectId">) => Promise<void>;
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
      toast.error("Thiếu nguồn dữ liệu");
      return;
    }

    if (scope === "SPRINT" && !sprintId) {
      toast.error("Thiếu Sprint ID");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        includeJira,
        includeGithub,
        scopeType: scope,
        sprintId: scope === "SPRINT" ? sprintId : null,
      });

      toast.success("Đồng bộ đã được khởi tạo");
    } catch {
      toast.error("Đồng bộ thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 p-8"
    >
      <Card className="w-full max-w-3xl shadow-2xl border rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">
            Data Synchronization
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Synchronize data from Jira and GitHub
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* SOURCES */}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Data Sources
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* JIRA */}

              <button
                type="button"
                onClick={() => setIncludeJira((prev) => !prev)}
                className={cn(
                  "relative rounded-xl border p-6 transition-all hover:shadow-lg",
                  includeJira
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-200 bg-white",
                )}
              >
                {includeJira && (
                  <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-blue-600" />
                )}

                <div className="flex items-center gap-4">
                  <GitBranch className="h-6 w-6 text-blue-600" />

                  <div className="text-left">
                    <div className="font-semibold text-lg">Jira</div>
                    <div className="text-xs text-muted-foreground">
                      Synchronize issues & sprints
                    </div>
                  </div>
                </div>
              </button>

              {/* GITHUB */}

              <button
                type="button"
                onClick={() => setIncludeGithub((prev) => !prev)}
                className={cn(
                  "relative rounded-xl border p-6 transition-all hover:shadow-lg",
                  includeGithub
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-200 bg-white",
                )}
              >
                {includeGithub && (
                  <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-blue-600" />
                )}

                <div className="flex items-center gap-4">
                  <Github className="h-6 w-6 text-gray-900" />

                  <div className="text-left">
                    <div className="font-semibold text-lg">GitHub</div>
                    <div className="text-xs text-muted-foreground">
                      Synchronize repositories & commits
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <Separator />

          {/* SCOPE */}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Synchronization Scope
            </h3>

            <Select
              value={scope}
              onValueChange={(v: "BACKLOG" | "SPRINT" | "CUSTOM") =>
                setScope(v)
              }
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="BACKLOG">Full Project</SelectItem>
                <SelectItem value="SPRINT">Sprint</SelectItem>
                <SelectItem value="CUSTOM">Custom</SelectItem>
              </SelectContent>
            </Select>

            {scope === "SPRINT" && (
              <Input
                type="number"
                placeholder="Sprint ID"
                value={sprintId ?? ""}
                onChange={(e) =>
                  setSprintId(e.target.value ? Number(e.target.value) : null)
                }
              />
            )}
          </div>

          <Separator />

          {/* BUTTON */}

          <Button
            className="w-full rounded-full h-12 text-base font-semibold"
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
