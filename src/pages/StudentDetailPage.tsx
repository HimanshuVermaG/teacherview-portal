
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart as Chart } from "@/components/ui/chart";
import { ArrowLeft, Mail, Phone, Download } from "lucide-react";
import { Link } from "react-router-dom";

// Mock student data
const studentsData = {
  "s1": {
    id: "s1",
    name: "Alex Johnson",
    rollNumber: "S001",
    email: "alex.j@example.com",
    phone: "+1 (555) 123-4567",
    performance: 85,
    avgScore: 87,
    lastActivity: "Today",
    classes: ["Math 101", "Science 101", "History 101"],
    attendance: 92,
    subjects: [
      { name: "Mathematics", score: 85 },
      { name: "Science", score: 90 },
      { name: "History", score: 78 },
      { name: "English", score: 88 }
    ],
    recentActivities: [
      { id: 1, activity: "Completed Algebra Quiz", date: "Today", score: 90 },
      { id: 2, activity: "Submitted Science Report", date: "Yesterday", score: 85 },
      { id: 3, activity: "Started History Practice Set", date: "3 days ago", score: null }
    ],
    trends: [
      { month: "Jan", score: 75 },
      { month: "Feb", score: 78 },
      { month: "Mar", score: 80 },
      { month: "Apr", score: 83 },
      { month: "May", score: 85 },
      { month: "Jun", score: 87 }
    ]
  },
  "s2": {
    id: "s2",
    name: "Taylor Smith",
    rollNumber: "S002",
    email: "t.smith@example.com",
    phone: "+1 (555) 234-5678",
    performance: 72,
    avgScore: 74,
    lastActivity: "Yesterday",
    classes: ["Math 101", "Science 101"],
    attendance: 85,
    subjects: [
      { name: "Mathematics", score: 70 },
      { name: "Science", score: 75 },
      { name: "History", score: 68 },
      { name: "English", score: 78 }
    ],
    recentActivities: [
      { id: 1, activity: "Completed Science Quiz", date: "Yesterday", score: 75 },
      { id: 2, activity: "Submitted Math Homework", date: "3 days ago", score: 70 },
      { id: 3, activity: "Started English Essay", date: "1 week ago", score: null }
    ],
    trends: [
      { month: "Jan", score: 65 },
      { month: "Feb", score: 68 },
      { month: "Mar", score: 70 },
      { month: "Apr", score: 72 },
      { month: "May", score: 74 },
      { month: "Jun", score: 72 }
    ]
  }
};

const StudentDetailPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const student = studentsData[studentId as keyof typeof studentsData] || {
    id: "unknown",
    name: "Unknown Student",
    rollNumber: "N/A",
    email: "N/A",
    phone: "N/A",
    performance: 0,
    avgScore: 0,
    lastActivity: "N/A",
    classes: [],
    attendance: 0,
    subjects: [],
    recentActivities: [],
    trends: []
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <Link to="/reports" className="flex items-center text-gray-500 hover:text-teacher-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Reports
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
            <p className="text-gray-600">Student ID: {student.rollNumber}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`mailto:${student.email}`}>
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Link>
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Student Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-[100px_1fr]">
              <span className="text-gray-500">Roll Number:</span>
              <span className="font-medium">{student.rollNumber}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr]">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium">{student.email}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr]">
              <span className="text-gray-500">Phone:</span>
              <span className="font-medium">{student.phone}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr]">
              <span className="text-gray-500">Classes:</span>
              <span className="font-medium">{student.classes.join(", ")}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr]">
              <span className="text-gray-500">Attendance:</span>
              <span className="font-medium">{student.attendance}%</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Overall Performance</h3>
          <div className="flex justify-center mb-4">
            <div className="h-32 w-32 rounded-full border-8 border-teacher-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-teacher-primary">{student.performance}%</div>
                <div className="text-xs text-gray-500">Overall</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl font-semibold">{student.avgScore}/100</div>
              <div className="text-xs text-gray-500">Average Score</div>
            </div>
            <div>
              <div className="text-xl font-semibold">{student.attendance}%</div>
              <div className="text-xs text-gray-500">Attendance</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
          <div className="h-48">
            <Chart 
              type="bar"
              data={student.subjects}
              dataKey="score"
              categories={["score"]}
              index="name"
              colors={["hsl(var(--primary))"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={false}
              layout="vertical"
            />
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="performance" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
              <div className="h-64">
                <Chart 
                  type="line"
                  data={student.trends}
                  dataKey="score"
                  categories={["score"]}
                  index="month"
                  colors={["hsl(var(--primary))"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={false}
                />
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Strengths</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Problem Solving</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Critical Thinking</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Research Skills</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Areas for Improvement</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Time Management</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Group Work</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Exam Preparation</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activities">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {student.recentActivities.map((activity) => (
                <div key={activity.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{activity.activity}</h4>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                    {activity.score !== null && (
                      <div className="text-lg font-semibold">
                        {activity.score}/100
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-medium text-teacher-primary">Additional Practice</h4>
                <p className="mt-1">Based on performance in recent assessments, recommend additional practice in the following areas:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  <li>Algebra equations and inequalities</li>
                  <li>Scientific notation and significant figures</li>
                  <li>Historical analysis and primary source evaluation</li>
                </ul>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-medium text-teacher-primary">Study Techniques</h4>
                <p className="mt-1">To improve exam preparation and time management:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  <li>Introduce spaced repetition technique for better retention</li>
                  <li>Implement the Pomodoro technique for focused study sessions</li>
                  <li>Create structured study plans with clear milestones</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-teacher-primary">Enrichment Opportunities</h4>
                <p className="mt-1">Consider the following to further develop strengths:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  <li>Science club participation to enhance research skills</li>
                  <li>Peer tutoring program to strengthen understanding</li>
                  <li>Competitive math challenges for advanced problem solving</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetailPage;
