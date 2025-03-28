
import { BookOpen, PlusCircle, BarChart, Users, Clock, ArrowRight, Bell } from "lucide-react";
import ClassCard from "@/components/dashboard/ClassCard";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import SubjectPerformanceCard from "@/components/dashboard/SubjectPerformanceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demonstration - Updated for 6th to 10th classes
const classes = [
  { id: "class-6", name: "Class 6", subject: "All Subjects", studentCount: 32, activeContent: 5, color: "blue" },
  { id: "class-7", name: "Class 7", subject: "All Subjects", studentCount: 28, activeContent: 7, color: "green" },
  { id: "class-8", name: "Class 8", subject: "All Subjects", studentCount: 30, activeContent: 3, color: "purple" },
  { id: "class-9", name: "Class 9", subject: "All Subjects", studentCount: 31, activeContent: 6, color: "orange" },
  { id: "class-10", name: "Class 10", subject: "All Subjects", studentCount: 35, activeContent: 8, color: "red" },
];

// Mock data for subject performance
const subjectPerformanceData = [
  { name: "Mathematics", avgScore: 78, studentCount: 121, passingRate: 92, topPerformer: "Alex J." },
  { name: "Science", avgScore: 82, studentCount: 98, passingRate: 94, topPerformer: "Jordan L." },
  { name: "History", avgScore: 75, studentCount: 87, passingRate: 88, topPerformer: "Riley W." },
  { name: "English", avgScore: 85, studentCount: 105, passingRate: 96, topPerformer: "Taylor S." }
];

// Mock data for recent activity - Updated with links to relevant pages
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
    actionLink: '/class/class-6/subject/math-101'
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
    actionLink: '/class/class-7/subject/science-101'
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
          value="156" 
          icon={Users} 
          description="Across all classes"
        />
        <StatCard 
          title="Active Content" 
          value="29" 
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Your Classes</h2>
            <Button asChild>
              <Link to="/create-class">
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Class
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <ClassCard
                key={classItem.id}
                id={classItem.id}
                name={classItem.name}
                subject={classItem.subject}
                studentCount={classItem.studentCount}
                activeContent={classItem.activeContent}
                color={classItem.color}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/activity">
                View All
              </Link>
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-5">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 group">
                    <div className={`w-9 h-9 mt-0.5 rounded-full ${activity.iconBg} flex items-center justify-center ${activity.iconColor} shrink-0`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.title}</span> {activity.content && <span className="text-teacher-primary">{activity.content}</span>}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <div className="flex gap-2">
                        <Link to={activity.actionLink} className="inline-flex items-center text-xs font-medium text-teacher-primary hover:underline">
                          {activity.actionText}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
