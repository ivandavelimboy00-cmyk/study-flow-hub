import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  onAdd: (title: string, dueDate?: string) => void;
}

// Subtle flaw: Add button uses outline (secondary) styling, not visually dominant
const TaskForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, dueDate || undefined);
    setTitle("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col sm:flex-row gap-3 rounded-lg border border-border bg-card p-4"
    >
      <div className="flex-1">
        <Label htmlFor="title" className="sr-only">New Task</Label>
        <Input
          id="title"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="sm:w-44">
        <Label htmlFor="due" className="sr-only">Due date</Label>
        <Input
          id="due"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <Button type="submit" variant="outline">
        Add
      </Button>
    </form>
  );
};

export default TaskForm;
