import { useCallback, useEffect, useState } from "react";

const KEY = "studyflow.profile";

export interface Profile {
  username: string;
  dailyGoal: number;
  streak: number;
}

const defaults: Profile = { username: "Student", dailyGoal: 5, streak: 7 };

function load(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

const listeners = new Set<() => void>();

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(load);

  useEffect(() => {
    const u = () => setProfile(load());
    listeners.add(u);
    return () => {
      listeners.delete(u);
    };
  }, []);

  const update = useCallback((patch: Partial<Profile>) => {
    const next = { ...load(), ...patch };
    localStorage.setItem(KEY, JSON.stringify(next));
    setProfile(next);
    listeners.forEach((l) => l());
  }, []);

  return { profile, update };
}
