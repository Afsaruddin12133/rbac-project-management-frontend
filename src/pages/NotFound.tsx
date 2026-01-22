import PageLayout from "../components/layout/PageLayout";

const NotFound = () => {
  return (
    <PageLayout
      title="Page not found"
      description="The page you are looking for does not exist yet."
    >
      <p>Check the URL or return to the dashboard.</p>
    </PageLayout>
  );
};

export default NotFound;
