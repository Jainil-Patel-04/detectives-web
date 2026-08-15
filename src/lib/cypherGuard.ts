const FORBIDDEN = /\b(CREATE|MERGE|DELETE|SET|REMOVE|DROP|DETACH|CALL)\b/i;

export function assertReadOnly(cypher: string) {
  if (FORBIDDEN.test(cypher)) {
    throw new Error('Generated query contains a write or procedure-call operation — rejected.');
  }
}