import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Zap, Star, Database, Shield, Brain } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/")({
  component: Welcome,
  head: () => ({
    meta: [
      { title: "Impulso Emprendedor IA — Bienvenida" },
      { name: "description", content: "La IA al servicio de emprendedores modernos. Crea contenido, organiza ideas y potencia tu marca con tecnología blockchain Arkiv." },
    ],
  }),
});

function Welcome() {
  return (
    <AppShell hideNav>
      <div className="relative min-h-screen overflow-hidden bg-gradient-hero grain">
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-20 h-56 w-56 rounded-full bg-gold-deep/10 blur-3xl" />

        <div className="relative flex min-h-screen flex-col px-6 pt-14 pb-10">
          {/* Top badge */}
          <div className="mx-auto inline-flex animate-fade-in items-center gap-2 rounded-full border border-gold/30 bg-card/40 px-3 py-1.5 backdrop-blur-xl">
            <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-soft">v2.0 · Powered by Arkiv Network</span>
          </div>

          {/* Logo */}
          <div className="mt-10 flex justify-center animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 -m-8 rounded-full bg-gold/20 blur-3xl animate-shimmer" />
              <img src={logo} alt="Impulso Emprendedor" className="relative h-28 w-auto animate-float drop-shadow-2xl" />
            </div>
          </div>

          {/* Headline */}
          <div className="mt-10 space-y-4 text-center">
            <h1 className="display animate-fade-in-up text-[2.6rem] leading-[1.02] text-foreground">
              Impulso<br />
              <span className="text-gradient-gold italic">Emprendedor</span>
              <Sparkles className="ml-2 inline h-7 w-7 text-gold animate-shimmer" />
            </h1>
            <p className="animate-fade-in-up delay-100 mx-auto max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              La inteligencia artificial al servicio de emprendedores modernos.
            </p>
            <p className="animate-fade-in-up delay-200 mx-auto max-w-xs text-[15px] leading-relaxed text-foreground/80">
              Creá contenido, organizá ideas y potenciá tu marca con herramientas inteligentes respaldadas por blockchain.
            </p>
          </div>

          {/* Arkiv Integration Badge */}
          <div className="mt-6 animate-fade-in-up delay-250">
            <div className="mx-auto max-w-sm rounded-2xl border border-gold/30 bg-card/60 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold shadow-gold">
                  <Database className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-foreground">Integrado con Arkiv Network</p>
                  <p className="text-[11px] text-muted-foreground">Tus datos seguros en blockchain</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 space-y-3 animate-fade-in-up delay-300">
            <Link
              to="/dashboard"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-gold px-6 py-[18px] text-[15px] font-semibold text-primary-foreground shadow-gold shadow-inner-gold transition-spring hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 animate-gold-sweep" />
              <span className="relative flex items-center gap-2">
                Comenzar gratis
                <ArrowUpRight className="h-[18px] w-[18px] transition-transform group-hover:rotate-12 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </span>
            </Link>
            <Link
              to="/login"
              className="block text-center text-[13px] text-muted-foreground transition hover:text-gold"
            >
              Ya tengo cuenta · <span className="text-gold-soft">Iniciar sesión</span>
            </Link>
          </div>

          {/* Feature pills */}
          <div className="mt-auto pt-10 animate-fade-in-up delay-400">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { icon: Brain, label: "IA Real" },
                { icon: Shield, label: "Blockchain" },
                { icon: Zap, label: "Instantáneo" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card/40 px-3 py-3 backdrop-blur-xl">
                  <f.icon className="h-4 w-4 text-gold" strokeWidth={1.8} />
                  <span className="text-[11px] font-medium text-muted-foreground">{f.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
              Confiado por emprendedores en LATAM
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
