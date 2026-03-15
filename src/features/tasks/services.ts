import { api } from "@/lib/axios";
import type { Task } from "./types";

export async function getTasks(projectId: number): Promise<Task[]> {
  const res = await api.get(`/projects/${projectId}/tasks`);
  return res.data;
}
