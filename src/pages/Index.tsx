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
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-primary p-8 text-primary-foreground shadow-lg">
        <p className="text-sm/none opacity-80">Welcome back,</p>
        <h1 className="mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">
          {profile.username} 👋
        </h1>
        <p className="mt-2 max-w-xl text-primary-foreground/80">
          You have {pending} pending {pending === 1 ? "task" : "tasks"}. Keep the momentum going—
          your goal is {profile.dailyGoal} tasks per day.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6 gap-2">
          <Link to="/tasks">
            <Plus className="h-4 w-4" /> Add New Task
          </Link>
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Tasks" value={total} icon={ListTodo} tone="primary" />
        <StatCard label="Completed" value={completed} icon={CheckCircle2} tone="success" />
        <StatCard label="Pending" value={pending} icon={Clock} tone="warning" />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Upcoming deadlines</h2>
            <p className="text-sm text-muted-foreground">Your next few tasks at a glance.</p>
          </div>
          <Link to="/tasks" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No upcoming tasks. Time to plan!</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <span className="font-medium text-foreground">{t.title}</span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
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
