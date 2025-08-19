
import { GoogleGenAI, Type } from "@google/genai";
import type { IdentifiedItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function fileToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}

export async function identifyGroceryItems(base64Image: string): Promise<IdentifiedItem[]> {
  const model = "gemini-2.5-flash";
  const imageParts = [fileToGenerativePart(base64Image, "image/jpeg")];

  const prompt = `
    Identify all unique grocery items in this image. For each item, provide its name and a normalized bounding box.
    Respond with a JSON object containing a single key "items", which is an array of objects.
    Each object should have two keys: "name" (string) and "boundingBox" (an object with "x_min", "y_min", "x_max", "y_max" normalized coordinates from 0 to 1).
    Example: {"items": [{"name": "Apple", "boundingBox": {"x_min": 0.1, "y_min": 0.2, "x_max": 0.3, "y_max": 0.4}}]}.
    If no grocery items are recognizable, return an empty array: {"items": []}.
    Do not include non-grocery items.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      items: {
        type: Type.ARRAY,
        description: "List of identified grocery items with their bounding boxes.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The name of the grocery item.",
            },
            boundingBox: {
              type: Type.OBJECT,
              description: "The normalized bounding box of the item.",
              required: ["x_min", "y_min", "x_max", "y_max"],
              properties: {
                x_min: { type: Type.NUMBER },
                y_min: { type: Type.NUMBER },
                x_max: { type: Type.NUMBER },
                y_max: { type: Type.NUMBER },
              },
            },
          },
        },
      },
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [...imageParts, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const text = response.text.trim();
    if (!text) {
      console.warn("Received empty response from API, returning empty array.");
      return [];
    }
    
    const resultJson = JSON.parse(text);
    return resultJson.items || [];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to identify items via Gemini API.");
  }
}
