
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type ActivityItemProps = {
  id: string;
  type: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  content?: string;
  time: string;
  actionText: string;
  actionLink: string;
};

const RecentActivity = ({ activities }: { activities: ActivityItemProps[] }) => {
  return (
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
            {activities.map((activity) => (
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
  );
};

export default RecentActivity;
