import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Sparkles, Lightbulb, Tag, Wand2, CalendarDays, FolderKanban, Crown, MessageSquare, Image as ImageIcon, ArrowRight, Bell } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const featured = { to: "/create", icon: Sparkles, title: "Generador de contenido IA", desc: "Posts, copies y captions que convierten" };

const tools = [
  { to: "/create", icon: Lightbulb, title: "Ideas de negocio", desc: "Oportunidades nuevas" },
  { to: "/create", icon: Tag, title: "Nombres de marca", desc: "Únicos y memorables" },
  { to: "/create", icon: Wand2, title: "Prompts IA", desc: "Para cualquier modelo" },
  { to: "/calendario", icon: CalendarDays, title: "Calendario", desc: "Planifica posts" },
  { to: "/create", icon: FolderKanban, title: "Organizar ideas", desc: "Tu 2º cerebro" },
  { to: "/create", icon: MessageSquare, title: "Copy de venta", desc: "Convierte más" },
  { to: "/create", icon: ImageIcon, title: "Productos digitales", desc: "Inspiración $$$" },
];

function Dashboard() {
  return (
    <AppShell>
      <header className="relative overflow-hidden bg-gradient-hero px-6 pt-12 pb-8 grain">
        <div className="pointer-events-none absolute -top-20 right-0 h-48 w-48 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative flex items-center justify-between animate-fade-in">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Bienvenido</p>
            <h1 className="display mt-1 text-[28px] leading-tight text-foreground">Hola, <span className="text-gradient-gold italic">creador</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-xl transition hover:text-gold">
              <Bell className="h-4 w-4" />
            </button>
            <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-[13px] font-bold text-primary-foreground shadow-gold shadow-inner-gold">
              IE
            </Link>
          </div>
        </div>

        <Link to="/premium" className="group relative mt-7 flex items-center gap-3 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-premium p-4 backdrop-blur-xl transition-spring hover:scale-[1.01] hover:border-gold/60 animate-fade-in-up delay-100">
          <span className="absolute inset-0 animate-gold-sweep opacity-40" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-gold shadow-gold shadow-inner-gold">
            <Crown className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="relative flex-1">
            <p className="text-[14px] font-semibold text-foreground">Desbloquea Premium</p>
            <p className="text-[11px] text-muted-foreground">IA ilimitada · plantillas exclusivas</p>
          </div>
          <ArrowRight className="relative h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
        </Link>
      </header>

      <main className="px-6 pt-7">
        {/* Featured tool */}
        <Link to={featured.to} className="group relative block overflow-hidden rounded-3xl border border-gold/40 bg-gradient-premium p-6 shadow-gold animate-fade-in-up delay-200">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold shadow-inner-gold">
              <featured.icon className="h-6 w-6 text-primary-foreground" strokeWidth={2.2} />
            </div>
            <div className="flex-1">
              <span className="inline-flex rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gold">Más usado</span>
              <h3 className="display mt-2 text-[20px] leading-tight text-foreground">{featured.title}</h3>
              <p className="mt-1 text-[12px] text-muted-foreground">{featured.desc}</p>
            </div>
          </div>
          <div className="relative mt-5 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">3 / 5 hoy</span>
            <span className="flex items-center gap-1 text-[12px] font-semibold text-gold transition-transform group-hover:translate-x-1">
              Abrir <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>

        {/* Section title */}
        <div className="mt-8 mb-4 flex items-baseline justify-between animate-fade-in-up delay-300">
          <h2 className="display text-[20px] text-foreground">Tu arsenal</h2>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">8 herramientas</span>
        </div>

        {/* Grid 2 cols */}
        <div className="grid grid-cols-2 gap-3">
          {tools.map(({ to, icon: Icon, title, desc }, i) => (
            <Link
              key={title}
              to={to}
              style={{ animationDelay: `${0.3 + i * 0.05}s` }}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-gradient-card p-4 shadow-soft transition-spring hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold animate-fade-in-up"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-background/60 transition-smooth group-hover:bg-gradient-gold group-hover:border-transparent">
                <Icon className="h-[18px] w-[18px] text-gold transition-smooth group-hover:text-primary-foreground" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[13px] font-semibold leading-tight text-foreground">{title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Usage card */}
        <div className="mt-7 rounded-2xl border border-border bg-gradient-card p-5 shadow-soft animate-fade-in-up delay-500">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Uso diario</p>
            <Link to="/premium" className="text-[11px] font-semibold text-gold">Ampliar →</Link>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="display text-[32px] text-foreground">3</span>
            <span className="text-[13px] text-muted-foreground">/ 5 generaciones</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-input">
            <div className="h-full w-[60%] rounded-full bg-gradient-gold shadow-inner-gold" />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
