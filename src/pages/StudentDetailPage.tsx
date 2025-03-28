
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { ArrowLeft, Mail, Phone, Download } from "lucide-react";
import { Link } from "react-router-dom";
import * as RechartsPrimitive from "recharts";

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
    ],
    // Additional data for expanded analysis
    behavioralNotes: [
      { date: "2023-05-15", note: "Shows excellent leadership in group projects" },
      { date: "2023-04-10", note: "Actively participates in class discussions" },
      { date: "2023-03-22", note: "May need additional support with time management" }
    ],
    testScores: [
      { test: "Midterm Exam", score: 88, date: "2023-04-15" },
      { test: "Chapter 4 Quiz", score: 92, date: "2023-03-20" },
      { test: "Research Project", score: 85, date: "2023-03-05" },
      { test: "Pop Quiz", score: 79, date: "2023-02-18" }
    ],
    learningStyle: "Visual",
    parentContacts: [
      { date: "2023-05-10", type: "Email", notes: "Discussed progress in Science project" },
      { date: "2023-04-05", type: "Phone Call", notes: "Parent-teacher conference followup" }
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
    ],
    // Additional data for expanded analysis
    behavioralNotes: [
      { date: "2023-05-12", note: "Struggles with maintaining focus during longer sessions" },
      { date: "2023-04-08", note: "Works well in small group settings" },
      { date: "2023-03-15", note: "Shows improvement in organizational skills" }
    ],
    testScores: [
      { test: "Midterm Exam", score: 72, date: "2023-04-15" },
      { test: "Chapter 4 Quiz", score: 68, date: "2023-03-20" },
      { test: "Research Project", score: 77, date: "2023-03-05" },
      { test: "Pop Quiz", score: 65, date: "2023-02-18" }
    ],
    learningStyle: "Kinesthetic",
    parentContacts: [
      { date: "2023-05-05", type: "Meeting", notes: "Discussed strategies for improving math scores" },
      { date: "2023-03-20", type: "Email", notes: "Shared resources for additional practice" }
    ]
  }
};

// Render function for bar chart
const renderBarChart = (studentData: any) => (
  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
    <RechartsPrimitive.BarChart
      data={studentData.subjects}
      layout="vertical"
    >
      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
      <RechartsPrimitive.XAxis type="number" />
      <RechartsPrimitive.YAxis dataKey="name" type="category" />
      <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
      <RechartsPrimitive.Bar dataKey="score" fill="var(--color-score)" />
    </RechartsPrimitive.BarChart>
  </RechartsPrimitive.ResponsiveContainer>
);

// Render function for line chart
const renderLineChart = (studentData: any) => (
  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
    <RechartsPrimitive.LineChart
      data={studentData.trends}
    >
      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
      <RechartsPrimitive.XAxis dataKey="month" />
      <RechartsPrimitive.YAxis />
      <RechartsPrimitive.Tooltip formatter={(value) => `${value}%`} />
      <RechartsPrimitive.Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} />
    </RechartsPrimitive.LineChart>
  </RechartsPrimitive.ResponsiveContainer>
);

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
    trends: [],
    behavioralNotes: [],
    testScores: [],
    learningStyle: "N/A",
    parentContacts: []
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
            <div className="grid grid-cols-[100px_1fr]">
              <span className="text-gray-500">Learning:</span>
              <span className="font-medium">{student.learningStyle}</span>
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
            <ChartContainer 
              config={{
                score: { color: "hsl(var(--primary))" }
              }}
            >
              {() => renderBarChart(student)}
            </ChartContainer>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="performance" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="notes">Behavioral Notes</TabsTrigger>
          <TabsTrigger value="tests">Test History</TabsTrigger>
          <TabsTrigger value="parent">Parent Communication</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    score: { color: "hsl(var(--primary))" }
                  }}
                >
                  {() => renderLineChart(student)}
                </ChartContainer>
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
        
        <TabsContent value="notes">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Behavioral Notes</h3>
              <Button variant="outline" size="sm">Add Note</Button>
            </div>
            <div className="space-y-4">
              {student.behavioralNotes.map((note, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm text-gray-500 mb-1">{note.date}</p>
                  <p className="text-gray-800">{note.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="tests">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Test History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {student.testScores.map((test, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.test}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.score}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="parent">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Parent Communication</h3>
              <Button variant="outline" size="sm">Log Contact</Button>
            </div>
            <div className="space-y-4">
              {student.parentContacts.map((contact, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{contact.type}</h4>
                      <p className="text-sm text-gray-500">{contact.date}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{contact.notes}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetailPage;
