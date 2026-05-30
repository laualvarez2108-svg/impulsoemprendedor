import { createServerFn } from "@tanstack/react-start";
import { logMentorQuery, getUserProfile, getCreativeHistory } from "@/lib/arkiv";

export const copilotChat = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as { messages: Array<{ role: string; content: string }> })
  .handler(async ({ data, context }) => {
    const env = (context as any).cloudflare?.env || process.env;
    const apiKey = env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY no está configurada");
    }

    let profile = null;
    let creativeHistory: Array<{ userQuery: string; aiResponse: string; timestamp: string }> = [];

    try {
      profile = await getUserProfile();
      creativeHistory = await getCreativeHistory(10);
    } catch (error) {
      console.error("Error fetching memory from Arkiv (non-blocking):", error);
    }

    let systemPrompt = "Eres un copiloto creativo experto en marketing digital y creación de contenido. Ayudas a emprendedores a generar copies para redes sociales, ideas de productos, nombres de marca, hooks virales y contenido creativo. Responde siempre en español, de forma creativa, práctica y motivadora. Genera múltiples opciones y variaciones. Sé conciso pero completo.";

    if (profile) {
      systemPrompt += "\n\nCONTEXTO DEL USUARIO (memoria inteligente):\n";
      if (profile.brandTone) systemPrompt += `- Tono de marca: ${profile.brandTone}\n`;
      if (profile.productOrService) systemPrompt += `- Producto/Servicio: ${profile.productOrService}\n`;
      if (profile.industry) systemPrompt += `- Industria/Rubro: ${profile.industry}\n`;
      if (profile.creativeStyle) systemPrompt += `- Estilo creativo: ${profile.creativeStyle}\n`;
      if (profile.targetAudience) systemPrompt += `- Audiencia objetivo: ${profile.targetAudience}\n`;
      if (profile.brandValues && profile.brandValues.length > 0) {
        systemPrompt += `- Valores de marca: ${profile.brandValues.join(", ")}\n`;
      }
      systemPrompt += "\nUsa esta información para personalizar tus respuestas y mantener coherencia con la marca del usuario.";
    }

    if (creativeHistory.length > 0) {
      systemPrompt += "\n\nHISTORIAL CREATIVO RECIENTE (últimas consultas):\n";
      creativeHistory.slice(0, 5).forEach((item, index) => {
        systemPrompt += `\n${index + 1}. Pregunta: "${item.userQuery}"`;
      });
      systemPrompt += "\n\nUsa este historial para evitar repetir ideas y construir sobre conversaciones previas.";
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          ...data.messages,
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error de OpenAI API: ${error}`);
    }

    const result = await response.json() as {
      choices: Array<{ message: { content: string } }>
    };
    
    const aiResponse = result.choices[0].message.content;
    const lastUserMessage = data.messages.filter(m => m.role === "user").pop()?.content || "";

    try {
      await logMentorQuery(lastUserMessage, aiResponse);
    } catch (error) {
      console.error("Error logging to Arkiv (non-blocking):", error);
    }

    return aiResponse;
  });
