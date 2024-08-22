import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Logo } from "@/components/Logo";
import { Button } from "../ui/button";

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className=" flex items-center gap-x-2 w-full justify-between md:ml-auto md:justify-end">
        <Button>Log in</Button>
      </div>
    </div>
  );
};
