import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Crown, Settings, LogOut, Sparkles, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  return (
    <AppShell>
      <header className="bg-gradient-hero px-6 pt-10 pb-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-2xl font-bold text-primary-foreground shadow-gold">
          IE
        </div>
        <h1 className="mt-4 text-2xl text-foreground">Tu Cuenta</h1>
        <p className="text-sm text-muted-foreground">creador@impulso.io</p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-gold" /> Plan Gratuito
        </span>
      </header>

      <main className="space-y-5 px-6 pt-6">
        <div className="rounded-2xl border border-border bg-gradient-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-gold" />
            <p className="text-sm font-semibold text-foreground">Uso este mes</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-background/40 p-3">
              <p className="text-2xl font-semibold text-foreground">23</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Generaciones</p>
            </div>
            <div className="rounded-xl bg-background/40 p-3">
              <p className="text-2xl font-semibold text-gold">6</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Herramientas</p>
            </div>
          </div>
        </div>

        <Link to="/premium" className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gradient-card p-4 shadow-gold transition-smooth hover:scale-[1.01]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold">
            <Crown className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Mejora a Premium</p>
            <p className="text-xs text-muted-foreground">IA ilimitada y más</p>
          </div>
          <span className="text-xs text-gold">→</span>
        </Link>

        <div className="space-y-2 rounded-2xl border border-border bg-card p-2">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-foreground transition-smooth hover:bg-secondary">
            <Settings className="h-4 w-4 text-muted-foreground" /> Configuración
          </button>
          <Link to="/" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-foreground transition-smooth hover:bg-secondary">
            <LogOut className="h-4 w-4 text-muted-foreground" /> Cerrar sesión
          </Link>
        </div>
      </main>
    </AppShell>
  );
}
