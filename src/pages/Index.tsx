
import { BookOpen, PlusCircle, BarChart, Users, Clock, Bell } from "lucide-react";
import ClassList from "@/components/dashboard/ClassList";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import SubjectPerformanceCard from "@/components/dashboard/SubjectPerformanceCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for 6th to 8th classes only
const classes = [
  { id: "class-6", name: "Class 6", subject: "All Subjects", studentCount: 32, activeContent: 5, color: "blue" },
  { id: "class-7", name: "Class 7", subject: "All Subjects", studentCount: 28, activeContent: 7, color: "green" },
  { id: "class-8", name: "Class 8", subject: "All Subjects", studentCount: 30, activeContent: 3, color: "purple" },
];

// Mock data for subject performance
const subjectPerformanceData = [
  { name: "Mathematics", avgScore: 78, studentCount: 121, passingRate: 92, topPerformer: "Alex J." },
  { name: "Science", avgScore: 82, studentCount: 98, passingRate: 94, topPerformer: "Jordan L." },
  { name: "History", avgScore: 75, studentCount: 87, passingRate: 88, topPerformer: "Riley W." },
  { name: "English", avgScore: 85, studentCount: 105, passingRate: 96, topPerformer: "Taylor S." }
];

// Mock data for recent activity with links
const recentActivities = [
  { 
    id: '1',
    type: 'submissions',
    icon: Users,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: '5 new submissions',
    content: 'in Class 6 - Mathematics Quiz',
    time: '2 hours ago',
    actionText: 'Review submissions',
    actionLink: '/class/class-6/subject/math'
  },
  { 
    id: '2',
    type: 'content',
    icon: PlusCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'New quiz created',
    content: 'Class 7 - Science Forces and Motion',
    time: 'Yesterday',
    actionText: 'View quiz',
    actionLink: '/class/class-7/subject/science'
  },
  { 
    id: '3',
    type: 'report',
    icon: BarChart,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Performance report ready',
    content: 'for Class 8 History',
    time: '2 days ago',
    actionText: 'View report',
    actionLink: '/reports?class=class-8'
  },
  { 
    id: '4',
    type: 'notification',
    icon: Bell,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Grading reminder',
    content: '8 assignments pending review',
    time: '3 days ago',
    actionText: 'View pending',
    actionLink: '/activity'
  },
];

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Ms. Johnson</p>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/manage-students">
              <Users className="h-4 w-4 mr-1" />
              Manage Students
            </Link>
          </Button>
          <Button asChild>
            <Link to="/create-class">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Class
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Students" 
          value="90" 
          icon={Users} 
          description="Across all classes"
        />
        <StatCard 
          title="Active Content" 
          value="15" 
          icon={BookOpen} 
          description="Quizzes, tests, practice sets"
        />
        <StatCard 
          title="Pending Reviews" 
          value="38" 
          icon={Clock} 
          description="Submissions to grade"
          trend="up"
          trendValue="+12 since yesterday"
        />
        <StatCard 
          title="Avg. Performance" 
          value="76%" 
          icon={BarChart} 
          description="Across all classes"
          trend="up"
          trendValue="+2.1% this week"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <QuickActionCard
          title="Create Quiz"
          description="Create a new quiz or test"
          icon={PlusCircle}
          to="/create"
          color="primary"
        />
        <QuickActionCard
          title="Student Reports"
          description="View detailed analytics"
          icon={BarChart}
          to="/reports"
          color="secondary"
        />
        <QuickActionCard
          title="Manage Students"
          description="Add or update student records"
          icon={Users}
          to="/manage-students"
          color="accent"
        />
      </div>

      <div className="mb-8">
        <SubjectPerformanceCard 
          data={subjectPerformanceData}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ClassList classes={classes} />
        </div>

        <div>
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
