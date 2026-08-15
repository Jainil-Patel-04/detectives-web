export interface QueryTemplate {
  id: string;
  appliesTo: 'Person' | 'Location' | 'Evidence' | 'starter';
  label: (name?: string) => string;
  buildQuery: (entityId: string | null, caseId: string) => { query: string; params: Record<string, any> };
  // capability requirement: this template is only offered if the entity has
  // at least one relationship of one of these types, in this direction.
  // 'outgoing' = entity is the source (a)-[r]->(); 'incoming' = entity is the target ()-[r]->(entity); 'either' = check both.
  requires?: { relTypes: string[]; direction: 'outgoing' | 'incoming' | 'either' };
}

const PERSON_TO_EVIDENCE_RELS = [
  'OWNS', 'HELD', 'SENT', 'DROPPED', 'HANDLED', 'LEFT_BEHIND', 'TRANSFERRED',
  'USED', 'SIGNED', 'WROTE', 'OPERATED', 'PROGRAMMED', 'MODIFIED', 'EXTRACTED', 'SERVED',
];
const PERSON_TO_EVIDENCE_RELS_CYPHER = PERSON_TO_EVIDENCE_RELS.join('|');

export const templates: QueryTemplate[] = [
  // --- starters, shown only when the corkboard is empty ---
  {
    id: 'starter-suspects',
    appliesTo: 'starter',
    label: () => 'Who are the suspects?',
    buildQuery: (_id, caseId) => ({
      query: `MATCH (p:Person)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE p.role = "Suspect" AND p.revealed = true
               RETURN p LIMIT 50`,
      params: { caseId },
    }),
  },
  {
    id: 'starter-locations',
    appliesTo: 'starter',
    label: () => 'Where did this happen?',
    buildQuery: (_id, caseId) => ({
      query: `MATCH (l:Location)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId}) RETURN l LIMIT 50`,
      params: { caseId },
    }),
  },
  {
    id: 'starter-evidence',
    appliesTo: 'starter',
    label: () => 'What evidence exists?',
    buildQuery: (_id, caseId) => ({
      query: `MATCH (e:Evidence)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE e.revealed = true
               RETURN e LIMIT 50`,
      params: { caseId },
    }),
  },

  // --- Person templates ---
  {
    id: 'person-wasAt',
    appliesTo: 'Person',
    label: (name) => `Where was ${name}?`,
    requires: { relTypes: ['WAS_AT'], direction: 'outgoing' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (p:Person {id: $entityId})-[r:WAS_AT]->(l:Location)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE p.revealed = true
               RETURN p, r, l LIMIT 50`,
      params: { entityId, caseId },
    }),
  },
  {
    id: 'person-handled',
    appliesTo: 'Person',
    label: (name) => `What did ${name} own or handle?`,
    requires: { relTypes: PERSON_TO_EVIDENCE_RELS, direction: 'outgoing' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (p:Person {id: $entityId})-[r:${PERSON_TO_EVIDENCE_RELS_CYPHER}]->(e:Evidence)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE p.revealed = true AND e.revealed = true
               RETURN p, r, e LIMIT 50`,
      params: { entityId, caseId },
    }),
  },
  {
    id: 'person-motiveAgainst',
    appliesTo: 'Person',
    label: (name) => `Does ${name} have a motive against anyone?`,
    requires: { relTypes: ['HAS_MOTIVE_AGAINST'], direction: 'outgoing' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (p:Person {id: $entityId})-[r:HAS_MOTIVE_AGAINST]->(p2:Person)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE p.revealed = true AND p2.revealed = true
               RETURN p, r, p2 LIMIT 50`,
      params: { entityId, caseId },
    }),
  },
  {
    id: 'person-motivatedAgainstBy',
    appliesTo: 'Person',
    label: (name) => `Does anyone have a motive against ${name}?`,
    requires: { relTypes: ['HAS_MOTIVE_AGAINST'], direction: 'incoming' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (p1:Person)-[r:HAS_MOTIVE_AGAINST]->(p:Person {id: $entityId})-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE p1.revealed = true AND p.revealed = true
               RETURN p1, r, p LIMIT 50`,
      params: { entityId, caseId },
    }),
  },
  {
    id: 'person-family',
    appliesTo: 'Person',
    label: (name) => `Is ${name} connected to anyone by family?`,
    requires: { relTypes: ['IS_CHILD_OF'], direction: 'either' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (p:Person {id: $entityId})-[r:IS_CHILD_OF]-(p2:Person)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE p.revealed = true AND p2.revealed = true
               RETURN p, r, p2 LIMIT 50`,
      params: { entityId, caseId },
    }),
  },

  // --- Location templates ---
  {
    id: 'location-whoElse',
    appliesTo: 'Location',
    label: (name) => `Who else was at ${name}?`,
    requires: { relTypes: ['WAS_AT'], direction: 'incoming' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (p:Person)-[r:WAS_AT]->(l:Location {id: $entityId})-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE p.revealed = true
               RETURN p, r, l LIMIT 50`,
      params: { entityId, caseId },
    }),
  },
  {
    id: 'location-evidenceFound',
    appliesTo: 'Location',
    label: (name) => `What evidence was found at ${name}?`,
    requires: { relTypes: ['DISCOVERED_AT'], direction: 'incoming' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (e:Evidence)-[r:DISCOVERED_AT]->(l:Location {id: $entityId})-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE e.revealed = true
               RETURN e, r, l LIMIT 50`,
      params: { entityId, caseId },
    }),
  },

  // --- Evidence templates ---
  {
    id: 'evidence-ownedBy',
    appliesTo: 'Evidence',
    label: (name) => `Who owned or handled ${name}?`,
    requires: { relTypes: PERSON_TO_EVIDENCE_RELS, direction: 'incoming' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (p:Person)-[r:${PERSON_TO_EVIDENCE_RELS_CYPHER}]->(e:Evidence {id: $entityId})-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               WHERE p.revealed = true
               RETURN p, r, e LIMIT 50`,
      params: { entityId, caseId },
    }),
  },
  {
    id: 'evidence-foundAt',
    appliesTo: 'Evidence',
    label: (name) => `Where was ${name} found?`,
    requires: { relTypes: ['DISCOVERED_AT'], direction: 'outgoing' },
    buildQuery: (entityId, caseId) => ({
      query: `MATCH (e:Evidence {id: $entityId})-[r:DISCOVERED_AT]->(l:Location)-[:BELONGS_TO_CASE]->(c:Case {id: $caseId})
               RETURN e, r, l LIMIT 50`,
      params: { entityId, caseId },
    }),
  },
];

export function getTemplate(id: string): QueryTemplate | undefined {
  return templates.find((t) => t.id === id);
}

export interface RelTriple {
  fromId: string;
  relType: string;
  toId: string;
}

export interface Capabilities {
  outgoing: Map<string, Set<string>>; // entityId -> set of relTypes where entity is the source
  incoming: Map<string, Set<string>>; // entityId -> set of relTypes where entity is the target
}

export function buildCapabilities(relationships: RelTriple[]): Capabilities {
  const outgoing = new Map<string, Set<string>>();
  const incoming = new Map<string, Set<string>>();
  for (const rel of relationships) {
    if (!outgoing.has(rel.fromId)) outgoing.set(rel.fromId, new Set());
    outgoing.get(rel.fromId)!.add(rel.relType);
    if (!incoming.has(rel.toId)) incoming.set(rel.toId, new Set());
    incoming.get(rel.toId)!.add(rel.relType);
  }
  return { outgoing, incoming };
}

function entityHasCapability(entityId: string, template: QueryTemplate, caps: Capabilities): boolean {
  if (!template.requires) return true; // starters have no requirement
  const { relTypes, direction } = template.requires;
  const out = caps.outgoing.get(entityId) ?? new Set();
  const inc = caps.incoming.get(entityId) ?? new Set();
  const hasOutgoing = relTypes.some((t) => out.has(t));
  const hasIncoming = relTypes.some((t) => inc.has(t));
  if (direction === 'outgoing') return hasOutgoing;
  if (direction === 'incoming') return hasIncoming;
  return hasOutgoing || hasIncoming; // 'either'
}

export interface OptionCandidate {
  key: string;
  templateId: string;
  entityId: string | null;
  label: string;
}

/**
 * Computes up to 3 next-question options given the current corkboard state,
 * the set of (entity,template) keys already asked, and the case's capability map.
 * Templates whose required relationship doesn't exist for that entity are never offered.
 */
export function getNextOptions(
  graphData: { nodes: any[]; links: any[] },
  askedKeys: Set<string>,
  caps: Capabilities
): OptionCandidate[] {
  if (!graphData.nodes || graphData.nodes.length === 0) {
    return templates
      .filter((t) => t.appliesTo === 'starter')
      .map((t) => ({ key: `starter:${t.id}`, templateId: t.id, entityId: null, label: t.label() }));
  }

  const pool: OptionCandidate[] = [];
  for (const node of graphData.nodes) {
    const group = node.group;
    if (group !== 'Person' && group !== 'Location' && group !== 'Evidence') continue;
    const applicable = templates.filter((t) => t.appliesTo === group);
    for (const t of applicable) {
      const key = `${node.id}:${t.id}`;
      if (askedKeys.has(key)) continue;
      if (!entityHasCapability(node.id, t, caps)) continue; // <-- the actual fix
      pool.push({ key, templateId: t.id, entityId: node.id, label: t.label(node.label || node.name) });
    }
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked: OptionCandidate[] = [];
  const usedEntities = new Set<string>();

  for (const candidate of shuffled) {
    if (picked.length >= 3) break;
    if (candidate.entityId && usedEntities.has(candidate.entityId) && usedEntities.size < shuffled.length) continue;
    picked.push(candidate);
    if (candidate.entityId) usedEntities.add(candidate.entityId);
  }
  for (const candidate of shuffled) {
    if (picked.length >= 3) break;
    if (!picked.includes(candidate)) picked.push(candidate);
  }

  return picked;
}