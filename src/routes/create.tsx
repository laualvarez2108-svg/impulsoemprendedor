import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Send, Copy, Sparkles, Clock, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { copilotChat } from "@/functions/copilot-chat";

export const Route = createFileRoute("/create")({ component: Create });

type Msg = { role: "user" | "ai"; text: string };

const samples = [
  "Caption Instagram sobre productividad",
  "5 nombres para mi marca de café",
  "Idea de producto digital de $97",
  "Hook viral para TikTok",
];

function Create() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "¡Hola! Soy tu copiloto creativo ✨\n\n¿Qué necesitas crear hoy? Puedo generar copies, ideas, nombres, prompts y mucho más." },
  ]);
  const [thinking, setThinking] = useState(false);

  const send = async (txt?: string) => {
    const t = (txt ?? input).trim();
    if (!t || thinking) return;

    const newMessages: Msg[] = [...messages, { role: "user", text: t }];
    setMessages(newMessages);
    setInput("");
    setThinking(true);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const response = await copilotChat({ data: { messages: apiMessages } });
      
      if (typeof response === 'object' && response !== null && 'error' in response) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: `⚠️ ${response.message}`,
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: response as string }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.",
        },
      ]);
      console.error("Copilot chat error:", error);
    } finally {
      setThinking(false);
    }
  };

  return (
    <AppShell>
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/85 px-5 py-4 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-gold">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold shadow-gold shadow-inner-gold">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-[15px] font-semibold text-foreground">Copiloto IA</h1>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground"><Clock className="h-3 w-3" /> IA activa</p>
          </div>
        </div>
      </header>

      <main className="space-y-4 px-5 py-6 pb-40">
        {messages.map((m, i) => (
          <div key={i} className={`flex animate-fade-in-up ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-soft ${
              m.role === "user"
                ? "bg-gradient-gold text-primary-foreground shadow-inner-gold"
                : "border border-border bg-gradient-card text-foreground"
            }`}>
              {m.text}
              {m.role === "ai" && i > 0 && (
                <button
                  onClick={() => navigator.clipboard.writeText(m.text)}
                  className="mt-3 flex items-center gap-1.5 rounded-lg border border-border bg-background/50 px-2.5 py-1.5 text-[10px] text-muted-foreground transition hover:text-gold"
                >
                  <Copy className="h-3 w-3" /> Copiar
                </button>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-gradient-card px-4 py-3 shadow-soft">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold delay-100" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold delay-200" />
            </div>
          </div>
        )}

        {messages.length <= 1 && !thinking && (
          <div className="space-y-2.5 pt-2 animate-fade-in-up delay-200">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Prueba rápida</p>
            <div className="flex flex-wrap gap-2">
              {samples.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] text-muted-foreground transition-smooth hover:-translate-y-0.5 hover:border-gold/50 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-24 z-20 mx-auto max-w-md px-4">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/95 p-2 shadow-elegant backdrop-blur-2xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escribe tu pedido…"
            className="flex-1 bg-transparent px-3 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold text-primary-foreground shadow-gold shadow-inner-gold transition-spring hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
