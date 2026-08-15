import { getDriver } from '@/lib/neo4j';

export async function GET(req: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const session = getDriver().session();
  try {
    const result = await session.run(
      `MATCH (e:Evidence)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
       WHERE e.revealed = true
       RETURN e.id AS id, e.name AS name
       ORDER BY e.id`,
      { caseId }
    );
    const evidence = result.records.map((r) => ({ id: r.get('id'), name: r.get('name') }));
    return Response.json({ evidence });
  } finally {
    await session.close();
  }
}