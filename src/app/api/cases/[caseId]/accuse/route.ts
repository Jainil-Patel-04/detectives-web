// src/app/api/cases/[caseId]/accuse/route.ts

import { getDriver } from '@/lib/neo4j';
import { getSolution } from '@/lib/solutions';

export async function POST(req: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params; // <-- await this now
  const { suspectIds }: { suspectIds: string[] } = await req.json()

  const session = getDriver().session();
  let actualCulprits: string[];
  try {
    const result = await session.run(
      `MATCH (p:Person)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
       WHERE p.isCulprit = true
       RETURN p.id AS id`,
      { caseId }
    );
    actualCulprits = result.records.map((r) => r.get('id'));
  } finally {
    await session.close();
  }

  const culpritSet = new Set(actualCulprits);
  const selectedSet = new Set(suspectIds);

  const missed = [...culpritSet].filter((id) => !selectedSet.has(id));
  const wronglyAccused = [...selectedSet].filter((id) => !culpritSet.has(id));
  const correctlyAccused = [...selectedSet].filter((id) => culpritSet.has(id));

  let verdict: 'full' | 'partial' | 'incorrect';
  let message: string;
  let solution: string | null = null;

  if (missed.length === 0 && wronglyAccused.length === 0) {
    verdict = 'full';
    message = 'Case closed. Every name on your list was guilty — no more, no less.';
    solution = getSolution(caseId);
  } else if (correctlyAccused.length > 0) {
    verdict = 'partial';
    message =
      wronglyAccused.length > 0
        ? "You're onto something, but this net is too wide — someone you named wasn't involved, or someone else got away."
        : "You've got part of it. But this goes deeper than who you've named.";
  } else {
    verdict = 'incorrect';
    message = "None of this holds up. Look again — the evidence points elsewhere.";
  }

  return Response.json({ verdict, message, solution });
}