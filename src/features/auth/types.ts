export type UserRole = "ADMIN" | "MANAGER" | "STAFF";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterViaInviteRequest {
  token: string;
  name: string;
  password: string;
}
