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

import type { Class, CreateSyncRunRequest } from "../types";

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
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const handleSubmit = async () => {
    if (!includeJira && !includeGithub) {
      toast.error("Please select at least one data source");
      return;
    }

    if (scope === "SPRINT" && !sprintId) {
      toast.error("Sprint ID is required");
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

      toast.success("Synchronization started successfully");
    } catch {
      toast.error("Failed to start synchronization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-8"
    >
      <Card className="w-full max-w-3xl shadow-xl border rounded-3xl bg-white/90 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Data Synchronization
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Synchronize project data from Jira and GitHub
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* DATA SOURCES */}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
              DATA SOURCES
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* JIRA */}

              <button
                type="button"
                onClick={() => setIncludeJira((prev) => !prev)}
                className={cn(
                  "relative rounded-2xl border p-6 transition-all hover:shadow-xl hover:-translate-y-0.5",
                  includeJira
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 bg-white",
                )}
              >
                {includeJira && (
                  <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-indigo-600" />
                )}

                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-indigo-100">
                    <GitBranch className="h-5 w-5 text-indigo-600" />
                  </div>

                  <div className="text-left">
                    <div className="font-semibold text-base">Jira</div>

                    <div className="text-xs text-muted-foreground">
                      Sync issues, sprints, and backlog data
                    </div>
                  </div>
                </div>
              </button>

              {/* GITHUB */}

              <button
                type="button"
                onClick={() => setIncludeGithub((prev) => !prev)}
                className={cn(
                  "relative rounded-2xl border p-6 transition-all hover:shadow-xl hover:-translate-y-0.5",
                  includeGithub
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 bg-white",
                )}
              >
                {includeGithub && (
                  <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-indigo-600" />
                )}

                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Github className="h-5 w-5 text-slate-800" />
                  </div>

                  <div className="text-left">
                    <div className="font-semibold text-base">GitHub</div>

                    <div className="text-xs text-muted-foreground">
                      Sync repositories, commits, and contributors
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <Separator />

          {/* SCOPE */}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
              SYNCHRONIZATION SCOPE
            </h3>

            <Select
              value={scope}
              onValueChange={(v: "BACKLOG" | "SPRINT" | "CUSTOM") =>
                setScope(v)
              }
            >
              <SelectTrigger className="h-11 w-full rounded-xl px-3 text-sm">
                <SelectValue placeholder="Select synchronization scope" />
              </SelectTrigger>

              <SelectContent className="w-full">
                <SelectItem value="BACKLOG">
                  Full Project (Backlog + Sprints)
                </SelectItem>

                <SelectItem value="SPRINT">Specific Sprint</SelectItem>

                <SelectItem value="CUSTOM">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            {scope === "SPRINT" && (
              <Input
                type="number"
                placeholder="Enter Sprint ID"
                value={sprintId ?? ""}
                onChange={(e) =>
                  setSprintId(e.target.value ? Number(e.target.value) : null)
                }
              />
            )}
          </div>

          <Separator />

          {/* ACTION BUTTON */}

          <Button
            className="w-full rounded-full h-12 text-base font-semibold shadow-sm hover:shadow-md border-amber-500 bg-amber-400 text-white hover:bg-amber-500 transition"
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
