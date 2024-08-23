import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const Logo = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-x-2 cursor-pointer"
      onClick={() => navigate(`${!isLoading && isAuthenticated ? "/home" : "/"}`)}
    >
      <img src="/logo.png" alt="Notesphere Logo" className="h-5" />
      <p className="hidden sm:block font-semibold text-base">Notesphere</p>
    </div>
  );
};
