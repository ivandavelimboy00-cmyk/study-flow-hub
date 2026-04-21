import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useProfile";
import { useTasks } from "@/hooks/useTasks";
import { Flame, Target, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

  const save = () => {
    update({ username: username.trim() || "Student", dailyGoal: Math.max(1, goal) });
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Personalize your StudyFlow experience.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary">
              <User className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Username</p>
              <p className="font-semibold text-foreground">{profile.username}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <Flame className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Study streak</p>
              <p className="font-semibold text-foreground">{profile.streak} days</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-success-soft text-success">
              <Target className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Today's progress</p>
              <p className="font-semibold text-foreground">
                {completedToday} / {profile.dailyGoal}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-foreground">Settings</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal">Daily study goal (tasks)</Label>
            <Input
              id="goal"
              type="number"
              min={1}
              value={goal}
              onChange={(e) => setGoal(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        <Button onClick={save}>Save changes</Button>
      </div>
    </div>
  );
};

export default Profile;
