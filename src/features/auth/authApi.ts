import { api } from "../../services/api";
import { setCredentials } from "./authSlice";
import type {
  AuthResponse,
  LoginRequest,
  RegisterViaInviteRequest,
} from "./types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // Let callers handle auth errors.
        }
      },
    }),

    registerViaInvite: builder.mutation<AuthResponse, RegisterViaInviteRequest>(
      {
        query: (data) => ({
          url: "/auth/register-via-invite",
          method: "POST",
          body: data,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setCredentials(data));
          } catch {
            // Let callers handle registration errors.
          }
        },
      },
    ),
  }),
});

export const { useLoginMutation, useRegisterViaInviteMutation } = authApi;
