import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning";
}

const tones = {
  primary: "bg-accent text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning/10 text-warning",
};

const StatCard = ({ label, value, icon: Icon, tone = "primary" }: Props) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      </div>
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg", tones[tone])}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export default StatCard;
