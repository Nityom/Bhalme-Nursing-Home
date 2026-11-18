/**
 * Svasth-HMS / Bhalme Nursing Home — Auth bypassed / default administrator session
 */

export type UserRole = "admin" | "staff";

export interface AuthUser {
  email: string;
  role: UserRole;
  name: string;
  loginAt: number;   // ms since epoch
  expiresAt: number; // ms since epoch
}

const DEFAULT_ADMIN: AuthUser = {
  email: "dr.nitin@bhalmenursinghome.com",
  role: "admin",
  name: "Dr. Nitin Bhalme",
  loginAt: 0,
  expiresAt: Number.MAX_SAFE_INTEGER,
};

export function login(_email?: string, _password?: string): AuthUser {
  return DEFAULT_ADMIN;
}

export function logout(): void {
  // Auth page removed; no-op
}

export function getSession(): AuthUser {
  return DEFAULT_ADMIN;
}

export function isAdmin(): boolean {
  return true;
}

export function isAuthenticated(): boolean {
  return true;
}

export const ADMIN_ONLY_PATHS: string[] = [];

export function canAccessPath(_path: string, _role?: UserRole): boolean {
  return true;
}

