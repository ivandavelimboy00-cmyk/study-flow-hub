import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";

// Subtle flaw: no toast/confirmation when restoring; restore is a small text link in TaskItem.
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
          {completed.length} {completed.length === 1 ? "task" : "tasks"} completed.
        </p>
      </div>

      {completed.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">No completed tasks yet.</p>
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
