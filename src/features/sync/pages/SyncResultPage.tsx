"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSyncRun } from "../services";
import type { SyncRunDetail } from "../types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Loader2, CheckCircle2, XCircle, Clock, ArrowLeft } from "lucide-react";

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
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <CheckCircle2 className="h-5 w-5" />
            Success
          </div>
        );
      case "FAILED":
        return (
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <XCircle className="h-5 w-5" />
            Failed
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-yellow-600 font-semibold">
            <Clock className="h-5 w-5" />
            Running
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
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
    <div className="min-h-screen bg-slate-50 p-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* HEADER */}

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <h1 className="text-2xl font-bold">Sync Run #{data.syncRunId}</h1>
        </div>

        {/* CARD */}

        <Card className="shadow-lg rounded-2xl border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Synchronization Status</CardTitle>

            {renderStatus(data.runStatus)}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* TIME */}

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-slate-100 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">
                  Started At
                </div>

                <div className="font-medium">
                  {new Date(data.startedAt).toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-100 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">
                  Finished At
                </div>

                <div className="font-medium">
                  {data.finishedAt
                    ? new Date(data.finishedAt).toLocaleString()
                    : "-"}
                </div>
              </div>
            </div>

            {/* NOTES */}

            <div>
              <div className="text-sm font-semibold mb-2">Notes</div>

              <div className="bg-white border rounded-xl p-4 text-sm whitespace-pre-wrap">
                {data.notes ?? "No notes"}
              </div>
            </div>

            {/* BUTTONS */}

            {data.snapshotId && data.runStatus === "SUCCESS" && (
              <Button
                className="w-full h-11 rounded-full"
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
    </div>
  );
}
