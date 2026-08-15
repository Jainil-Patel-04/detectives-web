export interface CaseBrief {
  caseNumber: string;
  locationYear: string;
  tags: [string, string, string];
  victimName: string;
  victimDetail: string;
  conditions: string;
  hookQuestion: string;
  timeline: { time: string; text: string }[];
  alibis: Record<string, string>; // personId -> alibi line
}

export const caseBriefs: Record<string, CaseBrief> = {
  case_01: {
    caseNumber: '04-118-M',
    locationYear: 'STERLING ESTATE \u2014 GALA NIGHT',
    tags: ['MASKED GALA', 'BIOMETRIC VAULT', '3-MIN LOOP'],
    victimName: 'Arthur Sterling',
    victimDetail: 'Estate Owner',
    conditions: 'Cameras looped, no witnesses',
    hookQuestion: 'Who really needed that vault open at midnight?',
    timeline: [
      { time: '21:40', text: 'Gala guests begin arriving; the vault sits locked.' },
      { time: '23:45', text: 'Someone with clearance lingers by the vault door.' },
      { time: '00:15', text: 'The frame is found empty. The alarm never sounds.' },
    ],
    alibis: {
      c1_p2: "Says he left before midnight. No one saw him go.",
      c1_p3: "Logged out at 23:40 \u2014 five minutes before the vault opened.",
      c1_p4: "Claims he never left the ballroom. The staff aren't sure.",
    },
  },
  case_02: {
    caseNumber: '09-233-P',
    locationYear: 'GRAND ATRIUM \u2014 KEYNOTE MORNING',
    tags: ['TAINTED ESPRESSO', 'PATENT THEFT', 'OFFSHORE WIRE'],
    victimName: 'Marcus Vance',
    victimDetail: 'CEO',
    conditions: 'Backstage cleared, one server room',
    hookQuestion: 'Who had the nerve to serve a poisoned cup?',
    timeline: [
      { time: '7:30 AM', text: "Vance reviews his keynote notes over espresso." },
      { time: '9:40 AM', text: 'The espresso is delivered backstage, as always.' },
      { time: '9:47 AM', text: 'Vance collapses before reaching the stage.' },
    ],
    alibis: {
      c2_p2: 'Was in her lab, alone, reviewing slides no one else saw.',
      c2_p3: "In the server room the whole time \u2014 for reasons he won't explain.",
      c2_p4: 'Delivered the espresso, then went straight to seating the press.',
    },
  },
  case_03: {
    caseNumber: '98-004-L',
    locationYear: 'BLACKWOOD LIGHTHOUSE \u2014 1998',
    tags: ['RUSTED WATCH', 'SEA FOG', 'OLD FRAUD'],
    victimName: 'Thomas Kane',
    victimDetail: 'Lighthouse Keeper',
    conditions: 'Thick fog, no moon',
    hookQuestion: 'Whose watch was still ticking after all these years?',
    timeline: [
      { time: 'DUSK', text: 'Kane logs a strange entry before the fog rolls in.' },
      { time: 'NIGHT', text: 'The light keeps turning. Kane does not.' },
      { time: '1998\u2013PRESENT', text: 'A pocketwatch surfaces, and the case reopens.' },
    ],
    alibis: {
      c3_p2: 'Says he was at a council dinner. The guest list is thin.',
      c3_p3: 'Was cataloguing archives that night, she says, alone.',
      c3_p4: "Was fishing near Smuggler's Cove \u2014 in weather no one fishes in.",
    },
  },
  case_04: {
    caseNumber: '12-560-B',
    locationYear: 'TOKYO\u2013OSAKA LINE \u2014 TEST RUN',
    tags: ['SEVERED FIBER', 'LOCKED CABIN', 'MASTER KEYCARD'],
    victimName: 'Kenji Sato',
    victimDetail: 'Lead Engineer',
    conditions: 'Tunnel dark, radios dead',
    hookQuestion: 'Who was in the engine room when the line went dark?',
    timeline: [
      { time: '2:00 PM', text: 'The train enters the mountain tunnel on schedule.' },
      { time: '2:11 PM', text: 'The fiber line goes dark without warning.' },
      { time: '2:13 PM', text: 'The train stops. The engine room door is locked from inside.' },
    ],
    alibis: {
      c4_p2: "In the control cabin, on schedule, until she wasn't.",
      c4_p3: 'In the dining car the entire time \u2014 three witnesses confirm it.',
      c4_p4: 'Says he was doing rounds. His badge log tells a different story.',
    },
  },
  case_05: {
    caseNumber: '20-777-C',
    locationYear: 'THE COUNT ROOM \u2014 2:00 AM',
    tags: ['CLONED RFID', 'NO ALARM', 'BLIND CAMERAS'],
    victimName: 'Vincent Moretti',
    victimDetail: 'Casino Owner',
    conditions: 'Cameras blind, vault silent',
    hookQuestion: 'Who taught the cameras to see nothing at all?',
    timeline: [
      { time: '1:40 AM', text: 'The pit floor runs as normal; nothing seems wrong.' },
      { time: '2:00 AM', text: 'The Count Room locks disengage without an alarm.' },
      { time: '2:05 AM', text: 'The vault is empty. No footage shows how.' },
    ],
    alibis: {
      c5_p2: 'On the floor the whole shift \u2014 except for one gap in the log.',
      c5_p3: 'At the high-limit table, chips in hand, eyes on the vault.',
      c5_p4: "In the surveillance hub, 'running diagnostics.'",
    },
  },
  case_06: {
    caseNumber: '15-309-S',
    locationYear: 'RESEARCH VESSEL \u2014 3,000M DEPTH',
    tags: ['ALTERED LOGS', 'SEALED HULL', 'VALVE OVERRIDE'],
    victimName: 'Dr. Aris Thorne',
    victimDetail: 'Chief Scientist',
    conditions: 'Oxygen falling, nowhere to run',
    hookQuestion: 'Who could reach that valve without anyone noticing?',
    timeline: [
      { time: '2:50 AM', text: 'Life support logs begin drifting from their baseline.' },
      { time: '3:15 AM', text: 'The manual oxygen valve is overridden.' },
      { time: '3:30 AM', text: 'Thorne is found in the Bio-Lab, too late.' },
    ],
    alibis: {
      c6_p2: "Pacing the bridge \u2014 no one thought to question why.",
      c6_p3: 'In the Bio-Lab earlier that day. Says she left hours before.',
      c6_p4: 'On duty in the oxygen bay, same as every night shift.',
    },
  },
  case_07: {
    caseNumber: '07-441-O',
    locationYear: 'GRAND PALAIS OPERA \u2014 OPENING NIGHT',
    tags: ['FRAYED ROPE', 'THREAT NOTE', 'CATWALK ACCESS'],
    victimName: 'Isabella Vane',
    victimDetail: 'Lead Soprano',
    conditions: 'Rigging inspected that morning',
    hookQuestion: 'Who was standing on the catwalk at 19:45?',
    timeline: [
      { time: '19:30', text: 'The rigging is inspected ahead of opening night.' },
      { time: '19:45', text: 'Someone lingers on the catwalk, unseen.' },
      { time: '20:10', text: 'The sandbag falls mid-aria.' },
    ],
    alibis: {
      c7_p2: 'In her dressing room, rehearsing lines she already knew.',
      c7_p3: 'Backstage, shouting at everyone but the rigging crew.',
      c7_p4: 'Says he was checking knots on the far catwalk. Alone.',
    },
  },
  case_08: {
    caseNumber: '11-062-A',
    locationYear: 'VON BERG RESORT \u2014 AVALANCHE MORNING',
    tags: ['BLUNT TRAUMA', 'DETONATOR', 'SKI PASS SCAN'],
    victimName: 'Klaus Von Berg',
    victimDetail: 'Resort Owner',
    conditions: 'Snow incoming, charges already set',
    hookQuestion: 'Who made sure the mountain would take the blame?',
    timeline: [
      { time: '6:50 AM', text: 'Ski passes scan through the peak chalet gate.' },
      { time: '7:10 AM', text: 'Klaus is struck before the charges ever detonate.' },
      { time: '7:15 AM', text: "The avalanche comes down over what's already done." },
    ],
    alibis: {
      c8_p2: "In the lift engine room \u2014 'checking the cables,' she says.",
      c8_p3: 'Skiing a closed run. No good reason given.',
      c8_p4: 'At the charge site, detonator in hand, right on schedule.',
    },
  },
  case_09: {
    caseNumber: '03-198-G',
    locationYear: 'THORNE CONSERVATORY \u2014 MIDNIGHT',
    tags: ["DEVIL'S SNARE", 'LOCKED GREENHOUSE', 'BLACK MARKET SALE'],
    victimName: 'Dr. Gabriel Thorne',
    victimDetail: 'Master Botanist',
    conditions: 'Humid, door locked from inside',
    hookQuestion: 'Who was trusted enough to be let inside?',
    timeline: [
      { time: '11:20 AM', text: 'The conservatory door is locked as always, from inside.' },
      { time: '11:45 AM', text: "A Devil's Snare stem is cut in the prep room." },
      { time: '11:52 AM', text: 'Thorne is found among his own specimens.' },
    ],
    alibis: {
      c9_p2: 'In the chemical prep room \u2014 official business, she claims.',
      c9_p3: 'Signing paperwork in the private library, ink still wet.',
      c9_p4: 'Says he was lost looking for the restroom. In the library.',
    },
  },
  case_10: {
    caseNumber: '22-905-K',
    locationYear: 'PARIS CATACOMBS \u2014 SECTOR UNCHARTED',
    tags: ['BROKEN GPS', 'FLOODED TUNNEL', 'TEMPLAR REPLICA'],
    victimName: 'Prof. Jean-Luc Picard',
    victimDetail: 'Archaeologist',
    conditions: 'No signal, GPS cracked',
    hookQuestion: 'Who was waiting for him in the dark?',
    timeline: [
      { time: '21:50', text: 'Picard descends alone to map the uncharted section.' },
      { time: '22:30', text: 'A GPS tracker breaks in Flooded Tunnel B.' },
      { time: 'MIDNIGHT', text: 'He never resurfaces.' },
    ],
    alibis: {
      c10_p2: 'Says she got separated in the Chamber of Bones.',
      c10_p3: 'Claims he left the tunnels hours before Picard did.',
      c10_p4: 'Redrawing blueprints topside \u2014 for reasons unrelated, he insists.',
    },
  },
};

export function getCaseBrief(caseId: string): CaseBrief | null {
  return caseBriefs[caseId] ?? null;
}