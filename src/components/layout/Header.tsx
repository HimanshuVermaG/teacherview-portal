
import { Link } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/" className="text-xl font-bold text-blue-600 md:text-2xl">
          TeacherView Portal
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm">
                <span className="text-muted-foreground">Welcome, </span>
                <span className="font-medium">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
