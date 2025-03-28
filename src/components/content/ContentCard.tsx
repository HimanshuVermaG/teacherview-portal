
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Pencil, BarChart, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContentCardProps = {
  id: string;
  title: string;
  type: "quiz" | "practice" | "test";
  status: "draft" | "published" | "scheduled";
  timeLimit?: number;
  questionCount: number;
  submissions?: number;
  dueDate?: string;
  className?: string;
};

const ContentCard = ({
  id,
  title,
  type,
  status,
  timeLimit,
  questionCount,
  submissions = 0,
  dueDate,
  className,
}: ContentCardProps) => {
  const typeLabels = {
    quiz: "Quiz",
    practice: "Practice Set",
    test: "Test"
  };
  
  const statusColors = {
    draft: "bg-gray-200 text-gray-800",
    published: "bg-green-200 text-green-800",
    scheduled: "bg-blue-200 text-blue-800"
  };

  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs px-2 py-0.5 rounded-full", statusColors[status])}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="text-xs text-gray-500">{typeLabels[type]}</span>
          </div>
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        </div>
        
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8" asChild>
            <Link to={`/edit/${id}`}>
              <Pencil className="h-3.5 w-3.5 mr-1" />
              Edit
            </Link>
          </Button>
          
          <Button size="sm" variant="outline" className="h-8" asChild>
            <Link to={`/reports/${id}`}>
              <BarChart className="h-3.5 w-3.5 mr-1" />
              Reports
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Users className="h-3.5 w-3.5" />
          <span>{submissions} submissions</span>
        </div>
        
        {timeLimit && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="h-3.5 w-3.5" />
            <span>{timeLimit} min</span>
          </div>
        )}
        
        {dueDate && (
          <div className="text-xs text-gray-600">
            Due: {dueDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
