export interface UserGetMe {
  userId?: number;
  email: string;
  fullName: string;
  role: string;
  provider?: string;
  isActive?: boolean;
}
