import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDriver } from "@/lib/neo4j";
import { assertReadOnly } from "@/lib/cypherGuard";
import { buildCypherPrompt } from "@/lib/gemini";
import { recordsToGraph } from "@/lib/graphMapper";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });
export async function POST(req: Request) {
  const { question, caseId } = await req.json();

  // Step 1: question -> Cypher
  const cypherResult = await model.generateContent(
    buildCypherPrompt(question, caseId),
  );
  const cypher = cypherResult.response.text().trim();
  console.log("Generated Cypher:", cypher); // add this
  if (cypher === "NO_QUERY") {
    const chat = await model.generateContent(
      `You are a noir detective's AI copilot embedded inside a murder-mystery investigation game. You only discuss this specific case \u2014 its suspects, evidence, locations, and events.

      RULES:
      - If the player's message is small talk, a greeting, general knowledge, math, coding help, or anything unrelated to this investigation, do NOT answer it directly. Instead, respond with 1-2 short noir-styled sentences that decline and steer them back toward the case.
      - Stay fully in character at all times. Never mention that you are an AI, a language model, or break the fourth wall in any way.
      - If the message IS genuinely about the case but too vague to query (e.g. "tell me more" or "what should I do next"), respond helpfully and in character, encouraging them to ask about a specific person, place, or piece of evidence.

      Player said: "${question}"`,
    );
    return Response.json({ narrative: chat.response.text(), graphData: null });
  }

  assertReadOnly(cypher);

  // Step 2: run against Neo4j
  const session = getDriver().session();
  let records;
  try {
    const result = await session.run(cypher);
    records = result.records;
  } finally {
    await session.close();
  }

  const graphData = recordsToGraph(records); // your own mapper -> {nodes, links}
  // add this block:
  if (graphData.nodes.length === 0) {
    return Response.json({
      narrative:
        "That doesn't check out against anything on record. Try rephrasing, or pick one of the suggested leads instead.",
      graphData,
    });
  }
  // Step 3: data -> narrative
  const narrativePrompt = `You are a sharp, atmospheric detective AI copilot narrating findings to a player, in noir style, 2-3 sentences max. Data found: ${JSON.stringify(graphData)}. User asked: "${question}"`;
  const narrative = await model.generateContent(narrativePrompt);

  return Response.json({ narrative: narrative.response.text(), graphData });
}
