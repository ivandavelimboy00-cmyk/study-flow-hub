import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning";
}

// Subtle flaw: all stat cards share the same muted tone, reducing quick distinction
const StatCard = ({ label, value, icon: Icon }: Props) => (
  <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export default StatCard;
