
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentCard from "@/components/content/ContentCard";

export type ContentItemType = {
  id: string;
  title: string;
  type: "quiz" | "practice" | "test";
  status: "draft" | "published" | "scheduled";
  timeLimit?: number;
  questionCount: number;
  submissions: number;
  dueDate?: string;
};

type ContentListProps = {
  title?: string;
  content: ContentItemType[];
  createLink?: string;
};

const ContentList = ({ title = "Content", content, createLink = "/teacher/create" }: ContentListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <Button asChild>
          <Link to={createLink}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Create New
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {content.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            status={item.status}
            timeLimit={item.timeLimit}
            questionCount={item.questionCount}
            submissions={item.submissions}
            dueDate={item.dueDate}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentList;
