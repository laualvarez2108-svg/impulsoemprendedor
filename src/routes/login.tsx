import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import logo from "@/assets/logo.jpg";
import { Mail, Chrome, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <AppShell hideNav>
      <div className="relative min-h-screen overflow-hidden bg-gradient-hero grain px-6 pt-14 pb-10">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

        <Link to="/" className="relative text-[12px] text-muted-foreground transition hover:text-gold animate-fade-in">← Volver</Link>

        <div className="relative mt-8 flex flex-col items-center gap-3 animate-scale-in">
          <img src={logo} alt="Impulso" className="h-20 w-auto drop-shadow-2xl" />
          <h1 className="display mt-3 text-[28px] text-foreground">Bienvenido <span className="text-gradient-gold italic">de vuelta</span></h1>
          <p className="text-[13px] text-muted-foreground">Inicia sesión para continuar</p>
        </div>

        <div className="relative mt-10 space-y-3 animate-fade-in-up delay-200">
          <button className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card/70 px-5 py-[15px] text-[14px] font-medium text-foreground backdrop-blur-xl transition-smooth hover:border-gold/50 hover:bg-card">
            <Chrome className="h-[18px] w-[18px] text-gold" /> Continuar con Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">o con email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            <input type="email" placeholder="tu@email.com" className="w-full rounded-2xl border border-border bg-input/80 px-4 py-[14px] text-[14px] text-foreground placeholder:text-muted-foreground/50 backdrop-blur-xl focus:border-gold/60 focus:outline-none focus:ring-4 focus:ring-gold/10" />
            <input type="password" placeholder="Contraseña" className="w-full rounded-2xl border border-border bg-input/80 px-4 py-[14px] text-[14px] text-foreground placeholder:text-muted-foreground/50 backdrop-blur-xl focus:border-gold/60 focus:outline-none focus:ring-4 focus:ring-gold/10" />
            <Link to="/dashboard" className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-gold py-[16px] text-[14px] font-semibold text-primary-foreground shadow-gold shadow-inner-gold transition-spring hover:scale-[1.02]">
              <span className="absolute inset-0 animate-gold-sweep" />
              <span className="relative flex items-center gap-2">
                <Mail className="h-4 w-4" /> Entrar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <p className="pt-5 text-center text-[12px] text-muted-foreground">
            ¿No tenés cuenta? <Link to="/dashboard" className="font-semibold text-gold">Comenzar gratis</Link>
          </p>
        </div>
      </div>
    </AppShell>
  );
}
