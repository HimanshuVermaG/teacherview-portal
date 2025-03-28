
import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  PlusCircle, 
  BarChart, 
  Bell, 
  FileText, 
  MessageSquare, 
  ArrowRight,
  Check,
  AlertCircle,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Mock activity data
const allActivities = [
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
    actionLink: '/class/class-6/subject/math-101',
    category: 'submissions'
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
    actionLink: '/class/class-7/subject/science-101',
    category: 'content'
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
    actionLink: '/reports?class=class-8',
    category: 'reports'
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
    actionLink: '/pending-reviews',
    category: 'notifications'
  },
  { 
    id: '5',
    type: 'content',
    icon: FileText,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'New practice set published',
    content: 'Class 9 - English Grammar Exercises',
    time: '3 days ago',
    actionText: 'View practice set',
    actionLink: '/class/class-9/subject/english-101',
    category: 'content'
  },
  { 
    id: '6',
    type: 'submissions',
    icon: Check,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'All assignments graded',
    content: 'Class 10 - Mathematics Algebra Test',
    time: '4 days ago',
    actionText: 'View grades',
    actionLink: '/class/class-10/subject/math-101',
    category: 'submissions'
  },
  { 
    id: '7',
    type: 'notification',
    icon: AlertCircle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    title: 'Low completion rate',
    content: 'Class 8 - Science Lab Activity',
    time: '5 days ago',
    actionText: 'View details',
    actionLink: '/class/class-8/subject/science-101',
    category: 'notifications'
  },
  { 
    id: '8',
    type: 'calendar',
    icon: Calendar,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Parent-teacher meeting scheduled',
    content: 'For Class 6 students',
    time: '1 week ago',
    actionText: 'View calendar',
    actionLink: '/calendar',
    category: 'calendar'
  },
  { 
    id: '9',
    type: 'message',
    icon: MessageSquare,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    title: 'New message from principal',
    content: 'Regarding end-term assessments',
    time: '1 week ago',
    actionText: 'Read message',
    actionLink: '/messages',
    category: 'messages'
  },
  { 
    id: '10',
    type: 'report',
    icon: BarChart,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Monthly performance report',
    content: 'All classes overview',
    time: '2 weeks ago',
    actionText: 'View report',
    actionLink: '/reports',
    category: 'reports'
  },
];

const ActivityPage = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Activity Log</h1>
          <p className="text-gray-600 mt-1">Track all activities across your classes</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {allActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 group">
                    <div className={`w-10 h-10 mt-0.5 rounded-full ${activity.iconBg} flex items-center justify-center ${activity.iconColor} shrink-0`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div>
                        <h3 className="text-base font-medium">{activity.title}</h3>
                        <p className="text-sm text-teacher-primary">{activity.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" asChild>
                          <Link to={activity.actionLink}>
                            {activity.actionText}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {["submissions", "content", "notifications", "reports"].map((category) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{category}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {allActivities
                    .filter(activity => activity.category === category)
                    .map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 group">
                        <div className={`w-10 h-10 mt-0.5 rounded-full ${activity.iconBg} flex items-center justify-center ${activity.iconColor} shrink-0`}>
                          <activity.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <div>
                            <h3 className="text-base font-medium">{activity.title}</h3>
                            <p className="text-sm text-teacher-primary">{activity.content}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                          <div className="flex gap-3">
                            <Button size="sm" asChild>
                              <Link to={activity.actionLink}>
                                {activity.actionText}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ActivityPage;
