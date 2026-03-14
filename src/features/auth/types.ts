export interface User {
  userId: number;
  systemRole: string;
  email: string;
  name: string;
}

export interface MyJwtPayload {
  userId?: number;
  sub?: string | number;
  email?: string;
  name?: string;
}
