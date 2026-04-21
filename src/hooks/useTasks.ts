import { useCallback, useEffect, useState } from "react";
import type { Task } from "@/types/task";

const KEY = "studyflow.tasks";

const seed: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Math Assignment – Chapter 5",
    dueDate: new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10),
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Science Project Outline",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "History Essay Draft",
    dueDate: new Date(Date.now() - 1 * 86400000).toISOString().slice(0, 10),
    completed: true,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

function load(): Task[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed;
    return JSON.parse(raw) as Task[];
  } catch {
    return seed;
  }
}

// Simple cross-component sync
const listeners = new Set<() => void>();

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(load);

  useEffect(() => {
    const update = () => setTasks(load());
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  const persist = useCallback((next: Task[]) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setTasks(next);
    listeners.forEach((l) => l());
  }, []);

  const addTask = useCallback(
    (title: string, dueDate?: string) => {
      const t: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      persist([t, ...load()]);
    },
    [persist],
  );

  const toggleTask = useCallback(
    (id: string) => {
      const next = load().map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined,
            }
          : t,
      );
      persist(next);
    },
    [persist],
  );

  const updateTask = useCallback(
    (id: string, patch: Partial<Pick<Task, "title" | "dueDate">>) => {
      const next = load().map((t) => (t.id === id ? { ...t, ...patch } : t));
      persist(next);
    },
    [persist],
  );

  const deleteTask = useCallback(
    (id: string) => {
      persist(load().filter((t) => t.id !== id));
    },
    [persist],
  );

  return { tasks, addTask, toggleTask, updateTask, deleteTask };
}
