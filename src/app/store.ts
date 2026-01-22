import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import authReducer, {
  logout,
  setCredentials,
} from "../features/auth/authSlice";
import {
  clearAuthState,
  loadAuthState,
  persistAuthState,
} from "../features/auth/authStorage";
import type { AuthState } from "../features/auth/types";
import { api } from "../services/api";

const authListener = createListenerMiddleware();

authListener.startListening({
  matcher: isAnyOf(setCredentials, logout),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as { auth: AuthState };
    if (state.auth.token && state.auth.user) {
      persistAuthState(state.auth);
    } else {
      clearAuthState();
    }
  },
});

export const store = configureStore({
  preloadedState: {
    auth: loadAuthState(),
  },
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authListener.middleware, api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
