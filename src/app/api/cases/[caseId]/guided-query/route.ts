import { GoogleGenerativeAI } from '@google/generative-ai';
import { getDriver } from '@/lib/neo4j';
import { getTemplate } from '@/lib/questionTemplates';
import { recordsToGraph } from '@/lib/graphMapper';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

export async function POST(req: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const { templateId, entityId, label }: { templateId: string; entityId: string | null; label: string } =
    await req.json();

  const template = getTemplate(templateId);
  if (!template) {
    return Response.json({ narrative: "That thread doesn't lead anywhere.", graphData: null }, { status: 400 });
  }

  const { query, params: queryParams } = template.buildQuery(entityId, caseId);

  const session = getDriver().session();
  let records;
  try {
    const result = await session.run(query, queryParams);
    records = result.records;
  } finally {
    await session.close();
  }

  const graphData = recordsToGraph(records);

  // no results — deterministic response, no Gemini call, no risk of it inventing detail that isn't there
  if (graphData.nodes.length === 0) {
    return Response.json({
      narrative: "That angle doesn't lead anywhere. Nothing on record for this one.",
      graphData,
    });
  }

  const narrativePrompt = `You are a sharp, atmospheric detective AI copilot narrating findings to a player, in noir style, 2-3 sentences max. Data found: ${JSON.stringify(
    graphData
  )}. The player asked: "${label}"`;

  const narrativeResult = await model.generateContent(narrativePrompt);

  return Response.json({ narrative: narrativeResult.response.text(), graphData });
}