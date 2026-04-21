import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface Props {
  onAdd: (title: string, dueDate?: string) => void;
}

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
      className="flex flex-col sm:flex-row gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="flex-1">
        <Label htmlFor="title" className="sr-only">Task title</Label>
        <Input
          id="title"
          placeholder="What do you need to study?"
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
      <Button type="submit" className="gap-2">
        <Plus className="h-4 w-4" /> Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
