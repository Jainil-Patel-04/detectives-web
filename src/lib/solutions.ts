// src/lib/solutions.ts
// SPOILER CONTENT — only ever shown after a fully correct accusation.

export const solutions: Record<string, string> = {
  case_01:
    "A three-person conspiracy. Clara Reed used her biometric clearance to enter the vault at 23:45 and sent the encrypted email that set the plan in motion. Julian Rossi cut the painting from its frame, leaving a burned cigar behind. Elias Vance was the getaway driver, waiting in the unmonitored alleyway at 00:10.",
  case_02:
    "Dr. Elena Rostova masterminded the assassination after Marcus Vance stole the patent rights to her research. She used Sarah Jenkins \u2014 the only person authorized to bring him food \u2014 to serve the tainted espresso. David Chen was guilty of embezzlement, but not murder.",
  case_03:
    "Mayor Robert Bell murdered Thomas Kane in 1998 to bury a land deal fraud Kane had uncovered. The rusted pocketwatch that washed ashore traces directly back to the Mayor, placing him at the lighthouse the night Kane vanished.",
  case_04:
    "Yuki Hayashi acted alone, driven by being passed over for promotion. He owned the master keycard found at the scene and was timestamped in the engine room at the exact moment the fiber cable was severed. Viktor Petrov's threatening note was a red herring \u2014 he was stuck in the dining car the whole time.",
  case_05:
    "An inside job requiring both motive and means. Leo Cruz programmed a cloned RFID tag from the surveillance hub at 2:00 AM. Maya Lin used that tag to bypass the Count Room locks and handled the empty deposit bags herself.",
  case_06:
    "A mutiny of two. Nadia Volkov had the motive \u2014 Thorne had discovered her faked research \u2014 and owned the rare chemical compound found in the lab, but lacked the technical skill to act alone. She coerced Chief Petty Officer Miller into manually overriding the oxygen valve at 3:15 AM.",
  case_07:
    "Murder for hire. Lucia Gomez left the threatening note and supplied the financial motive, but never touched the rigging. Henri Dupont was physically on the catwalk at 19:45, and his missing pocketknife was used to cut the frayed hemp rope.",
  case_08:
    "A lethal setup. Greta Von Berg is tied to the life insurance motive and was in the ski lift engine room, cutting off Klaus's escape route. Otto Meyer physically triggered the explosives \u2014 the detonator remote traces directly to him in the blast zone. Lars Lindstrom was simply skiing where he shouldn't have been.",
  case_09:
    "A solo act of revenge. Chloe Vance is the sole killer, directly linked to extracting the Devil's Snare stem in the sterile chemical prep room at 11:45 AM. Oliver Sterling was occupied signing the illegal plant sale, and Dr. Oak was only snooping in the library.",
  case_10:
    "Dominic Thorne is the killer, driven by Picard's refusal to sell him a priceless relic. He was timestamped at Flooded Tunnel B at 22:30 \u2014 exactly where the GPS tracker was broken and where he dropped his signature Templar coin replica. Antoine Dubois was modifying blueprints for unrelated smuggling, and Isabelle Moreau had genuinely gotten separated from Picard.",
};

export function getSolution(caseId: string): string | null {
  return solutions[caseId] ?? null;
}