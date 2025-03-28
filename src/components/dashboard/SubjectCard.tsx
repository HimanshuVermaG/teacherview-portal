
import { Link } from "react-router-dom";
import { BookOpen, Users, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

type SubjectCardProps = {
  id: string;
  classId: string;
  name: string;
  avgScore: number;
  studentCount: number;
  passingRate: number;
  topPerformer: string;
  color?: string;
};

const SubjectCard = ({ 
  id, 
  classId,
  name, 
  avgScore, 
  studentCount, 
  passingRate, 
  topPerformer,
  color = "blue" 
}: SubjectCardProps) => {
  const colorVariants = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
  };

  const selectedColor = colorVariants[color as keyof typeof colorVariants] || colorVariants.blue;

  return (
    <Link to={`/class/${classId}/subject/${id}`} className="dashboard-card group transition-all">
      <div className={cn("h-3 rounded-t-lg mb-4 bg-gradient-to-r -mx-6 -mt-6", selectedColor)}></div>
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      
      <div className="flex items-center mt-2 mb-3">
        <div className="text-2xl font-bold">{avgScore}%</div>
        <span className="text-xs text-gray-500 ml-2">avg. score</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{studentCount} students</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <BarChart className="h-4 w-4" />
          <span>{passingRate}% passing</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
        <span>Top performer: {topPerformer}</span>
      </div>
    </Link>
  );
};

export default SubjectCard;
