import { getDriver } from '@/lib/neo4j';

export async function GET() {
  const session = getDriver().session();
  try {
    const result = await session.run(
      `MATCH (c:Case)
       OPTIONAL MATCH (c)<-[:BELONGS_TO_CASE]-(p:Person {role: "Suspect"})
       OPTIONAL MATCH (c)<-[:BELONGS_TO_CASE]-(e:Evidence)
       RETURN c.id AS id, c.title AS title, c.difficulty AS difficulty,
              count(DISTINCT p) AS suspectCount, count(DISTINCT e) AS clueCount
       ORDER BY c.id`
    );
    const cases = result.records.map((r) => ({
      id: r.get('id'),
      title: r.get('title'),
      difficulty: r.get('difficulty'),
      suspectCount: r.get('suspectCount').toNumber(),
      clueCount: r.get('clueCount').toNumber(),
    }));
    return Response.json({ cases });
  } finally {
    await session.close();
  }
}