import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Project } from "@/features/admin/types";

interface ProjectState {
  currentProjectId: number | null;
  currentProject: Project | null;

  setProject: (project: Project) => void;
  clearProject: () => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      currentProjectId: null,
      currentProject: null,

      setProject: (project) =>
        set({
          currentProjectId: project.projectId,
          currentProject: project,
        }),

      clearProject: () =>
        set({
          currentProjectId: null,
          currentProject: null,
        }),
    }),
    {
      name: "project-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
