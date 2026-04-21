import { useMemo, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";

type Filter = "all" | "pending" | "completed";

const Tasks = () => {
  const { tasks, addTask, toggleTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: tasks.length },
    { key: "pending", label: "Pending", count: tasks.filter((t) => !t.completed).length },
    { key: "completed", label: "Completed", count: tasks.filter((t) => t.completed).length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        <p className="text-sm text-muted-foreground">Add, edit and complete your study tasks.</p>
      </div>

      <TaskForm onAdd={addTask} />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.key}
            size="sm"
            variant={filter === f.key ? "default" : "outline"}
            onClick={() => setFilter(f.key)}
            className={cn("rounded-full")}
          >
            {f.label}
            <span className="ml-2 rounded-full bg-background/20 px-2 text-xs">{f.count}</span>
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <ListTodo className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-medium text-foreground">No tasks here</p>
          <p className="text-sm text-muted-foreground">Add your first task above to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map((t) => (
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
