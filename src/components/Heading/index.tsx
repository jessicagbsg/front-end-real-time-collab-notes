import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Whatever is on your mind. Noted. Shared. Welcome to
        <span className="underline"> Notesphere</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notesphere is a real-time collaborative note-taking app
      </h3>
      <Button>
        Get Started
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
