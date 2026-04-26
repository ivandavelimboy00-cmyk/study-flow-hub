import { Link } from "react-router-dom";
import { CheckCircle2, Clock, ListTodo, Plus, CalendarDays } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";
import { useProfile } from "@/hooks/useProfile";

const Index = () => {
  const { tasks } = useTasks();
  const { profile } = useProfile();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const upcoming = tasks
    .filter((t) => !t.completed && t.dueDate)
    .sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : 1))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Subtle flaw: plain welcome header, no strong CTA emphasis */}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back, {profile.username}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You have {pending} pending {pending === 1 ? "task" : "tasks"} today.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Tasks" value={total} icon={ListTodo} />
        <StatCard label="Completed" value={completed} icon={CheckCircle2} />
        <StatCard label="Pending" value={pending} icon={Clock} />
      </section>

      {/* Subtle flaw: Add Task button is outline-styled, not visually dominant as primary action */}
      <div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link to="/tasks">
            <Plus className="h-4 w-4" /> Add Task
          </Link>
        </Button>
      </div>

      {/* Subtle flaw: upcoming tasks placed lower, no strong visual priority */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Upcoming tasks
            </h2>
          </div>
          <Link to="/tasks" className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <CalendarDays className="mx-auto h-7 w-7 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No upcoming tasks.</p>
          </div>
        ) : (
          <ul className="rounded-lg border border-border bg-card divide-y divide-border">
            {upcoming.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="text-sm text-foreground">{t.title}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(t.dueDate!).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Index;
