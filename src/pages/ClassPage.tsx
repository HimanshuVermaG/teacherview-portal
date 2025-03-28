
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BookOpen, Users, BarChart } from "lucide-react";
import ContentList from "@/components/content/ContentList";
import SubjectCard from "@/components/dashboard/SubjectCard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivity from "@/components/dashboard/RecentActivity";

// Mock data for subjects in each class
const classSubjects = {
  "class-6": [
    { id: "math", name: "Mathematics", avgScore: 78, studentCount: 32, passingRate: 92, topPerformer: "Alex J.", color: "blue" },
    { id: "science", name: "Science", avgScore: 82, studentCount: 28, passingRate: 94, topPerformer: "Jordan L.", color: "green" },
    { id: "english", name: "English", avgScore: 85, studentCount: 30, passingRate: 96, topPerformer: "Taylor S.", color: "purple" },
    { id: "history", name: "History", avgScore: 75, studentCount: 30, passingRate: 88, topPerformer: "Riley W.", color: "orange" },
  ],
  "class-7": [
    { id: "math", name: "Mathematics", avgScore: 76, studentCount: 28, passingRate: 90, topPerformer: "Madison K.", color: "blue" },
    { id: "science", name: "Science", avgScore: 79, studentCount: 25, passingRate: 92, topPerformer: "Casey R.", color: "green" },
    { id: "english", name: "English", avgScore: 82, studentCount: 27, passingRate: 94, topPerformer: "Morgan T.", color: "purple" },
    { id: "history", name: "History", avgScore: 73, studentCount: 28, passingRate: 89, topPerformer: "Quinn B.", color: "orange" },
  ],
  "class-8": [
    { id: "math", name: "Mathematics", avgScore: 80, studentCount: 30, passingRate: 93, topPerformer: "Tyler P.", color: "blue" },
    { id: "science", name: "Science", avgScore: 84, studentCount: 27, passingRate: 95, topPerformer: "Parker S.", color: "green" },
    { id: "english", name: "English", avgScore: 81, studentCount: 29, passingRate: 93, topPerformer: "Dakota J.", color: "purple" },
    { id: "history", name: "History", avgScore: 77, studentCount: 29, passingRate: 91, topPerformer: "Riley W.", color: "orange" },
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

// Class details
const classDetails = {
  "class-6": {
    name: "Class 6",
    subject: "All Subjects",
    description: "Sixth grade core curriculum including Mathematics, Science, English, and History",
    studentCount: 32,
    contentCount: 4,
    color: "blue"
  },
  "class-7": {
    name: "Class 7",
    subject: "All Subjects",
    description: "Seventh grade core curriculum including Mathematics, Science, English, and History",
    studentCount: 28,
    contentCount: 7,
    color: "green"
  },
  "class-8": {
    name: "Class 8",
    subject: "All Subjects",
    description: "Eighth grade core curriculum including Mathematics, Science, English, and History",
    studentCount: 30,
    contentCount: 3,
    color: "purple"
  },
};

// Recent activities
const recentClassActivities = [
  { 
    id: '1',
    icon: Users,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: '5 new submissions',
    content: 'in Algebra Quiz',
    time: '2 hours ago',
    actionText: 'View Details',
    actionLink: '/class/class-6/subject/math'
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
    actionLink: '/reports?class=class-7'
  },
  { 
    id: '3',
    icon: BookOpen,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'New content published',
    content: 'Practice Set',
    time: '3 days ago',
    actionText: 'View Content',
    actionLink: '/class/class-8/subject/science'
  },
];

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
            <Link to={`/reports?class=${classId}`}>
              <BarChart className="h-4 w-4 mr-1" />
              Class Report
            </Link>
          </Button>
          <Button asChild>
            <Link to={`/create?class=${classId}`}>
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
        <PerformanceChart
          title="Performance Trend"
          data={performanceTrendData}
          xAxisKey="month"
          lines={[
            { dataKey: "avgScore", name: "Average Score", colorKey: "avgScore" }
          ]}
          height={280}
        />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <ContentList 
            title="Class Content" 
            content={mockContent} 
            createLink={`/create?class=${classId}`} 
          />
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
        <RecentActivity activities={recentClassActivities} />
      </div>
    </div>
  );
};

export default ClassPage;
