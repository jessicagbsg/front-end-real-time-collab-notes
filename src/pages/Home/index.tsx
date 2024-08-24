import { InternalLayout, Spinner } from "@/components";
import { useAuth } from "@/hooks/useAuth";

export const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <InternalLayout>
      <div>home</div>
    </InternalLayout>
  );
};
