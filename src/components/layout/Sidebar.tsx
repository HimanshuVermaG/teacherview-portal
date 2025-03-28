
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, BarChart, PlusCircle, Layers, Users, Calendar, Settings } from "lucide-react";

type NavItemProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

const NavItem = ({ to, label, icon, active }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 transition-all",
        active ? "bg-blue-50 text-teacher-primary font-medium" : "hover:bg-gray-100"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 hidden md:block overflow-y-auto">
      <div className="py-6 px-4">
        <div className="mb-8 flex flex-col gap-1">
          <h2 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Main Menu</h2>
          <nav className="flex flex-col gap-1">
            <NavItem 
              to="/" 
              label="Dashboard" 
              icon={<Layers className="h-5 w-5" />} 
              active={isActive("/")}
            />
            <NavItem 
              to="/create" 
              label="Create Content" 
              icon={<PlusCircle className="h-5 w-5" />} 
              active={isActive("/create")}
            />
            <NavItem 
              to="/reports" 
              label="Student Reports" 
              icon={<BarChart className="h-5 w-5" />} 
              active={isActive("/reports")}
            />
            <NavItem 
              to="/manage-students" 
              label="Manage Students" 
              icon={<Users className="h-5 w-5" />} 
              active={isActive("/manage-students")}
            />
          </nav>
        </div>
        
        <div className="mb-8 flex flex-col gap-1">
          <h2 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Classes</h2>
          <nav className="flex flex-col gap-1">
            <NavItem 
              to="/class/math-101" 
              label="Math 101" 
              icon={<BookOpen className="h-5 w-5" />} 
              active={isActive("/class/math-101")}
            />
            <NavItem 
              to="/class/science-101" 
              label="Science 101" 
              icon={<BookOpen className="h-5 w-5" />} 
              active={isActive("/class/science-101")}
            />
            <NavItem 
              to="/class/history-101" 
              label="History 101" 
              icon={<BookOpen className="h-5 w-5" />} 
              active={isActive("/class/history-101")}
            />
          </nav>
        </div>
        
        <div className="flex flex-col gap-1">
          <h2 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Other</h2>
          <nav className="flex flex-col gap-1">
            <NavItem 
              to="/calendar" 
              label="Calendar" 
              icon={<Calendar className="h-5 w-5" />} 
              active={isActive("/calendar")}
            />
            <NavItem 
              to="/settings" 
              label="Settings" 
              icon={<Settings className="h-5 w-5" />} 
              active={isActive("/settings")}
            />
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
