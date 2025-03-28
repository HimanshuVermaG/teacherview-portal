
import { BookOpen, PlusCircle, BarChart, Users, Clock } from "lucide-react";
import ClassCard from "@/components/dashboard/ClassCard";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import SubjectPerformanceCard from "@/components/dashboard/SubjectPerformanceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for demonstration
const classes = [
  { id: "math-101", name: "Math 101", subject: "Mathematics", studentCount: 32, activeContent: 5, color: "blue" },
  { id: "science-101", name: "Science 101", subject: "Science", studentCount: 28, activeContent: 7, color: "green" },
  { id: "history-101", name: "History 101", subject: "History", studentCount: 30, activeContent: 3, color: "purple" },
  { id: "english-101", name: "English 101", subject: "English", studentCount: 31, activeContent: 6, color: "orange" },
];

// Mock data for subject performance
const subjectPerformanceData = [
  { name: "Mathematics", avgScore: 78, studentCount: 121, passingRate: 92, topPerformer: "Alex J." },
  { name: "Science", avgScore: 82, studentCount: 98, passingRate: 94, topPerformer: "Jordan L." },
  { name: "History", avgScore: 75, studentCount: 87, passingRate: 88, topPerformer: "Riley W." },
  { name: "English", avgScore: 85, studentCount: 105, passingRate: 96, topPerformer: "Taylor S." }
];

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Ms. Johnson</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Students" 
          value="121" 
          icon={Users} 
          description="Across all classes"
        />
        <StatCard 
          title="Active Content" 
          value="21" 
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

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Classes</h2>
          <Button asChild>
            <Link to="/create-class">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Class
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <Button variant="outline" asChild>
            <Link to="/activity">View All</Link>
          </Button>
        </div>
        <div className="dashboard-card">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">5 new submissions</span> in <span className="text-teacher-primary">Math 101 - Algebra Quiz</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">New quiz created</span> - <span className="text-teacher-primary">Science 101 - Forces and Motion</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <BarChart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Performance report</span> for <span className="text-teacher-primary">History 101</span> is ready
                </p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
