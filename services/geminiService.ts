import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are FreshGen, an intelligent and friendly grocery assistant.
Your goal is to help users make better food choices, find recipes, and understand nutritional value.
Keep your answers concise, helpful, and formatted beautifully (using Markdown where appropriate).
If asked about products, assume context of a general grocery store unless specific products are provided.
`;

export const generateRecipeSuggestion = async (cartItems: string[]): Promise<string> => {
  if (cartItems.length === 0) {
    return "Your cart is empty! Add some ingredients to get a recipe suggestion.";
  }

  try {
    const prompt = `I have the following items in my grocery cart: ${cartItems.join(", ")}. 
    Suggest one delicious recipe I can make primarily using these ingredients (and basic pantry staples like oil, salt, pepper). 
    Provide the response in a clean Markdown format with a title, ingredients list, and short instructions.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a recipe at this time. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the chef right now.";
  }
};

export const chatWithAI = async (message: string, currentContext: string = ""): Promise<string> => {
  try {
    const prompt = `Context: ${currentContext}\n\nUser Question: ${message}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm experiencing a temporary brain freeze. Please try again later.";
  }
};

export const getProductInsights = async (product: Product): Promise<string> => {
  try {
    const prompt = `Give me a 2-sentence fun fact or health benefit about ${product.name} (${product.category}).`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Tasty and healthy!";
  } catch (error) {
    return "A great choice for your basket.";
  }
}
