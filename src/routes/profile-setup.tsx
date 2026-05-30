import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ArrowLeft, Save, User, Palette, Target, Briefcase } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { saveUserProfile } from "@/functions/save-user-profile";
import type { UserProfile } from "@/lib/arkiv";

export const Route = createFileRoute("/profile-setup")({ component: ProfileSetup });

function ProfileSetup() {
  const [profile, setProfile] = useState<UserProfile>({
    brandTone: "",
    productOrService: "",
    industry: "",
    creativeStyle: "",
    targetAudience: "",
    brandValues: [],
  });
  const [brandValuesInput, setBrandValuesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const profileToSave = {
        ...profile,
        brandValues: brandValuesInput
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v.length > 0),
      };
      await saveUserProfile({ data: profileToSave });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error al guardar el perfil. Por favor intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/85 px-5 py-4 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold shadow-gold shadow-inner-gold">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-[15px] font-semibold text-foreground">
              Configurar Memoria IA
            </h1>
            <p className="text-[11px] text-muted-foreground">
              Personaliza tu experiencia
            </p>
          </div>
        </div>
      </header>

      <main className="space-y-6 px-5 py-6 pb-32">
        <div className="rounded-2xl border border-border bg-gradient-card p-4 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gold" />
            <h2 className="text-sm font-semibold text-foreground">
              Tu Negocio
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">
                Producto o Servicio
              </label>
              <input
                type="text"
                value={profile.productOrService || ""}
                onChange={(e) =>
                  setProfile({ ...profile, productOrService: e.target.value })
                }
                placeholder="Ej: Cursos online de marketing digital"
                className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">
                Industria / Rubro
              </label>
              <input
                type="text"
                value={profile.industry || ""}
                onChange={(e) =>
                  setProfile({ ...profile, industry: e.target.value })
                }
                placeholder="Ej: Educación, Tecnología, Salud"
                className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">
                Audiencia Objetivo
              </label>
              <input
                type="text"
                value={profile.targetAudience || ""}
                onChange={(e) =>
                  setProfile({ ...profile, targetAudience: e.target.value })
                }
                placeholder="Ej: Emprendedores de 25-40 años"
                className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-card p-4 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Palette className="h-4 w-4 text-gold" />
            <h2 className="text-sm font-semibold text-foreground">
              Identidad de Marca
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">
                Tono de Marca
              </label>
              <select
                value={profile.brandTone || ""}
                onChange={(e) =>
                  setProfile({ ...profile, brandTone: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground focus:border-gold/50 focus:outline-none"
              >
                <option value="">Selecciona un tono</option>
                <option value="Profesional y corporativo">
                  Profesional y corporativo
                </option>
                <option value="Cercano y amigable">Cercano y amigable</option>
                <option value="Inspirador y motivador">
                  Inspirador y motivador
                </option>
                <option value="Divertido y casual">Divertido y casual</option>
                <option value="Técnico y experto">Técnico y experto</option>
                <option value="Elegante y sofisticado">
                  Elegante y sofisticado
                </option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">
                Estilo Creativo
              </label>
              <select
                value={profile.creativeStyle || ""}
                onChange={(e) =>
                  setProfile({ ...profile, creativeStyle: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground focus:border-gold/50 focus:outline-none"
              >
                <option value="">Selecciona un estilo</option>
                <option value="Minimalista y limpio">
                  Minimalista y limpio
                </option>
                <option value="Colorido y vibrante">Colorido y vibrante</option>
                <option value="Moderno y trendy">Moderno y trendy</option>
                <option value="Clásico y atemporal">Clásico y atemporal</option>
                <option value="Audaz y disruptivo">Audaz y disruptivo</option>
                <option value="Orgánico y natural">Orgánico y natural</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">
                Valores de Marca (separados por coma)
              </label>
              <input
                type="text"
                value={brandValuesInput}
                onChange={(e) => setBrandValuesInput(e.target.value)}
                placeholder="Ej: Innovación, Calidad, Confianza"
                className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent p-4">
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-gold" />
            <h2 className="text-sm font-semibold text-foreground">
              ¿Cómo funciona la memoria IA?
            </h2>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Tu Mentor IA recordará esta información en todas tus conversaciones.
            Cada consulta y respuesta se guarda de forma descentralizada en la
            blockchain de Arkiv, creando un historial creativo que mejora las
            respuestas con el tiempo.
          </p>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-24 z-20 mx-auto max-w-md px-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-gold px-6 py-4 text-sm font-semibold text-primary-foreground shadow-gold shadow-inner-gold transition-spring hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          {saving ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Guardando...
            </>
          ) : saved ? (
            <>
              <Save className="h-4 w-4" />
              ¡Guardado!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Guardar Perfil
            </>
          )}
        </button>
      </div>
    </AppShell>
  );
}
