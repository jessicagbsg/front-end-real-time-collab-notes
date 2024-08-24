import { Button, InternalLayout } from "@/components";
import { capitalize } from "lodash";
import { useAuth } from "@/hooks/useAuth";
import { PlusCircle } from "lucide-react";

export const Home = () => {
  const { user } = useAuth();

  return (
    <InternalLayout>
      <div className="h-full flex flex-col">
        <h2 className="ml-10 mt-10 text-2xl sm:text-3xl md:text-4xl font-bold ">
          Welcome {capitalize(user?.firstName)} {capitalize(user?.lastName)}
        </h2>
        <div
          className={`flex flex-col flex-1 items-center justify-center 
          text-center gap-y-8 `}
        >
          <img
            src="/hero-illo.png"
            alt=" "
            className="h-72 max-w-96 md:max-w-screen-sm object-contain"
          />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
            Get started by creating a new note
          </h3>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create a new note
          </Button>
        </div>
      </div>
    </InternalLayout>
  );
};
