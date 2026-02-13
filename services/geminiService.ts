
import { GoogleGenAI, Type } from "@google/genai";

export const getStyleConsultation = async (prompt: string) => {
  // A inicialização deve usar diretamente o process.env.API_KEY conforme as diretrizes
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é um barbeiro especialista em visagismo da ZB Barbearia. 
      Analise o seguinte pedido do cliente e sugira 2 ou 3 estilos de corte de cabelo ou barba que combinem. 
      Explique brevemente o porquê de cada sugestão baseada em formato de rosto e praticidade.
      Pedido do cliente: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["name", "description", "reason"]
              }
            },
            finalTip: { type: Type.STRING }
          },
          required: ["suggestions", "finalTip"]
        }
      }
    });

    // Acessando a propriedade .text diretamente conforme o manual
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Consultation Error:", error);
    return null;
  }
};
