
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BookOpen, Users, BarChart, Clock } from "lucide-react";
import ContentCard from "@/components/content/ContentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";

// Mock data for the subject page
const subjectDetails = {
  "math": {
    name: "Mathematics",
    description: "Introduction to algebra, geometry, and trigonometry",
    studentCount: 121,
    avgScore: 78,
    passingRate: 92,
    topPerformer: "Alex J."
  },
  "science": {
    name: "Science",
    description: "Basic concepts in physics, chemistry, and biology",
    studentCount: 98,
    avgScore: 82,
    passingRate: 94,
    topPerformer: "Jordan L."
  },
  "history": {
    name: "History",
    description: "Overview of world history from ancient civilizations to modern times",
    studentCount: 87,
    avgScore: 75,
    passingRate: 88,
    topPerformer: "Riley W."
  },
  "english": {
    name: "English",
    description: "Reading comprehension, grammar, and composition",
    studentCount: 105,
    avgScore: 85,
    passingRate: 96,
    topPerformer: "Taylor S."
  }
};

// Mock content data
const mockContent = [
  { id: "quiz-1", title: "Basic Concepts Quiz", type: "quiz", status: "published", timeLimit: 30, questionCount: 10, submissions: 28, dueDate: "Apr 15, 2023" },
  { id: "practice-1", title: "Practice Exercises Set 1", type: "practice", status: "published", questionCount: 20, submissions: 15 },
  { id: "test-1", title: "Mid-term Assessment", type: "test", status: "scheduled", timeLimit: 60, questionCount: 25, submissions: 0, dueDate: "May 5, 2023" },
  { id: "quiz-2", title: "Advanced Topics", type: "quiz", status: "draft", timeLimit: 25, questionCount: 8, submissions: 0 },
];

// Mock performance data
const performanceData = [
  {
    name: "Week 1",
    avgScore: 72,
    classAvg: 68,
  },
  {
    name: "Week 2",
    avgScore: 78,
    classAvg: 70,
  },
  {
    name: "Week 3",
    avgScore: 75,
    classAvg: 72,
  },
  {
    name: "Week 4",
    avgScore: 82,
    classAvg: 75,
  },
  {
    name: "Week 5",
    avgScore: 84,
    classAvg: 76,
  },
  {
    name: "Week 6",
    avgScore: 88,
    classAvg: 78,
  },
];

const SubjectPage = () => {
  const { classId, subjectId } = useParams<{ classId: string; subjectId: string }>();
  const subject = subjectDetails[subjectId as keyof typeof subjectDetails] || {
    name: "Unknown Subject",
    description: "No description available",
    studentCount: 0,
    avgScore: 0,
    passingRate: 0,
    topPerformer: "None"
  };
  
  const [activeTab, setActiveTab] = useState("content");
  
  // Performance chart 
  const performanceChart = (
    <RechartsPrimitive.ResponsiveContainer width="100%" height={300}>
      <RechartsPrimitive.LineChart
        data={performanceData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        <RechartsPrimitive.XAxis dataKey="name" />
        <RechartsPrimitive.YAxis />
        <RechartsPrimitive.Tooltip />
        <RechartsPrimitive.Legend />
        <RechartsPrimitive.Line
          type="monotone"
          dataKey="avgScore"
          name="Subject Average"
          stroke="var(--color-avgScore)"
          activeDot={{ r: 8 }}
        />
        <RechartsPrimitive.Line
          type="monotone"
          dataKey="classAvg"
          name="Class Average"
          stroke="var(--color-classAvg)"
        />
      </RechartsPrimitive.LineChart>
    </RechartsPrimitive.ResponsiveContainer>
  );
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/class/${classId}`} className="text-blue-600 hover:underline text-sm">
              &larr; Back to Class
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">{subject.name}</h1>
          </div>
          <p className="text-gray-600 mt-1">{subject.description}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to={`/reports?subject=${subjectId}`}>
              <BarChart className="h-4 w-4 mr-1" />
              Subject Report
            </Link>
          </Button>
          <Button asChild>
            <Link to={`/create?subject=${subjectId}`}>
              <PlusCircle className="h-4 w-4 mr-1" />
              Create Content
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{subject.studentCount}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{subject.avgScore}%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{subject.passingRate}%</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgScore: { color: "hsl(var(--primary))" },
                classAvg: { color: "hsl(var(--secondary))" }
              }}
            >
              {performanceChart}
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="content" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="content" onClick={() => setActiveTab("content")}>
            Content
          </TabsTrigger>
          <TabsTrigger value="students" onClick={() => setActiveTab("students")}>
            Students
          </TabsTrigger>
          <TabsTrigger value="grades" onClick={() => setActiveTab("grades")}>
            Grades
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Subject Content</h2>
            <Button asChild>
              <Link to="/create">
                <PlusCircle className="h-4 w-4 mr-1" />
                Create New
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockContent.map((item) => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                type={item.type as "quiz" | "practice" | "test"}
                status={item.status as "draft" | "published" | "scheduled"}
                timeLimit={item.timeLimit}
                questionCount={item.questionCount}
                submissions={item.submissions}
                dueDate={item.dueDate}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="students">
          <div className="dashboard-card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Student Roster for {subject.name}</h2>
            <p className="text-gray-600">View student performance for this subject.</p>
            <Button className="mt-4" asChild>
              <Link to={`/reports?subject=${subjectId}`}>View Student Reports</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="grades">
          <div className="dashboard-card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Grade Book for {subject.name}</h2>
            <p className="text-gray-600">View and manage grades for this subject.</p>
            <Button className="mt-4" asChild>
              <Link to={`/grades?subject=${subjectId}`}>Open Grade Book</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="dashboard-card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity for {subject.name}</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">5 new submissions</span> for <span className="text-teacher-primary">Basic Concepts Quiz</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <BarChart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">Class average increased</span> by <span className="text-green-600">2.5%</span> this week
              </p>
              <p className="text-xs text-gray-500 mt-1">Yesterday</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">New content published</span> - <span className="text-teacher-primary">Practice Exercises Set 1</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
