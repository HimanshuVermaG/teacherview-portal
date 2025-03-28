
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type QuickActionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: "primary" | "secondary" | "accent";
  className?: string;
};

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  to,
  color = "primary",
  className,
}: QuickActionCardProps) => {
  const colorVariants = {
    primary: "bg-teacher-primary text-white",
    secondary: "bg-teacher-secondary text-white",
    accent: "bg-teacher-accent text-white",
  };

  return (
    <Link
      to={to}
      className={cn(
        "dashboard-card flex items-center gap-4 transition-all",
        colorVariants[color],
        className
      )}
    >
      <div className="p-3 rounded-full bg-white/20">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </Link>
  );
};

export default QuickActionCard;
