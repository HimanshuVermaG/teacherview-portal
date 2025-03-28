
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BookOpen, Users, BarChart, Clock } from "lucide-react";
import ContentList from "@/components/content/ContentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivity from "@/components/dashboard/RecentActivity";

// Mock data for the subject page
const subjectDetails = {
  "math": {
    name: "Mathematics",
    description: "Introduction to algebra, geometry, and trigonometry",
    studentCount: 32,
    avgScore: 78,
    passingRate: 92,
    topPerformer: "Alex J."
  },
  "science": {
    name: "Science",
    description: "Basic concepts in physics, chemistry, and biology",
    studentCount: 28,
    avgScore: 82,
    passingRate: 94,
    topPerformer: "Jordan L."
  },
  "history": {
    name: "History",
    description: "Overview of world history from ancient civilizations to modern times",
    studentCount: 30,
    avgScore: 75,
    passingRate: 88,
    topPerformer: "Riley W."
  },
  "english": {
    name: "English",
    description: "Reading comprehension, grammar, and composition",
    studentCount: 30,
    avgScore: 85,
    passingRate: 96,
    topPerformer: "Taylor S."
  }
};

// Mock content data by subject
const mockContentBySubject = {
  "math": [
    { id: "quiz-1", title: "Algebra Fundamentals", type: "quiz", status: "published", timeLimit: 30, questionCount: 10, submissions: 28, dueDate: "Apr 15, 2023" },
    { id: "practice-1", title: "Equations Practice Set", type: "practice", status: "published", questionCount: 20, submissions: 15 },
    { id: "test-1", title: "Mid-term Assessment", type: "test", status: "scheduled", timeLimit: 60, questionCount: 25, submissions: 0, dueDate: "May 5, 2023" },
    { id: "quiz-2", title: "Geometry Basics", type: "quiz", status: "draft", timeLimit: 25, questionCount: 8, submissions: 0 },
  ],
  "science": [
    { id: "quiz-1", title: "Forces and Motion", type: "quiz", status: "published", timeLimit: 25, questionCount: 8, submissions: 22, dueDate: "Apr 10, 2023" },
    { id: "practice-1", title: "Chemistry Practice", type: "practice", status: "published", questionCount: 15, submissions: 18 },
    { id: "test-1", title: "Science Assessment", type: "test", status: "scheduled", timeLimit: 45, questionCount: 20, submissions: 0, dueDate: "May 10, 2023" },
  ],
  "english": [
    { id: "quiz-1", title: "Grammar Basics", type: "quiz", status: "published", timeLimit: 20, questionCount: 10, submissions: 25, dueDate: "Apr 18, 2023" },
    { id: "practice-1", title: "Reading Comprehension", type: "practice", status: "published", questionCount: 12, submissions: 20 },
    { id: "test-1", title: "Literature Review", type: "test", status: "published", timeLimit: 40, questionCount: 15, submissions: 23, dueDate: "Apr 5, 2023" },
  ],
  "history": [
    { id: "quiz-1", title: "Ancient Civilizations", type: "quiz", status: "published", timeLimit: 30, questionCount: 12, submissions: 27, dueDate: "Apr 8, 2023" },
    { id: "practice-1", title: "Historical Analysis", type: "practice", status: "published", questionCount: 10, submissions: 19 },
    { id: "test-1", title: "World History Exam", type: "test", status: "scheduled", timeLimit: 50, questionCount: 22, submissions: 0, dueDate: "May 15, 2023" },
  ]
};

// Mock performance data
const performanceData = [
  { name: "Week 1", avgScore: 72, classAvg: 68 },
  { name: "Week 2", avgScore: 78, classAvg: 70 },
  { name: "Week 3", avgScore: 75, classAvg: 72 },
  { name: "Week 4", avgScore: 82, classAvg: 75 },
  { name: "Week 5", avgScore: 84, classAvg: 76 },
  { name: "Week 6", avgScore: 88, classAvg: 78 },
];

// Recent activities
const recentSubjectActivities = [
  { 
    id: '1',
    icon: Users,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: '5 new submissions',
    content: 'Basic Concepts Quiz',
    time: '2 hours ago',
    actionText: 'Review submissions',
    actionLink: '/submissions/quiz-1'
  },
  { 
    id: '2',
    icon: BarChart,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Class average increased',
    content: 'by 2.5% this week',
    time: 'Yesterday',
    actionText: 'View Report',
    actionLink: '/reports?subject=math'
  },
  { 
    id: '3',
    icon: BookOpen,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'New content published',
    content: 'Practice Exercises Set 1',
    time: '3 days ago',
    actionText: 'View Content',
    actionLink: '/content/practice-1'
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
  
  const contentItems = mockContentBySubject[subjectId as keyof typeof mockContentBySubject] || [];
  
  const [activeTab, setActiveTab] = useState("content");
  
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
        <PerformanceChart
          title="Performance Trend"
          data={performanceData}
          xAxisKey="name"
          lines={[
            { dataKey: "avgScore", name: "Subject Average", colorKey: "avgScore" },
            { dataKey: "classAvg", name: "Class Average", colorKey: "classAvg" }
          ]}
          height={280}
        />
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
          <ContentList 
            title="Subject Content" 
            content={contentItems} 
            createLink={`/create?subject=${subjectId}`} 
          />
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
        <RecentActivity activities={recentSubjectActivities} />
      </div>
    </div>
  );
};

export default SubjectPage;
