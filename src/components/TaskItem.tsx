import { useState } from "react";
import { Check, Pencil, Trash2, Undo2, X, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

const TaskItem = ({ task, onToggle, onDelete, onUpdate, variant = "default" }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate ?? "");

  const save = () => {
    if (!title.trim()) return;
    onUpdate(task.id, { title, dueDate: dueDate || undefined });
    setEditing(false);
  };

  const overdue =
    !task.completed &&
    task.dueDate &&
    new Date(task.dueDate).setHours(23, 59, 59) < Date.now();

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md",
        task.completed && "bg-success-soft/40 border-success/20",
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5"
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
              "font-medium text-foreground truncate",
              task.completed && "line-through text-muted-foreground",
            )}
          >
            {task.title}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            {variant === "completed" && task.completedAt ? (
              <span className="inline-flex items-center gap-1 text-success">
                <Check className="h-3 w-3" /> Completed {formatDate(task.completedAt)}
              </span>
            ) : task.dueDate ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  overdue && "text-destructive font-medium",
                )}
              >
                <CalendarDays className="h-3 w-3" /> Due {formatDate(task.dueDate)}
                {overdue && " · Overdue"}
              </span>
            ) : (
              <span>No due date</span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-1">
        {editing ? (
          <>
            <Button size="icon" variant="ghost" onClick={save} aria-label="Save">
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setEditing(false)} aria-label="Cancel">
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            {variant === "completed" ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onToggle(task.id)}
                className="gap-1 text-primary hover:text-primary"
              >
                <Undo2 className="h-4 w-4" /> Restore
              </Button>
            ) : (
              <Button size="icon" variant="ghost" onClick={() => setEditing(true)} aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              aria-label="Delete"
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
