import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/calendario")({ component: Calendario });

const days = ["L", "M", "X", "J", "V", "S", "D"];
const posts = [
  { day: "Mar", time: "10:00", title: "Reel: 3 tips de productividad", platform: "Instagram", color: "from-gold/30" },
  { day: "Mié", time: "18:30", title: "Carrusel: Mi historia", platform: "LinkedIn", color: "from-amber-400/20" },
  { day: "Vie", time: "12:00", title: "Hook viral semanal", platform: "TikTok", color: "from-gold/25" },
];

function Calendario() {
  return (
    <AppShell>
      <header className="bg-gradient-hero px-6 pt-10 pb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gold/70">Tu plan</p>
        <h1 className="mt-1 text-2xl text-foreground">Calendario de contenido</h1>
      </header>

      <main className="px-6 pt-6">
        <div className="rounded-2xl border border-border bg-gradient-card p-4">
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {days.map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => {
              const has = [2, 4, 8, 11, 15, 19, 22].includes(i);
              const today = i === 8;
              return (
                <div key={i} className={`relative aspect-square rounded-lg text-xs flex items-center justify-center transition-smooth ${
                  today ? "bg-gradient-gold text-primary-foreground font-semibold shadow-gold" : "bg-background/40 text-muted-foreground"
                }`}>
                  {i + 1}
                  {has && !today && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-gold" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between">
          <h2 className="text-lg text-foreground">Esta semana</h2>
          <button className="flex items-center gap-1 rounded-full bg-gradient-gold px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-gold">
            <Plus className="h-3 w-3" /> Nueva
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {posts.map((p, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-4`}>
              <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${p.color} to-transparent`} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gold">{p.day} · {p.time}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{p.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.platform}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
