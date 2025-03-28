
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BookOpen, BarChart, PlusCircle, Layers, Users, Calendar, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItemProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

const NavItem = ({ to, label, icon, active, onClick }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 transition-all",
        active ? "bg-blue-50 text-teacher-primary font-medium" : "hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-teacher-primary">TeacherView Portal</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="py-6 px-4">
          <div className="mb-8 flex flex-col gap-1">
            <h2 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Main Menu</h2>
            <nav className="flex flex-col gap-1">
              <NavItem 
                to="/" 
                label="Dashboard" 
                icon={<Layers className="h-5 w-5" />} 
                active={isActive("/")}
                onClick={onClose}
              />
              <NavItem 
                to="/create" 
                label="Create Content" 
                icon={<PlusCircle className="h-5 w-5" />} 
                active={isActive("/create")}
                onClick={onClose}
              />
              <NavItem 
                to="/reports" 
                label="Student Reports" 
                icon={<BarChart className="h-5 w-5" />} 
                active={isActive("/reports")}
                onClick={onClose}
              />
              <NavItem 
                to="/manage-students" 
                label="Manage Students" 
                icon={<Users className="h-5 w-5" />} 
                active={isActive("/manage-students")}
                onClick={onClose}
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
                onClick={onClose}
              />
              <NavItem 
                to="/class/science-101" 
                label="Science 101" 
                icon={<BookOpen className="h-5 w-5" />} 
                active={isActive("/class/science-101")}
                onClick={onClose}
              />
              <NavItem 
                to="/class/history-101" 
                label="History 101" 
                icon={<BookOpen className="h-5 w-5" />} 
                active={isActive("/class/history-101")}
                onClick={onClose}
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
                onClick={onClose}
              />
              <NavItem 
                to="/settings" 
                label="Settings" 
                icon={<Settings className="h-5 w-5" />} 
                active={isActive("/settings")}
                onClick={onClose}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
