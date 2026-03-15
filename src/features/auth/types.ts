export interface User {
  userId: number;
  system_Role: string;
  email: string;
  name: string;
}

export interface MyJwtPayload {
  userId?: number;
  sub?: string | number;
  email?: string;
  name?: string;
}
