
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="text-xl font-bold text-teacher-primary">
          TeacherView Portal
        </Link>
      </div>
      
      <div className="hidden md:flex items-center relative rounded-full bg-gray-100 px-3 py-1.5 w-80">
        <Search className="h-4 w-4 text-gray-500 mr-2" />
        <input
          className="bg-transparent border-none outline-none w-full text-sm"
          placeholder="Search for classes, students, or resources..."
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
        <div className="h-8 w-8 rounded-full bg-teacher-primary text-white flex items-center justify-center text-sm font-medium">
          TP
        </div>
      </div>
    </header>
  );
};

export default Header;
