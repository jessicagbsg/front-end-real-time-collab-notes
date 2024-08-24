import { useAuth } from "@/hooks/useAuth";
import { ChevronsLeftRight } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { capitalize } from "lodash";
import { useNavigate } from "react-router-dom";

export const UserItem = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div role="button" className="flex items-center text-sm m-3">
          <div className="flex gap-x-2 items-center max-w-[150px]">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-muted-foreground">
                {user?.firstName?.[0].toUpperCase()}
                {user?.lastName?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {capitalize(user?.firstName)} {capitalize(user?.lastName)}
            </span>
          </div>
          <ChevronsLeftRight className="h-4 w-4 ml-2 rotate-90 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer text-muted-foreground">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
