import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Flame, TrendingUp, Eye } from "lucide-react";

export const Route = createFileRoute("/virales")({ component: Virales });

const trends = [
  { tag: "#productividad", growth: "+128%", views: "2.4M", hook: "Mi rutina de 5am cambió mi negocio" },
  { tag: "#emprendimiento", growth: "+92%", views: "1.8M", hook: "El error que casi me hace cerrar" },
  { tag: "#marcapersonal", growth: "+76%", views: "980K", hook: "3 cosas que nadie te dice sobre emprender" },
  { tag: "#mindset", growth: "+64%", views: "1.2M", hook: "Lo que aprendí perdiendo $10k" },
];

function Virales() {
  return (
    <AppShell>
      <header className="bg-gradient-hero px-6 pt-10 pb-6">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-gold animate-shimmer" />
          <p className="text-xs uppercase tracking-[0.25em] text-gold/70">Tendencias hoy</p>
        </div>
        <h1 className="mt-1 text-2xl text-foreground">Lo que está volando 🔥</h1>
      </header>

      <main className="space-y-3 px-6 pt-6">
        {trends.map((t) => (
          <Link key={t.tag} to="/create" className="block rounded-2xl border border-border bg-gradient-card p-5 transition-smooth hover:border-gold/40">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gold">{t.tag}</span>
              <span className="flex items-center gap-1 text-xs text-gold-soft"><TrendingUp className="h-3 w-3" /> {t.growth}</span>
            </div>
            <p className="mt-3 text-sm text-foreground">"{t.hook}"</p>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {t.views} vistas</span>
              <span className="text-gold">Crear copy →</span>
            </div>
          </Link>
        ))}
      </main>
    </AppShell>
  );
}
