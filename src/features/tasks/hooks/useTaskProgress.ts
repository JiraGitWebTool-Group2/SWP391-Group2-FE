import { useEffect, useState } from "react";
import { getTasks } from "../services";
import type { Task } from "../types";

export function useTaskProgress(projectId: number) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks(projectId)
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [projectId]);

  const todo = tasks.filter((t) => t.status === "TODO");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const done = tasks.filter((t) => t.status === "DONE");

  return { todo, inProgress, done, loading };
}
