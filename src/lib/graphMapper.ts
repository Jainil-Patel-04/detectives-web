import type { Record as Neo4jRecord } from 'neo4j-driver';

export function recordsToGraph(records: Neo4jRecord[]) {
  const nodesMap = new Map<string, any>();
  const linksMap = new Map<string, any>();
  const identityToId = new Map<string, string>(); // internal neo4j id -> your custom id

  // Pass 1: collect all nodes first, so relationships can resolve their endpoints
  records.forEach((record) => {
    record.keys.forEach((key) => {
      const value = record.get(key as string);
      const isNode = value && value.labels && value.identity !== undefined && !value.type;
      if (isNode) {
        const internalId = value.identity.toString();
        const customId = value.properties.id || internalId;
        identityToId.set(internalId, customId);
        if (!nodesMap.has(customId)) {
          nodesMap.set(customId, {
            id: customId,
            label: value.properties.name || value.properties.title || customId,
            group: value.labels[0],
            ...value.properties,
          });
        }
      }
    });
  });

  // Pass 2: collect relationships, now that identity -> custom id is known
  records.forEach((record) => {
    record.keys.forEach((key) => {
      const value = record.get(key as string);
      const isRelationship = value && value.type && value.start !== undefined && value.end !== undefined;
      if (isRelationship) {
        const sourceId = identityToId.get(value.start.toString());
        const targetId = identityToId.get(value.end.toString());
        if (sourceId && targetId) {
          const linkId = `${sourceId}-${value.type}-${targetId}`;
          if (!linksMap.has(linkId)) {
            linksMap.set(linkId, {
              source: sourceId,
              target: targetId,
              label: value.type,
              ...value.properties,
            });
          }
        }
      }
    });
  });

  return {
    nodes: Array.from(nodesMap.values()),
    links: Array.from(linksMap.values()),
  };
}