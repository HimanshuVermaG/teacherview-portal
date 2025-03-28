
import { Link } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type ClassCardProps = {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  activeContent: number;
  color?: string;
};

const ClassCard = ({ id, name, subject, studentCount, activeContent, color = "blue" }: ClassCardProps) => {
  const colorVariants = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
  };

  const selectedColor = colorVariants[color as keyof typeof colorVariants] || colorVariants.blue;

  return (
    <Link to={`/class/${id}`} className="dashboard-card group transition-all">
      <div className={cn("h-3 rounded-t-lg mb-4 bg-gradient-to-r -mx-6 -mt-6", selectedColor)}></div>
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-4">{subject}</p>
      
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{studentCount} students</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <BookOpen className="h-4 w-4" />
          <span>{activeContent} items</span>
        </div>
      </div>
    </Link>
  );
};

export default ClassCard;
