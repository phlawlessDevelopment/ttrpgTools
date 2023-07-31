import { HF_API_KEY } from "$env/static/private";
import type { RequestEvent } from "./$types";
import type { Npc } from "../../../types/npc";

interface HFResponse {
  generated_text: string
}

async function query(data: { inputs: string, wait_for_model: boolean }) {
  const model = 'google/flan-t5-large';
  const response = await fetch(
    "https://api-inference.huggingface.co/models/" + model,
    {
      headers: { Authorization: `Bearer ${HF_API_KEY}` },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}


export async function POST({ request }: RequestEvent) {

  const body = await request.json();
  const npc = body as Npc;
  const template = `gender: ${npc.gender}, race: ${npc.race}, stats: ${JSON.stringify(npc.statblock)},background:`;

  const response = (await query({ inputs: template, wait_for_model: true }))[0] as HFResponse;
  console.log(response)
  return new Response(JSON.stringify(template + " " + response.generated_text));
}

