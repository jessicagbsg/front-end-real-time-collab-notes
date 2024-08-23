import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const Heading = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
        Whatever is on your mind. Noted. Shared. Welcome to
        <span className="underline"> Notesphere</span>
      </h1>
      <h3 className="text-base sm:text-lg md:text-xl font-medium">
        Notesphere is a real-time collaborative note-taking app
      </h3>
      <Button onClick={() => navigate("/register")}>
        Get Started
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
