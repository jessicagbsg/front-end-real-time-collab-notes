import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Logo, Spinner, Button } from "@/components";
import { useAuthContext } from "@/context/AuthProvider";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuthContext();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex items-center gap-x-2 w-full justify-end md:ml-auto ">
        {isLoading && <Spinner />}
        {!isLoading && !isAuthenticated && (
          <>
            <Button onClick={() => navigate("/login")} variant="ghost" size="sm">
              Log in
            </Button>
            <Button onClick={() => navigate("/register")} size="sm">
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
