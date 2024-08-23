import { Logo, Button } from "@/components";

export const Footer = () => {
  return (
    <div className="flex items-center justify-between p-3 bg-background z-50">
      <div className="hidden md:flex">
        <Logo />
      </div>
      <div
        className={`md:ml-auto w-full flex items-center gap-x-2 justify-between
           md:justify-end text-muted-foreground`}
      >
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};
