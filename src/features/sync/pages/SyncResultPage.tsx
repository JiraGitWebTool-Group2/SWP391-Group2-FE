"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSyncRun } from "../services";
import type { SyncRunDetail } from "../types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function SyncResultPage() {
  const { syncRunId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<SyncRunDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!syncRunId) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const fetchData = async () => {
      try {
        const res = await getSyncRun(Number(syncRunId));
        setData(res);

        if (res.runStatus === "RUNNING") {
          timeoutId = setTimeout(fetchData, 3000);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [syncRunId]);

  const renderStatus = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <CheckCircle2 className="h-5 w-5" />
            Success
          </div>
        );
      case "FAILED":
        return (
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <XCircle className="h-5 w-5" />
            Failed
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-yellow-600 font-medium">
            <Clock className="h-5 w-5" />
            Running
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center text-red-500">
        Không tìm thấy dữ liệu
      </div>
    );
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <Card className="shadow-xl rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Sync Run #{data.syncRunId}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            {renderStatus(data.runStatus)}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-muted rounded-xl p-4">
              <div className="text-sm text-muted-foreground">Started At</div>
              <div className="font-medium">
                {new Date(data.startedAt).toLocaleString()}
              </div>
            </div>

            <div className="bg-muted rounded-xl p-4">
              <div className="text-sm text-muted-foreground">Finished At</div>
              <div className="font-medium">
                {data.finishedAt
                  ? new Date(data.finishedAt).toLocaleString()
                  : "-"}
              </div>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-sm whitespace-pre-wrap">
            {data.notes}
          </div>

          {/* View Snapshot Button */}
          {data.snapshotId && data.runStatus === "SUCCESS" && (
            <Button
              className="w-full rounded-full h-11"
              onClick={() => navigate(`/snapshot/${data.snapshotId}`)}
            >
              View Snapshot #{data.snapshotId}
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={() => navigate("/sync")}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
