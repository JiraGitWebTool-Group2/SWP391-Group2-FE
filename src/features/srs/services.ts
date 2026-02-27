import { api } from "@/lib/axios";
import type { GenerateSrsRequest, SrsDocument } from "./types";

export const srsService = {
  generate: (data: GenerateSrsRequest) =>
    api.post<SrsDocument>("/srs/generate", data),

  getByGroup: (groupId: string) =>
    api.get<SrsDocument[]>(`/srs/group/${groupId}`),

  getById: (id: string) => api.get<SrsDocument>(`/srs/${id}`),

  update: (id: string, data: Partial<SrsDocument>) =>
    api.put(`/srs/${id}`, data),

  submit: (id: string) => api.post(`/srs/${id}/submit`),

  approve: (id: string) => api.post(`/srs/${id}/approve`),

  reject: (id: string) => api.post(`/srs/${id}/reject`),
};
