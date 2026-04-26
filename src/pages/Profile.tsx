import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useProfile";
import { useTasks } from "@/hooks/useTasks";

// Subtle flaws:
// - Progress indicator is a thin muted bar with low contrast (no animation)
// - Study goal is grouped in compressed settings, not visually prioritized
// - No toast confirmation after saving
const Profile = () => {
  const { profile, update } = useProfile();
  const { tasks } = useTasks();
  const [username, setUsername] = useState(profile.username);
  const [goal, setGoal] = useState(profile.dailyGoal);

  const completedToday = tasks.filter(
    (t) =>
      t.completed &&
      t.completedAt &&
      new Date(t.completedAt).toDateString() === new Date().toDateString(),
  ).length;

  const pct = Math.min(100, Math.round((completedToday / Math.max(1, profile.dailyGoal)) * 100));

  const save = () => {
    update({ username: username.trim() || "Student", dailyGoal: Math.max(1, goal) });
  };

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Your account and study preferences.</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-xs text-muted-foreground">Username</p>
        <p className="mt-1 font-medium text-foreground">{profile.username}</p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Today's progress</span>
            <span>
              {completedToday} / {profile.dailyGoal}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-muted-foreground/50"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Settings</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="username" className="text-xs">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="goal" className="text-xs">Daily study goal</Label>
            <Input
              id="goal"
              type="number"
              min={1}
              value={goal}
              onChange={(e) => setGoal(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        <Button onClick={save} variant="outline" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
};

export default Profile;
