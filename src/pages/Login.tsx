import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { useLoginMutation } from "../features/auth/authApi";
import { ROUTES } from "../routes/paths";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage = useMemo(() => {
    if (!error) {
      return "";
    }

    const fetchError = error as FetchBaseQueryError;
    if (fetchError && typeof fetchError === "object" && "data" in fetchError) {
      const data = fetchError.data as
        | { message?: string; error?: string }
        | string
        | undefined;
      if (typeof data === "string") {
        return data;
      }
      return (
        data?.message ?? data?.error ?? "Unable to sign in. Please try again."
      );
    }

    const serialized = error as SerializedError;
    return serialized.message ?? "Unable to sign in. Please try again.";
  }, [error]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      console.error("Login failed:", error);
    }
  }, [errorMessage, error]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login({ email, password }).unwrap();
      toast.success("Signed in successfully.");
      navigate(ROUTES.root, {
        replace: true,
      });
    } catch {
      // Errors are handled via RTK Query state.
    }
  };

  return (
    <PageLayout
      title="Sign in"
      description="Use your admin or staff credentials to access the workspace."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-base font-medium text-slate-900">Welcome back</p>
          <p className="text-sm text-slate-600">
            Access your RBAC workspace to manage teams, permissions, and
            projects. Your permissions determine what you can view and edit.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Tip: Use your organization email and the password assigned by your
            administrator.
          </div>
        </div>
        <form
          className="flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1">
            <p className="text-base font-semibold text-slate-900">
              Sign in to continue
            </p>
            <p className="text-sm text-slate-500">
              Enter your credentials to access the dashboard.
            </p>
          </div>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              required
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </label>
          <button
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </PageLayout>
  );
};

export default Login;
