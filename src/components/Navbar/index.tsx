import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useAuthContext } from "@/context/AuthProvider";
import { Logo, Spinner } from "@/components";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useAuthContext();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex items-center gap-x-2 w-full justify-end md:ml-auto ">
        {loading && <Spinner />}
        {!loading && !isAuthenticated && (
          <>
            <Button onClick={() => navigate("/login")} variant="ghost" size="sm">
              Log in
            </Button>
            <Button onClick={() => navigate("/register")} size="sm">
              Sign up
            </Button>
          </>
        )}
        {!loading && isAuthenticated && user && (
          <Button variant="ghost" size="sm" asChild>
            <Link to={"/home"}>Notes</Link>
            <div className="h-4 w-4 bg-red rounded-full">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};
