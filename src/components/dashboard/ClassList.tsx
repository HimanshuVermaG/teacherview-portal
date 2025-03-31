
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClassCard from "@/components/dashboard/ClassCard";

type ClassListProps = {
  classes: Array<{
    id: string;
    name: string;
    subject: string;
    studentCount: number;
    activeContent: number;
    color: string;
  }>;
};

const ClassList = ({ classes }: ClassListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Classes</h2>
        <Button asChild>
          <Link to="/teacher/create-class">
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
  );
};

export default ClassList;
