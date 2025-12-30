
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartResponse = async (history: ChatMessage[], userMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `Você é o "Deep Optical Analyzer" da Ótica Cdo. Sua comunicação é sofisticada, analítica e técnica, equivalente aos modelos de IA mais avançados do mundo (estilo DeepSeek).

OBJETIVO:
- Fornecer consultoria técnica de alto nível para orçamentos de luxo.
- Analisar a viabilidade de lentes (Varilux, Zeiss, Hoya) com base nos graus informados (Esférico, Cilíndrico).
- Explicar conceitos como "Índice de Refração", "Curvatura Asférica" e "Proteção Blue-UV" com clareza científica.

TOM DE VOZ:
- Profissional, vanguardista, exclusivo e extremamente preciso.
- Use termos como "Otimização Visual", "Arquitetura da Lente", "Precisão Micrométrica".

AÇÕES:
1. Ao receber um orçamento, avalie cada item com rigor técnico.
2. Se o cliente tiver graus altos (ex: acima de 4.00), sugira lentes de alto índice (1.67 ou 1.74).
3. Colete sugestões de produtos que não estão no site e prometa encaminhar para o departamento de curadoria.
4. Sempre direcione para o fechamento final com o consultor humano via WhatsApp para medidas físicas (DNP), que é o padrão ouro de precisão.

Responda em Português do Brasil com formatação elegante.`,
      },
    });

    return response.text || "Poderia reformular sua solicitação técnica para que eu possa processar com precisão?";
  } catch (error) {
    console.error("Gemini Analytical Error:", error);
    return "Detectamos uma oscilação no processamento neural. Por favor, reinicie esta sessão ou contate nosso Concierge via WhatsApp.";
  }
};
