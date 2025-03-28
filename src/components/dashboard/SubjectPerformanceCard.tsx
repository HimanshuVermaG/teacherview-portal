
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SubjectPerformanceData = {
  name: string;
  avgScore: number;
  studentCount: number;
  passingRate: number;
  topPerformer: string;
};

type SubjectPerformanceCardProps = {
  data: SubjectPerformanceData[];
  className?: string;
};

const SubjectPerformanceCard = ({ data, className }: SubjectPerformanceCardProps) => {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<"score" | "passing">("score");

  // Pre-render the chart element
  const chartElement = (
    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
      <RechartsPrimitive.BarChart 
        data={data}
        margin={{ 
          top: 10, 
          right: isMobile ? 10 : 30, 
          left: isMobile ? 0 : 20, 
          bottom: 15 
        }}
      >
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        <RechartsPrimitive.XAxis 
          dataKey="name" 
          tick={{ fontSize: isMobile ? 10 : 12 }}
        />
        <RechartsPrimitive.YAxis 
          tick={{ fontSize: isMobile ? 10 : 12 }}
          domain={[0, 100]}
          label={{ 
            value: viewMode === "score" ? "Average Score (%)" : "Passing Rate (%)", 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle', fontSize: '12px' },
            dx: -15
          }}
        />
        <RechartsPrimitive.Tooltip 
          formatter={(value, name) => {
            if (name === "avgScore") return [`${value}%`, "Average Score"];
            if (name === "passingRate") return [`${value}%`, "Passing Rate"];
            return [value, name];
          }} 
        />
        <RechartsPrimitive.Legend wrapperStyle={{ paddingTop: "10px" }} />
        {viewMode === "score" ? (
          <RechartsPrimitive.Bar 
            dataKey="avgScore" 
            name="Average Score" 
            fill="var(--color-avgScore)" 
            radius={[4, 4, 0, 0]}
          />
        ) : (
          <RechartsPrimitive.Bar 
            dataKey="passingRate" 
            name="Passing Rate" 
            fill="var(--color-passingRate)" 
            radius={[4, 4, 0, 0]}
          />
        )}
      </RechartsPrimitive.BarChart>
    </RechartsPrimitive.ResponsiveContainer>
  );

  return (
    <div className={`dashboard-card overflow-hidden ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Subject Performance</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={viewMode === "score" ? "default" : "outline"} 
            onClick={() => setViewMode("score")}
            className="text-xs px-3"
          >
            Average Score
          </Button>
          <Button 
            size="sm" 
            variant={viewMode === "passing" ? "default" : "outline"} 
            onClick={() => setViewMode("passing")}
            className="text-xs px-3"
          >
            Passing Rate
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  {viewMode === "score" 
                    ? "Shows the average performance score across all students in each subject" 
                    : "Shows the percentage of students who achieved a passing grade in each subject"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="h-64 md:h-72 mb-6 -mx-2">
        <ChartContainer
          config={{
            avgScore: { color: "hsl(var(--primary))" },
            passingRate: { color: "hsl(var(--secondary))" }
          }}
        >
          {chartElement}
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((subject) => (
          <div key={subject.name} className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
            <h4 className="text-sm font-medium text-gray-700">{subject.name}</h4>
            <div className="flex items-baseline gap-2 mt-1">
              <div className="text-lg font-semibold">{subject.avgScore}%</div>
              <div className="text-xs text-gray-500">avg. score</div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>{subject.studentCount} students</span>
              <span className="text-teacher-primary">{subject.passingRate}% passing</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              <span>Top performer: <span className="font-medium">{subject.topPerformer}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPerformanceCard;
