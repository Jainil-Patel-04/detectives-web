// src/lib/caseIntros.ts
// NOTE: only the premise/hook goes here — never the "Hidden Truth" solution.
// This file is user-facing content, so it must stay spoiler-free.

export interface CaseIntro {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  atmosphericText: string;
  timeLabel: string;
}

export const caseIntros: Record<string, CaseIntro> = {
  case_01: {
    eyebrow: 'THE CAMERAS LOOPED FOR THREE MINUTES',
    titleLine1: 'The Midnight',
    titleLine2: 'Portrait',
    atmosphericText:
      'A $10 million masterpiece, cut precisely from its frame inside a biometric vault. The security footage shows nothing but an empty room, looping in a perfect three-minute gap. Arthur Sterling wants answers before his guests find out.',
    timeLabel: '12:15 AM',
  },
  case_02: {
    eyebrow: 'THE KEYNOTE NEVER STARTED',
    titleLine1: 'Poison at',
    titleLine2: 'the Summit',
    atmosphericText:
      'Marcus Vance is found dead in the VIP Green Room, minutes before he was due on stage. The autopsy points to a fast-acting toxin in his morning espresso. Everyone in this building had a reason to want him gone — the question is who had the nerve.',
    timeLabel: 'MOMENTS BEFORE THE KEYNOTE',
  },
  case_03: {
    eyebrow: 'THE LIGHT NEVER WENT OUT',
    titleLine1: 'The Lighthouse',
    titleLine2: 'Disappearance',
    atmosphericText:
      '1998. Keeper Thomas Kane vanishes into the fog, leaving a half-eaten meal and a cryptic logbook entry. Ruled a tragic drowning for over two decades — until a rusted pocketwatch washes ashore and reopens the coldest case this town has ever buried.',
    timeLabel: 'DUSK, 1998',
  },
  case_04: {
    eyebrow: 'THE DOORS LOCKED FROM INSIDE',
    titleLine1: 'The Bullet Train',
    titleLine2: 'Sabotage',
    atmosphericText:
      'A prototype bullet train grinds to a halt inside a mountain tunnel. Lead Engineer Kenji Sato is found dead in the restricted engine room, the fiber optic cables deliberately severed. A true locked-room mystery — the killer never left the train.',
    timeLabel: 'INSIDE THE TUNNEL',
  },
  case_05: {
    eyebrow: 'NOT A SINGLE ALARM TRIPPED',
    titleLine1: 'The Casino',
    titleLine2: 'Cipher',
    atmosphericText:
      'Five million dollars vanishes from the Count Room without a forced door or a tripped alarm. The security footage shows nothing unusual. Somewhere between the pit and the surveillance hub, someone rewrote the house\u2019s own rules against it.',
    timeLabel: '2:00 AM',
  },
  case_06: {
    eyebrow: 'THE OXYGEN LOGS WERE ALTERED',
    titleLine1: 'The Submarine',
    titleLine2: 'Silence',
    atmosphericText:
      'Three thousand meters down, Chief Scientist Dr. Aris Thorne is found dead in the Bio-Lab. The life support logs have been digitally altered. The crew is small, the tube is sealed, and the killer is trapped down here with everyone else.',
    timeLabel: '3,000M DEPTH',
  },
  case_07: {
    eyebrow: 'OPENING NIGHT ENDED IN TRAGEDY',
    titleLine1: 'The Opera',
    titleLine2: 'Drop',
    atmosphericText:
      'Lead soprano Isabella Vane is struck mid-aria by a sandbag that should never have fallen. A threatening note surfaces in her dressing room. The catwalk crew, the understudy, and the stage manager all had a reason to want her off that stage.',
    timeLabel: 'OPENING NIGHT',
  },
  case_08: {
    eyebrow: 'HE DIED BEFORE THE SNOW EVER HIT HIM',
    titleLine1: 'The Alpine',
    titleLine2: 'Avalanche',
    atmosphericText:
      'Resort owner Klaus Von Berg is recovered from a controlled avalanche — but the autopsy tells a different story. Blunt force trauma, delivered before the snow ever reached him. Someone made sure the mountain would take the blame.',
    timeLabel: 'AVALANCHE MORNING',
  },
  case_09: {
    eyebrow: 'THE GREENHOUSE WAS LOCKED FROM INSIDE',
    titleLine1: "The Botanist's",
    titleLine2: 'Venom',
    atmosphericText:
      'Master Botanist Dr. Gabriel Thorne is found on the floor of his own conservatory, veins blackened, a crushed Devil\u2019s Snare stem beside him. The door was never forced. Whatever happened here, it happened with someone he trusted.',
    timeLabel: '11:45 AM',
  },
  case_10: {
    eyebrow: 'HE NEVER RESURFACED',
    titleLine1: 'The Cipher of',
    titleLine2: 'the Catacombs',
    atmosphericText:
      'Archaeologist Prof. Jean-Luc Picard vanishes deep beneath the streets of Paris while mapping an uncharted tunnel. A cracked GPS tracker, a tampered blueprint, and a black-market relic replica are all that\u2019s left behind in the dark.',
    timeLabel: '10:30 PM',
  },
};

export function getCaseIntro(caseId: string): CaseIntro | null {
  return caseIntros[caseId] ?? null;
}