import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, Home, Plus, Flame, AtSign, Calendar } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Hub", icon: Home },
  { to: "/virales", label: "Virales", icon: Flame },
  { to: "/create", label: "Crear", icon: Plus, primary: true },
  { to: "/mentor", label: "Mentor", icon: AtSign },
  { to: "/calendario", label: "Plan", icon: Calendar },
];

export function MobileNav() {
  const { location } = useRouterState();
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4 pb-4">
      <div className="relative rounded-3xl border border-border bg-card/85 px-2 py-2 shadow-elegant backdrop-blur-2xl">
        <ul className="grid grid-cols-5 items-center">
          {items.map(({ to, label, icon: Icon, primary }) => {
            const active = location.pathname === to;
            if (primary) {
              return (
                <li key={to} className="flex justify-center">
                  <Link
                    to={to}
                    className="group relative -mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold shadow-gold shadow-inner-gold transition-spring hover:scale-110 active:scale-95"
                  >
                    <span className="absolute inset-0 rounded-2xl animate-pulse-glow" />
                    <Icon className="relative h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
                  </Link>
                </li>
              );
            }
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition-smooth ${
                    active ? "text-gold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.6} />
                  <span>{label}</span>
                  {active && <span className="absolute h-1 w-1 -translate-y-0.5 translate-y-9 rounded-full bg-gold" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Sparkles className="sr-only" />
    </nav>
  );
}
