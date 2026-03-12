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
    <Card className="w-full max-w-3xl shadow-xl border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Data Synchronization
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Sources */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Data Sources</h3>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setIncludeJira((prev) => !prev)}
              className={cn(
                "relative rounded-xl border p-5 transition",
                includeJira ? "border-primary bg-primary/10" : "border-muted",
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

            <button
              type="button"
              onClick={() => setIncludeGithub((prev) => !prev)}
              className={cn(
                "relative rounded-xl border p-5 transition",
                includeGithub ? "border-primary bg-primary/10" : "border-muted",
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
            onValueChange={(v: "BACKLOG" | "SPRINT" | "CUSTOM") => setScope(v)}
          >
            <SelectTrigger>
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

        <Button
          className="w-full rounded-full h-11"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Start Synchronization
        </Button>
      </CardContent>
    </Card>
  );
}
