import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: { title?: string; dueDate?: string }) => void;
  variant?: "default" | "completed";
}

const formatDate = (iso?: string) => {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

// Subtle flaws:
// - Edit/Delete/Restore are small text links (not clear icon buttons)
// - Completed tasks differ only by a small checkmark + faint strike-through (low contrast)
// - Flat row style with minimal separation
const TaskItem = ({ task, onToggle, onDelete, onUpdate, variant = "default" }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate ?? "");

  const save = () => {
    if (!title.trim()) return;
    onUpdate(task.id, { title, dueDate: dueDate || undefined });
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
      />

      {editing ? (
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="sm:w-44"
          />
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm text-foreground truncate",
              task.completed && "line-through text-muted-foreground",
            )}
          >
            {task.title}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {variant === "completed" && task.completedAt
              ? `Completed ${formatDate(task.completedAt)}`
              : task.dueDate
                ? `Due ${formatDate(task.dueDate)}`
                : "No due date"}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 text-xs">
        {editing ? (
          <>
            <button onClick={save} className="text-muted-foreground hover:text-foreground">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="text-muted-foreground hover:text-foreground">
              Cancel
            </button>
          </>
        ) : (
          <>
            {variant === "completed" ? (
              <button
                onClick={() => onToggle(task.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                Restore
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(task.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
