import { getDriver } from '@/lib/neo4j';

export async function GET(req: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params;
  const session = getDriver().session();
  try {
    const result = await session.run(
      `MATCH (a)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
       MATCH (b)-[:BELONGS_TO_CASE]->(c)
       MATCH (a)-[r]->(b)
       WHERE type(r) <> "BELONGS_TO_CASE"
       RETURN a.id AS fromId, type(r) AS relType, b.id AS toId`,
      { caseId }
    );
    const relationships = result.records.map((rec) => ({
      fromId: rec.get('fromId'),
      relType: rec.get('relType'),
      toId: rec.get('toId'),
    }));
    return Response.json({ relationships });
  } finally {
    await session.close();
  }
}