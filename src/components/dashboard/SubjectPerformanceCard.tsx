
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  // Create the chart element to pass directly to ChartContainer
  const chartElement = (
    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
      <RechartsPrimitive.BarChart 
        data={data}
        margin={{ 
          top: 5, 
          right: isMobile ? 10 : 30, 
          left: isMobile ? 0 : 20, 
          bottom: 5 
        }}
      >
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        <RechartsPrimitive.XAxis 
          dataKey="name" 
          tick={{ fontSize: isMobile ? 10 : 12 }}
        />
        <RechartsPrimitive.YAxis 
          tick={{ fontSize: isMobile ? 10 : 12 }}
        />
        <RechartsPrimitive.Tooltip 
          formatter={(value, name) => {
            if (name === "avgScore") return [`${value}%`, "Average Score"];
            if (name === "passingRate") return [`${value}%`, "Passing Rate"];
            return [value, name];
          }} 
        />
        <RechartsPrimitive.Legend />
        <RechartsPrimitive.Bar dataKey="avgScore" fill="var(--color-avgScore)" />
        <RechartsPrimitive.Bar dataKey="passingRate" fill="var(--color-passingRate)" />
      </RechartsPrimitive.BarChart>
    </RechartsPrimitive.ResponsiveContainer>
  );

  return (
    <div className={`dashboard-card ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
      
      <div className="h-64 md:h-80 mb-6">
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
          <div key={subject.name} className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700">{subject.name}</h4>
            <div className="text-lg font-semibold mt-1">{subject.avgScore}%</div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{subject.studentCount} students</span>
              <span>Top: {subject.topPerformer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPerformanceCard;
