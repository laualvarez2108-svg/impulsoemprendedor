import { MobileNav } from "./MobileNav";

export function AppShell({ children, hideNav = false }: { children: React.ReactNode; hideNav?: boolean }) {
  return (
    <div className={`relative mx-auto min-h-screen max-w-md bg-background ${hideNav ? "" : "pb-24"}`}>
      <div className="animate-fade-in">{children}</div>
      {!hideNav && <MobileNav />}
    </div>
  );
}
