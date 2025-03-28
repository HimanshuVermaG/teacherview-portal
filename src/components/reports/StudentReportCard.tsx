
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type StudentReportCardProps = {
  id: string;
  name: string;
  rollNumber: string;
  performance: number;
  avgScore: number;
  lastActivity: string;
  className?: string;
};

const StudentReportCard = ({
  id,
  name,
  rollNumber,
  performance,
  avgScore,
  lastActivity,
  className,
}: StudentReportCardProps) => {
  const getPerformanceColor = (perf: number) => {
    if (perf >= 80) return "bg-green-500";
    if (perf >= 60) return "bg-blue-500";
    if (perf >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">Roll #: {rollNumber}</p>
        </div>
        
        <Button size="sm" variant="outline" className="h-8" asChild>
          <Link to={`/student/${id}`}>
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Details
          </Link>
        </Button>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <div className="h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white bg-teacher-primary">
              {Math.round(performance)}%
            </div>
          </div>
          <p className="text-xs text-gray-500">Performance</p>
        </div>
        
        <div className="text-center">
          <div className="font-semibold mb-1">{avgScore}/100</div>
          <p className="text-xs text-gray-500">Avg Score</p>
        </div>
        
        <div className="text-center">
          <div className="font-semibold mb-1">{lastActivity}</div>
          <p className="text-xs text-gray-500">Last Active</p>
        </div>
      </div>
      
      <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className={cn("h-1.5 rounded-full", getPerformanceColor(performance))} 
          style={{ width: `${performance}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StudentReportCard;
