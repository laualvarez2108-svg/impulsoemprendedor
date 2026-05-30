import logo from "@/assets/logo.jpg";

export function BrandHeader({ subtitle }: { subtitle?: string }) {
  return (
    <header className="relative overflow-hidden bg-gradient-hero px-6 pt-8 pb-10">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.82 0.13 90 / 0.15), transparent 50%)"
      }} />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <img src={logo} alt="Impulso Emprendedor" className="h-24 w-auto animate-float" />
        {subtitle && <p className="text-xs uppercase tracking-[0.3em] text-gold-soft/70">{subtitle}</p>}
      </div>
    </header>
  );
}
