import { NextResponse } from "next/server";
import { model } from "../../../../../lib/geminiClient";
import { supabase } from "../../../../../lib/supabaseClient";

export async function POST(request: Request){
  const { user_id, city, days, budget } = await request.json();

  const prompt = `
    Gere um roteiro de viagem detalhado para a seguinte cidade e parâmetros:
    - Cidade: ${city}
    - Quantidade de dias: ${days}
    - Orçamento total: ${budget} reais

    O roteiro deve incluir:
    1. Uma lista de atividades para cada dia, com horário, descrição, localização, custo e tipo (alimentação, turismo, transporte, compras, ou hospedagem).
    2. Recomendações gerais para a viagem, incluindo dicas de viagem, pratos típicos e opções de transporte.

    Retorne o resultado em JSON seguindo esta estrutura:
    {
      "city": string,
      "days": number,
      "budget": number,
      "totalCost": number,
      "dailyPlan": [
        {
          "day": number,
          "activities": [
            {
              "time": string,
              "description": string,
              "location": string,
              "cost": number,
              "type": "food" | "sightseeing" | "transport" | "shopping" | "accommodation"
            }
          ]
        }
      ],
      "recommendations": {
        "generalTips": [string],
        "localCuisine": [string],
        "transportOptions": [string]
      }
    }

    Retorne somente o JSON com o roteiro gerado e nada mais.
  `

  const geminiResponse = await model.generateContent(prompt);

  if(!geminiResponse.response.candidates) return NextResponse.json({error: 'Erro ao gerar roteiro'}, {status: 400});

  const textReponse = geminiResponse.response.candidates[0].content.parts[0].text as string;

  const itinerary = textReponse.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

  const jsonReponse = JSON.parse(itinerary);

  const { data, error} = await supabase.from('itineraries').insert({ user_id, data: JSON.stringify(jsonReponse) }).select();

  if(error){
    return NextResponse.json({error: error.message}, {status: 400});
  }

  return NextResponse.json(data, {status: 201});
}