export type SrsStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "REVIEWED"
  | "APPROVED"
  | "REJECTED";

export interface SrsSection {
  id: string;
  title: string;
  content: string;
}

export interface SrsDocument {
  id: string;
  groupId: string;
  title: string;
  version: string;
  status: SrsStatus;
  createdAt: string;
  updatedAt: string;
  sections: SrsSection[];
}

export interface GenerateSrsRequest {
  groupId: string;
  templateId: string;
}
