import type { AuthState } from "./types";

const STORAGE_KEY = "rbac.auth";

const emptyState: AuthState = {
  token: null,
  user: null,
};

export const loadAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return emptyState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyState;
    }

    const parsed = JSON.parse(raw) as AuthState;
    return {
      token: parsed.token ?? null,
      user: parsed.user ?? null,
    };
  } catch {
    return emptyState;
  }
};

export const persistAuthState = (state: AuthState) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage write failures (e.g. private mode).
  }
};

export const clearAuthState = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage removal failures.
  }
};
