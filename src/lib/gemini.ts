import { GoogleGenAI, Type } from "@google/genai";
import { CausalityMap, InverseSearchResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getCausalityMap = async (action: string): Promise<CausalityMap> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the long-term causality of the following action: "${action}". 
    Map the fallout across different timeframes (Days, Months, Years, Decades). 
    For each timeframe, identify a "Silent Stakeholder" (someone or something affected who doesn't have a voice).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          initialAction: { type: Type.STRING },
          effects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timeframe: { type: Type.STRING, description: "e.g. '7 Days', '1 Year', '25 Years'" },
                description: { type: Type.STRING },
                silentStakeholder: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "e.g. 'Local soil micro-biome', 'Future generations in coastal cities'" },
                    impact: { type: Type.STRING },
                    urgency: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
                  },
                  required: ['name', 'impact', 'urgency']
                }
              },
              required: ['timeframe', 'description', 'silentStakeholder']
            }
          }
        },
        required: ['initialAction', 'effects']
      }
    }
  });

  return JSON.parse(response.text || '{}') as CausalityMap;
};

export const getInverseSearch = async (goal: string): Promise<InverseSearchResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Work backward from the following goal: "${goal}". 
    Create a chain of specific lifestyle changes required to achieve it, starting from the final outcome and moving to the present day.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          goal: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                action: { type: Type.STRING },
                rationale: { type: Type.STRING },
                difficulty: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
              },
              required: ['action', 'rationale', 'difficulty']
            }
          }
        },
        required: ['goal', 'steps']
      }
    }
  });

  return JSON.parse(response.text || '{}') as InverseSearchResult;
};
