
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BookOpen, Users, BarChart } from "lucide-react";
import ContentCard from "@/components/content/ContentCard";
import SubjectCard from "@/components/dashboard/SubjectCard";
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";

// Mock data for subjects in each class
const classSubjects = {
  "math-101": [
    { id: "math", name: "Mathematics", avgScore: 78, studentCount: 32, passingRate: 92, topPerformer: "Alex J.", color: "blue" },
    { id: "algebra", name: "Algebra", avgScore: 75, studentCount: 30, passingRate: 88, topPerformer: "Madison K.", color: "green" },
    { id: "geometry", name: "Geometry", avgScore: 82, studentCount: 28, passingRate: 93, topPerformer: "Tyler P.", color: "purple" },
  ],
  "science-101": [
    { id: "science", name: "Science", avgScore: 82, studentCount: 28, passingRate: 94, topPerformer: "Jordan L.", color: "green" },
    { id: "physics", name: "Physics", avgScore: 79, studentCount: 25, passingRate: 90, topPerformer: "Casey R.", color: "blue" },
    { id: "chemistry", name: "Chemistry", avgScore: 77, studentCount: 26, passingRate: 89, topPerformer: "Morgan T.", color: "orange" },
    { id: "biology", name: "Biology", avgScore: 84, studentCount: 27, passingRate: 95, topPerformer: "Parker S.", color: "purple" },
  ],
  "history-101": [
    { id: "history", name: "History", avgScore: 75, studentCount: 30, passingRate: 88, topPerformer: "Riley W.", color: "purple" },
    { id: "world-history", name: "World History", avgScore: 73, studentCount: 28, passingRate: 85, topPerformer: "Quinn B.", color: "red" },
    { id: "us-history", name: "US History", avgScore: 79, studentCount: 29, passingRate: 91, topPerformer: "Dakota J.", color: "blue" },
  ],
};

// Mock content data
const mockContent = [
  { id: "quiz-1", title: "Algebra Fundamentals", type: "quiz", status: "published", timeLimit: 30, questionCount: 10, submissions: 28, dueDate: "Apr 15, 2023" },
  { id: "practice-1", title: "Equations Practice Set", type: "practice", status: "published", questionCount: 20, submissions: 15 },
  { id: "test-1", title: "Mid-term Assessment", type: "test", status: "scheduled", timeLimit: 60, questionCount: 25, submissions: 0, dueDate: "May 5, 2023" },
  { id: "quiz-2", title: "Geometry Basics", type: "quiz", status: "draft", timeLimit: 25, questionCount: 8, submissions: 0 },
];

// Mock data for class performance over time
const performanceTrendData = [
  { month: "Jan", avgScore: 72 },
  { month: "Feb", avgScore: 74 },
  { month: "Mar", avgScore: 78 },
  { month: "Apr", avgScore: 80 },
  { month: "May", avgScore: 76 },
  { month: "Jun", avgScore: 82 },
];

const classDetails = {
  "math-101": {
    name: "Math 101",
    subject: "Mathematics",
    description: "Introduction to algebra, geometry, and trigonometry",
    studentCount: 32,
    contentCount: 4,
    color: "blue"
  },
  "science-101": {
    name: "Science 101",
    subject: "Science",
    description: "Basic concepts in physics, chemistry, and biology",
    studentCount: 28,
    contentCount: 7,
    color: "green"
  },
  "history-101": {
    name: "History 101",
    subject: "History",
    description: "Overview of world history from ancient civilizations to modern times",
    studentCount: 30,
    contentCount: 3,
    color: "purple"
  },
};

const ClassPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const classInfo = classDetails[classId as keyof typeof classDetails] || {
    name: "Unknown Class",
    subject: "Unknown",
    description: "No description available",
    studentCount: 0,
    contentCount: 0,
    color: "blue"
  };
  
  const subjects = classSubjects[classId as keyof typeof classSubjects] || [];
  
  const [activeTab, setActiveTab] = useState("subjects");
  
  // Performance trend chart
  const performanceTrendChart = (
    <RechartsPrimitive.ResponsiveContainer width="100%" height={300}>
      <RechartsPrimitive.LineChart
        data={performanceTrendData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        <RechartsPrimitive.XAxis dataKey="month" />
        <RechartsPrimitive.YAxis domain={[0, 100]} />
        <RechartsPrimitive.Tooltip 
          formatter={(value) => [`${value}%`, "Average Score"]}
        />
        <RechartsPrimitive.Line
          type="monotone"
          dataKey="avgScore"
          stroke="var(--color-avgScore)"
          activeDot={{ r: 8 }}
        />
      </RechartsPrimitive.LineChart>
    </RechartsPrimitive.ResponsiveContainer>
  );
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">{classInfo.name}</h1>
            <span className="ml-3 px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
              {classInfo.subject}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{classInfo.description}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/reports">
              <BarChart className="h-4 w-4 mr-1" />
              Class Report
            </Link>
          </Button>
          <Button asChild>
            <Link to="/create">
              <PlusCircle className="h-4 w-4 mr-1" />
              Create Content
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Content Items</p>
              <h3 className="text-xl font-bold">{classInfo.contentCount}</h3>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Students</p>
              <h3 className="text-xl font-bold">{classInfo.studentCount}</h3>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <BarChart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Performance</p>
              <h3 className="text-xl font-bold">78%</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Trend</h2>
          <div className="h-80">
            <ChartContainer
              config={{
                avgScore: { color: "hsl(var(--primary))" }
              }}
            >
              {performanceTrendChart}
            </ChartContainer>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="subjects" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="subjects" onClick={() => setActiveTab("subjects")}>
            Subjects
          </TabsTrigger>
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
        
        <TabsContent value="subjects" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Class Subjects</h2>
            <Button asChild>
              <Link to="/create-subject">
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Subject
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                id={subject.id}
                classId={classId || ""}
                name={subject.name}
                avgScore={subject.avgScore}
                studentCount={subject.studentCount}
                passingRate={subject.passingRate}
                topPerformer={subject.topPerformer}
                color={subject.color}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Class Content</h2>
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">Student Roster</h2>
            <p className="text-gray-600">View student data for this class.</p>
            <Button className="mt-4" asChild>
              <Link to={`/reports?class=${classId}`}>View Student Reports</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="grades">
          <div className="dashboard-card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Grade Book</h2>
            <p className="text-gray-600">View and manage grades for this class.</p>
            <Button className="mt-4" asChild>
              <Link to={`/grades?class=${classId}`}>Open Grade Book</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">5 new submissions</span> in <span className="text-teacher-primary">Algebra Quiz</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              <Button variant="link" size="sm" className="h-6 p-0 mt-1">View Details</Button>
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
              <Button variant="link" size="sm" className="h-6 p-0 mt-1">View Report</Button>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">New content published</span> - <span className="text-teacher-primary">Practice Set</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">3 days ago</p>
              <Button variant="link" size="sm" className="h-6 p-0 mt-1">View Content</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
