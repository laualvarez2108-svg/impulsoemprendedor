import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Crown, Infinity as Inf, Sparkles, Zap, Star, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/premium")({ component: Premium });

const benefits = [
  { icon: Inf, title: "Generaciones ilimitadas", desc: "Sin límites diarios. Crea sin pausa." },
  { icon: Sparkles, title: "Herramientas exclusivas", desc: "Acceso anticipado a nuevas IAs." },
  { icon: Star, title: "+200 plantillas premium", desc: "Para cada tipo de contenido." },
  { icon: Zap, title: "Automatizaciones", desc: "Flujos creativos en piloto automático." },
];

function Premium() {
  return (
    <AppShell>
      <header className="relative overflow-hidden bg-gradient-hero px-6 pt-14 pb-10 text-center grain">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative animate-scale-in">
          <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-gold shadow-gold shadow-inner-gold animate-float">
            <Crown className="h-9 w-9 text-primary-foreground" strokeWidth={2} />
          </div>
        </div>
        <div className="relative mt-6 animate-fade-in-up delay-100">
          <span className="inline-flex rounded-full border border-gold/30 bg-card/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">Premium</span>
          <h1 className="display mt-4 text-[34px] leading-tight text-foreground">
            Desbloquea<br /><span className="text-gradient-gold italic">todo el poder</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-[13px] text-muted-foreground">
            Sin límites. Sin pausas. Solo creación.
          </p>
        </div>
      </header>

      <main className="px-6 pt-7">
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-premium p-7 shadow-gold glow-gold animate-fade-in-up delay-200">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Plan Pro</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="display text-[44px] leading-none text-foreground">$9</span>
                <span className="text-[13px] text-muted-foreground">/mes</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Cancela cuando quieras</p>
            </div>
            <span className="rounded-full bg-gradient-gold px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-primary-foreground shadow-inner-gold">Popular</span>
          </div>

          <ul className="relative mt-7 space-y-3.5">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/20">
                  <Icon className="h-[16px] w-[16px] text-gold" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground">{title}</p>
                  <p className="text-[11px] text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <button className="group relative mt-7 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-gold py-[17px] text-[14px] font-semibold text-primary-foreground shadow-gold shadow-inner-gold transition-spring hover:scale-[1.02]">
            <span className="absolute inset-0 animate-gold-sweep" />
            <span className="relative flex items-center gap-2">
              Activar Premium
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <p className="relative mt-3 text-center text-[10px] text-muted-foreground">7 días gratis · luego $9/mes</p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-gradient-card p-5 animate-fade-in-up delay-500">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Comparativa</p>
          <div className="mt-3 space-y-1 text-[13px]">
            {[
              ["Generaciones diarias", "5", "∞"],
              ["Herramientas IA", "8", "20+"],
              ["Plantillas", "10", "200+"],
              ["Soporte prioritario", "—", "✓"],
            ].map(([k, free, pro]) => (
              <div key={k} className="grid grid-cols-3 items-center border-b border-border/40 py-2.5 last:border-0">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-center text-muted-foreground">{free}</span>
                <span className="text-right font-bold text-gradient-gold">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/dashboard" className="mt-6 block text-center text-[12px] text-muted-foreground hover:text-gold">
          Quizá más tarde
        </Link>
      </main>
    </AppShell>
  );
}

void Check;
