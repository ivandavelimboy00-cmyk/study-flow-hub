export interface Task {
  id: string;
  title: string;
  dueDate?: string; // ISO date
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}
