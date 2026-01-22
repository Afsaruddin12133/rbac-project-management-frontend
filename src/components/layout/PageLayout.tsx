import type { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

const PageLayout = ({ title, description, children }: PageLayoutProps) => {
  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">{title}</h1>
        {description ? (
          <p className="page__description">{description}</p>
        ) : null}
      </header>
      <section className="page__content">{children}</section>
    </div>
  );
};

export default PageLayout;
