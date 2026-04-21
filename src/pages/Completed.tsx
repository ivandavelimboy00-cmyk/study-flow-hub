import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";
import { CheckCircle2 } from "lucide-react";

const Completed = () => {
  const { tasks, toggleTask, updateTask, deleteTask } = useTasks();
  const completed = tasks
    .filter((t) => t.completed)
    .sort((a, b) => (a.completedAt && b.completedAt ? (a.completedAt < b.completedAt ? 1 : -1) : 0));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Completed</h1>
        <p className="text-sm text-muted-foreground">
          {completed.length} {completed.length === 1 ? "task" : "tasks"} finished. Nice work!
        </p>
      </div>

      {completed.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-medium text-foreground">Nothing completed yet</p>
          <p className="text-sm text-muted-foreground">
            Finish a task and it will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {completed.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              variant="completed"
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Completed;
