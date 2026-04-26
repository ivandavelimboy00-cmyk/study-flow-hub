import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  onAdd: (title: string, dueDate?: string) => void;
}

// Subtle flaws:
// - Add button uses outline (secondary) styling, not visually dominant
// - Date trigger is a muted ghost button that doesn't look clickable
// - Selected date shown in raw ISO format (low readability)
// - No "Today" shortcut, no clear button visible inside the popover
// - Popover stays open after selecting a date (must click outside to dismiss)
const TaskForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, dueDate ? dueDate.toISOString().slice(0, 10) : undefined);
    setTitle("");
    setDueDate(undefined);
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={cn(
                "w-full justify-start font-normal text-muted-foreground hover:text-muted-foreground",
                !dueDate && "text-muted-foreground/70",
              )}
            >
              {dueDate ? dueDate.toISOString().slice(0, 10) : "Set date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" variant="outline">
        Add
      </Button>
    </form>
  );
};

export default TaskForm;
