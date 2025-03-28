
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PerformanceChartProps = {
  title: string;
  data: Array<Record<string, any>>;
  xAxisKey: string;
  yAxisDomain?: [number, number];
  lines: Array<{
    dataKey: string;
    name: string;
    colorKey: string;
  }>;
  height?: number;
};

const PerformanceChart = ({
  title,
  data,
  xAxisKey,
  yAxisDomain = [0, 100],
  lines,
  height = 300
}: PerformanceChartProps) => {
  const chartElement = (
    <RechartsPrimitive.ResponsiveContainer width="100%" height={height}>
      <RechartsPrimitive.LineChart
        data={data}
        margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
      >
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        <RechartsPrimitive.XAxis 
          dataKey={xAxisKey}
          tick={{ fontSize: 12 }}
          padding={{ left: 10, right: 10 }}
        />
        <RechartsPrimitive.YAxis 
          domain={yAxisDomain}
          tick={{ fontSize: 12 }}
        />
        <RechartsPrimitive.Tooltip />
        <RechartsPrimitive.Legend
          verticalAlign="bottom"
          height={36}
        />
        {lines.map((line) => (
          <RechartsPrimitive.Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={`var(--color-${line.colorKey})`}
            activeDot={{ r: 6 }}
            strokeWidth={2}
          />
        ))}
      </RechartsPrimitive.LineChart>
    </RechartsPrimitive.ResponsiveContainer>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[350px] w-full">
          <ChartContainer
            config={Object.fromEntries(
              lines.map(line => [
                line.colorKey,
                { color: line.colorKey === "avgScore" ? "hsl(var(--primary))" : "hsl(var(--secondary))" }
              ])
            )}
          >
            {chartElement}
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
