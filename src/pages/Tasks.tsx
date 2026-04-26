import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";

// Subtle flaw: pending and completed tasks are mixed in one flat list,
// distinguished only by a small checkbox state — slows scanning.
const Tasks = () => {
  const { tasks, addTask, toggleTask, updateTask, deleteTask } = useTasks();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        <p className="text-sm text-muted-foreground">Manage your study tasks.</p>
      </div>

      <TaskForm onAdd={addTask} />

      {tasks.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">No tasks yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
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

export default Tasks;
