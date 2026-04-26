import { GraduationCap } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/tasks", label: "Tasks" },
  { to: "/completed", label: "Completed" },
  { to: "/profile", label: "Profile" },
];

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-primary">
              <GraduationCap className="h-4 w-4" />
            </span>
            <span className="text-base tracking-tight">StudyFlow</span>
          </NavLink>

          <nav className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                activeClassName="!text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
