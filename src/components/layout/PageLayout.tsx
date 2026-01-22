import type { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

const PageLayout = ({ title, description, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm text-slate-500">{description}</p>
          ) : null}
        </header>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {children}
        </section>
      </div>
    </div>
  );
};

export default PageLayout;
