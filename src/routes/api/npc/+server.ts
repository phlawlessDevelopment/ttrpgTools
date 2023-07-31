import { HF_API_KEY } from "$env/static/private";
import type { RequestEvent } from "./$types";
import type { Npc } from "../../../types/npc";

interface Query {
  inputs: string,
  return_full_text: boolean,
  max_new_tokens: number,
  options: {
    wait_for_model: boolean
  }
}
interface Result {
  name: string,
  bio: string,
}

async function runQuery(query: Query) {
  const model = 'google/flan-t5-xxl';
  const response = await fetch(
    "https://api-inference.huggingface.co/models/" + model,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HF_API_KEY}`
      },
      method: "POST",
      body: JSON.stringify(query),
    }
  );
  console.log(response.status)

  const result = await response.json();
  return result;
}


export async function POST({ request }: RequestEvent) {

  const body = await request.json();
  const npc = body as Npc;
  const nameTemplate = `gender: ${npc.gender}, race: ${npc.race}, stats: ${JSON.stringify(npc.statblock)},name:`;


  const nameResponse = await runQuery({ inputs: nameTemplate, return_full_text: false, max_new_tokens: 5, options: { wait_for_model: true } });

  const name = nameResponse[0].generated_text;

  const bioTemplate = `gender: ${npc.gender}, race: ${npc.race}, stats: ${JSON.stringify(npc.statblock)},name: ${name}, bio: `;

  const bioResponse = await runQuery({ inputs: bioTemplate, return_full_text: false, max_new_tokens: 250, options: { wait_for_model: true } });

  const bio = bioResponse[0].generated_text;

  return new Response(JSON.stringify({ name, bio }));
}

