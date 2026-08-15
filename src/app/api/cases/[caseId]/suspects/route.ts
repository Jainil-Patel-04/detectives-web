import { getDriver } from '@/lib/neo4j';

export async function GET(req: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params; // <-- await this now
  const session = getDriver().session();
  try {
    const result = await session.run(
      `MATCH (p:Person)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
       WHERE p.role = "Suspect"
       RETURN p.id AS id, p.name AS name, p.occupation AS occupation, p.role AS role, p.teaser AS teaser`,
      { caseId }
    );
    const suspects = result.records.map((r) => ({
      id: r.get('id'),
      name: r.get('name'),
      occupation: r.get('occupation'),
      role: r.get('role'),
      teaser: r.get('teaser'),
    }));
    return Response.json({ suspects });
  } finally {
    await session.close();
  }
}