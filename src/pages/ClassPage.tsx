
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BookOpen, Users, BarChart } from "lucide-react";
import ContentCard from "@/components/content/ContentCard";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockContent = [
  { id: "quiz-1", title: "Algebra Fundamentals", type: "quiz", status: "published", timeLimit: 30, questionCount: 10, submissions: 28, dueDate: "Apr 15, 2023" },
  { id: "practice-1", title: "Equations Practice Set", type: "practice", status: "published", questionCount: 20, submissions: 15 },
  { id: "test-1", title: "Mid-term Assessment", type: "test", status: "scheduled", timeLimit: 60, questionCount: 25, submissions: 0, dueDate: "May 5, 2023" },
  { id: "quiz-2", title: "Geometry Basics", type: "quiz", status: "draft", timeLimit: 25, questionCount: 8, submissions: 0 },
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
  
  const [activeTab, setActiveTab] = useState("content");
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
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
    </div>
  );
};

export default ClassPage;
