
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BookOpen, BarChart, PlusCircle, Layers, Users, Calendar, Settings, X, Activity } from "lucide-react";
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
  const isClassActive = (classId: string) => location.pathname.includes(`/teacher/class/${classId}`);

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
                to="/teacher" 
                label="Dashboard" 
                icon={<Layers className="h-5 w-5" />} 
                active={isActive("/teacher")}
                onClick={onClose}
              />
              <NavItem 
                to="/teacher/create" 
                label="Create Content" 
                icon={<PlusCircle className="h-5 w-5" />} 
                active={isActive("/teacher/create")}
                onClick={onClose}
              />
              <NavItem 
                to="/teacher/reports" 
                label="Student Reports" 
                icon={<BarChart className="h-5 w-5" />} 
                active={isActive("/teacher/reports")}
                onClick={onClose}
              />
              <NavItem 
                to="/teacher/manage-students" 
                label="Manage Students" 
                icon={<Users className="h-5 w-5" />} 
                active={isActive("/teacher/manage-students")}
                onClick={onClose}
              />
              <NavItem 
                to="/teacher/activity" 
                label="Activity Log" 
                icon={<Activity className="h-5 w-5" />} 
                active={isActive("/teacher/activity")}
                onClick={onClose}
              />
            </nav>
          </div>
          
          <div className="mb-8 flex flex-col gap-1">
            <h2 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Classes</h2>
            <nav className="flex flex-col gap-1">
              <NavItem 
                to="/teacher/class/class-6" 
                label="Class 6" 
                icon={<BookOpen className="h-5 w-5" />} 
                active={isClassActive("class-6")}
                onClick={onClose}
              />
              <NavItem 
                to="/teacher/class/class-7" 
                label="Class 7" 
                icon={<BookOpen className="h-5 w-5" />} 
                active={isClassActive("class-7")}
                onClick={onClose}
              />
              <NavItem 
                to="/teacher/class/class-8" 
                label="Class 8" 
                icon={<BookOpen className="h-5 w-5" />} 
                active={isClassActive("class-8")}
                onClick={onClose}
              />
            </nav>
          </div>
          
          <div className="flex flex-col gap-1">
            <h2 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Other</h2>
            <nav className="flex flex-col gap-1">
              <NavItem 
                to="/teacher/calendar" 
                label="Calendar" 
                icon={<Calendar className="h-5 w-5" />} 
                active={isActive("/teacher/calendar")}
                onClick={onClose}
              />
              <NavItem 
                to="/teacher/settings" 
                label="Settings" 
                icon={<Settings className="h-5 w-5" />} 
                active={isActive("/teacher/settings")}
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
