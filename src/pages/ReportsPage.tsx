
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Search, UserPlus } from "lucide-react";
import StudentReportCard from "@/components/reports/StudentReportCard";
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Link } from "react-router-dom";

// Mock student data
const studentsData = [
  { id: "s1", name: "Alex Johnson", rollNumber: "S001", performance: 85, avgScore: 87, lastActivity: "Today" },
  { id: "s2", name: "Taylor Smith", rollNumber: "S002", performance: 72, avgScore: 74, lastActivity: "Yesterday" },
  { id: "s3", name: "Jordan Lee", rollNumber: "S003", performance: 91, avgScore: 90, lastActivity: "Today" },
  { id: "s4", name: "Casey Brown", rollNumber: "S004", performance: 65, avgScore: 68, lastActivity: "3 days ago" },
  { id: "s5", name: "Riley Wilson", rollNumber: "S005", performance: 78, avgScore: 77, lastActivity: "Today" },
  { id: "s6", name: "Jamie Garcia", rollNumber: "S006", performance: 59, avgScore: 61, lastActivity: "1 week ago" },
  { id: "s7", name: "Drew Martin", rollNumber: "S007", performance: 83, avgScore: 82, lastActivity: "Yesterday" },
  { id: "s8", name: "Avery Thomas", rollNumber: "S008", performance: 76, avgScore: 75, lastActivity: "Today" },
];

// Mock chart data for class performance
const classPerformanceData = [
  { name: "90-100%", students: 3 },
  { name: "80-89%", students: 8 },
  { name: "70-79%", students: 10 },
  { name: "60-69%", students: 6 },
  { name: "Below 60%", students: 5 },
];

// Mock chart data for subject performance
const subjectPerformanceData = [
  { name: "Math", score: 78 },
  { name: "Science", score: 82 },
  { name: "History", score: 75 },
  { name: "English", score: 85 },
];

// Render function for the bar chart
const renderBarChart = () => (
  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
    <RechartsPrimitive.BarChart data={classPerformanceData}>
      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
      <RechartsPrimitive.XAxis dataKey="name" />
      <RechartsPrimitive.YAxis />
      <RechartsPrimitive.Tooltip formatter={(value) => [`${value} students`, 'Students']} />
      <RechartsPrimitive.Bar dataKey="students" fill="var(--color-students)" />
    </RechartsPrimitive.BarChart>
  </RechartsPrimitive.ResponsiveContainer>
);

// Render function for the pie chart
const renderPieChart = () => (
  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
    <RechartsPrimitive.PieChart>
      <RechartsPrimitive.Pie
        data={[
          { name: "Completed", value: 82, dataKey: "completed" },
          { name: "In Progress", value: 12, dataKey: "inProgress" },
          { name: "Not Started", value: 6, dataKey: "notStarted" }
        ]}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        <RechartsPrimitive.Cell fill="var(--color-completed)" />
        <RechartsPrimitive.Cell fill="var(--color-inProgress)" />
        <RechartsPrimitive.Cell fill="var(--color-notStarted)" />
      </RechartsPrimitive.Pie>
      <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
      <RechartsPrimitive.Legend />
    </RechartsPrimitive.PieChart>
  </RechartsPrimitive.ResponsiveContainer>
);

// Render function for the line chart
const renderTrendLineChart = () => (
  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
    <RechartsPrimitive.LineChart
      data={[
        { month: "Jan", avgScore: 72 },
        { month: "Feb", avgScore: 74 },
        { month: "Mar", avgScore: 76 },
        { month: "Apr", avgScore: 75 },
        { month: "May", avgScore: 78 },
        { month: "Jun", avgScore: 82 }
      ]}
    >
      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
      <RechartsPrimitive.XAxis dataKey="month" />
      <RechartsPrimitive.YAxis />
      <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
      <RechartsPrimitive.Line type="monotone" dataKey="avgScore" stroke="var(--color-avgScore)" strokeWidth={2} />
    </RechartsPrimitive.LineChart>
  </RechartsPrimitive.ResponsiveContainer>
);

// Render function for the subject bar chart
const renderSubjectBarChart = () => (
  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
    <RechartsPrimitive.BarChart data={subjectPerformanceData}>
      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
      <RechartsPrimitive.XAxis dataKey="name" />
      <RechartsPrimitive.YAxis />
      <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
      <RechartsPrimitive.Bar dataKey="score" fill="var(--color-score)" />
    </RechartsPrimitive.BarChart>
  </RechartsPrimitive.ResponsiveContainer>
);

// Render function for the radar chart
const renderRadarChart = () => (
  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
    <RechartsPrimitive.RadarChart
      data={[
        { concept: "Algebra", score: 85 },
        { concept: "Geometry", score: 72 },
        { concept: "Calculus", score: 68 },
        { concept: "Statistics", score: 78 },
        { concept: "Trigonometry", score: 65 }
      ]}
    >
      <RechartsPrimitive.PolarGrid />
      <RechartsPrimitive.PolarAngleAxis dataKey="concept" />
      <RechartsPrimitive.PolarRadiusAxis />
      <RechartsPrimitive.Radar dataKey="score" stroke="var(--color-score)" fill="var(--color-score)" fillOpacity={0.6} />
      <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
    </RechartsPrimitive.RadarChart>
  </RechartsPrimitive.ResponsiveContainer>
);

// Render function for the topic bar chart
const renderTopicBarChart = () => (
  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
    <RechartsPrimitive.BarChart
      data={[
        { topic: "Equations", average: 82, highest: 95 },
        { topic: "Fractions", average: 75, highest: 92 },
        { topic: "Functions", average: 68, highest: 88 },
        { topic: "Graphing", average: 72, highest: 90 },
        { topic: "Word Problems", average: 65, highest: 85 }
      ]}
    >
      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
      <RechartsPrimitive.XAxis dataKey="topic" />
      <RechartsPrimitive.YAxis />
      <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
      <RechartsPrimitive.Legend />
      <RechartsPrimitive.Bar dataKey="average" fill="var(--color-average)" />
      <RechartsPrimitive.Bar dataKey="highest" fill="var(--color-highest)" />
    </RechartsPrimitive.BarChart>
  </RechartsPrimitive.ResponsiveContainer>
);

const ReportsPage = () => {
  const [sortBy, setSortBy] = useState("name");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sort students based on the selected criteria
  const sortStudents = (students: typeof studentsData) => {
    return [...students].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rollNumber":
          return a.rollNumber.localeCompare(b.rollNumber);
        case "performance":
          return b.performance - a.performance; // Higher performance first
        default:
          return 0;
      }
    });
  };
  
  // Filter students based on search query
  const filteredStudents = studentsData.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedStudents = sortStudents(filteredStudents);
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Reports</h1>
          <p className="text-gray-600 mt-1">View and analyze student performance across classes</p>
        </div>
      </div>
      
      <Tabs defaultValue="students" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students">
          <div className="dashboard-card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="search" className="mb-2 block">Search Students</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    id="search" 
                    placeholder="Search by name or roll number" 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="class-filter" className="mb-2 block">Filter by Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger id="class-filter">
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="math-101">Math 101</SelectItem>
                    <SelectItem value="science-101">Science 101</SelectItem>
                    <SelectItem value="history-101">History 101</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sort-by" className="mb-2 block">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rollNumber">Roll Number</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                Student List {searchQuery && <span className="font-normal text-sm">({sortedStudents.length} results)</span>}
              </h2>
            </div>
            <Button asChild>
              <Link to="/manage-students">
                <UserPlus className="h-4 w-4 mr-1" />
                Manage Students
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedStudents.map((student) => (
              <StudentReportCard
                key={student.id}
                id={student.id}
                name={student.name}
                rollNumber={student.rollNumber}
                performance={student.performance}
                avgScore={student.avgScore}
                lastActivity={student.lastActivity}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="classes">
          <div className="dashboard-card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="class-select" className="mb-2 block">Select Class</Label>
                <Select>
                  <SelectTrigger id="class-select">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math-101">Math 101</SelectItem>
                    <SelectItem value="science-101">Science 101</SelectItem>
                    <SelectItem value="history-101">History 101</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="time-period" className="mb-2 block">Time Period</Label>
                <Select>
                  <SelectTrigger id="time-period">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-semester">This Semester</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="text-lg font-semibold mb-4">Performance Distribution</h3>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    students: { color: "hsl(var(--primary))" }
                  }}
                >
                  {() => (
                    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                      <RechartsPrimitive.BarChart 
                        data={classPerformanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                        <RechartsPrimitive.XAxis dataKey="name" />
                        <RechartsPrimitive.YAxis />
                        <RechartsPrimitive.Tooltip formatter={(value) => [`${value} students`, 'Students']} />
                        <RechartsPrimitive.Bar dataKey="students" fill="var(--color-students)" />
                      </RechartsPrimitive.BarChart>
                    </RechartsPrimitive.ResponsiveContainer>
                  )}
                </ChartContainer>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3 className="text-lg font-semibold mb-4">Quiz Completion Rate</h3>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    completed: { color: "hsl(var(--primary))" },
                    inProgress: { color: "hsl(var(--secondary))" },
                    notStarted: { color: "hsl(var(--accent))" }
                  }}
                >
                  {() => (
                    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                      <RechartsPrimitive.PieChart>
                        <RechartsPrimitive.Pie
                          data={[
                            { name: "Completed", value: 82, dataKey: "completed" },
                            { name: "In Progress", value: 12, dataKey: "inProgress" },
                            { name: "Not Started", value: 6, dataKey: "notStarted" }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <RechartsPrimitive.Cell fill="var(--color-completed)" />
                          <RechartsPrimitive.Cell fill="var(--color-inProgress)" />
                          <RechartsPrimitive.Cell fill="var(--color-notStarted)" />
                        </RechartsPrimitive.Pie>
                        <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
                        <RechartsPrimitive.Legend />
                      </RechartsPrimitive.PieChart>
                    </RechartsPrimitive.ResponsiveContainer>
                  )}
                </ChartContainer>
              </div>
            </div>
            
            <div className="dashboard-card lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    avgScore: { color: "hsl(var(--primary))" }
                  }}
                >
                  {() => (
                    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                      <RechartsPrimitive.LineChart
                        data={[
                          { month: "Jan", avgScore: 72 },
                          { month: "Feb", avgScore: 74 },
                          { month: "Mar", avgScore: 76 },
                          { month: "Apr", avgScore: 75 },
                          { month: "May", avgScore: 78 },
                          { month: "Jun", avgScore: 82 }
                        ]}
                      >
                        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                        <RechartsPrimitive.XAxis dataKey="month" />
                        <RechartsPrimitive.YAxis />
                        <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
                        <RechartsPrimitive.Line type="monotone" dataKey="avgScore" stroke="var(--color-avgScore)" strokeWidth={2} />
                      </RechartsPrimitive.LineChart>
                    </RechartsPrimitive.ResponsiveContainer>
                  )}
                </ChartContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="subjects">
          <div className="dashboard-card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="subject-select" className="mb-2 block">Select Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger id="subject-select">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="class-grade" className="mb-2 block">Grade Level</Label>
                <Select>
                  <SelectTrigger id="class-grade">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="text-lg font-semibold mb-4">Subject Performance Comparison</h3>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    score: { color: "hsl(var(--primary))" }
                  }}
                >
                  {() => (
                    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                      <RechartsPrimitive.BarChart data={subjectPerformanceData}>
                        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                        <RechartsPrimitive.XAxis dataKey="name" />
                        <RechartsPrimitive.YAxis />
                        <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
                        <RechartsPrimitive.Bar dataKey="score" fill="var(--color-score)" />
                      </RechartsPrimitive.BarChart>
                    </RechartsPrimitive.ResponsiveContainer>
                  )}
                </ChartContainer>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3 className="text-lg font-semibold mb-4">Concept Mastery</h3>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    score: { color: "hsl(var(--primary))" }
                  }}
                >
                  {() => (
                    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                      <RechartsPrimitive.RadarChart
                        data={[
                          { concept: "Algebra", score: 85 },
                          { concept: "Geometry", score: 72 },
                          { concept: "Calculus", score: 68 },
                          { concept: "Statistics", score: 78 },
                          { concept: "Trigonometry", score: 65 }
                        ]}
                      >
                        <RechartsPrimitive.PolarGrid />
                        <RechartsPrimitive.PolarAngleAxis dataKey="concept" />
                        <RechartsPrimitive.PolarRadiusAxis />
                        <RechartsPrimitive.Radar dataKey="score" stroke="var(--color-score)" fill="var(--color-score)" fillOpacity={0.6} />
                        <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
                      </RechartsPrimitive.RadarChart>
                    </RechartsPrimitive.ResponsiveContainer>
                  )}
                </ChartContainer>
              </div>
            </div>
            
            <div className="dashboard-card lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Topic Performance</h3>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    average: { color: "hsl(var(--primary))" },
                    highest: { color: "hsl(var(--accent))" }
                  }}
                >
                  {() => (
                    <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                      <RechartsPrimitive.BarChart
                        data={[
                          { topic: "Equations", average: 82, highest: 95 },
                          { topic: "Fractions", average: 75, highest: 92 },
                          { topic: "Functions", average: 68, highest: 88 },
                          { topic: "Graphing", average: 72, highest: 90 },
                          { topic: "Word Problems", average: 65, highest: 85 }
                        ]}
                      >
                        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                        <RechartsPrimitive.XAxis dataKey="topic" />
                        <RechartsPrimitive.YAxis />
                        <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
                        <RechartsPrimitive.Legend />
                        <RechartsPrimitive.Bar dataKey="average" fill="var(--color-average)" />
                        <RechartsPrimitive.Bar dataKey="highest" fill="var(--color-highest)" />
                      </RechartsPrimitive.BarChart>
                    </RechartsPrimitive.ResponsiveContainer>
                  )}
                </ChartContainer>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
