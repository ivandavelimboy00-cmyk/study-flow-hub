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
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-md">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">StudyFlow</span>
          </NavLink>

          <nav className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap"
                activeClassName="!text-primary !bg-accent"
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

      <footer className="border-t border-border bg-card">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 py-4 text-sm text-muted-foreground">
          <p>StudyFlow © 2026</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Help</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
