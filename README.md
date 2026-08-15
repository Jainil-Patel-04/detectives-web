# The Detective's Web

An interactive, anthology-style Graph RAG murder-mystery game. Pick a cold case, interrogate an AI copilot, and watch the hidden connections between suspects, evidence, and locations wire themselves together on a live investigation graph — until you're ready to name a killer.

**[Live Demo](https://detectives-web.vercel.app/)** &middot; 10 cases &middot; built entirely on free-tier infrastructure

---

## How it works

1. Pick a case from the archive. Each one opens with a themed case brief — the victim, the suspects, the conditions, a timeline of that night.
2. Begin the investigation. Ask a guided question (or type your own) and the AI copilot translates it into a graph query behind the scenes.
3. Watch the corkboard fill in. Every answer pins new nodes — suspects, evidence, locations — and draws the connections between them in real time.
4. When you're confident, make your accusation. Name one suspect or several; the graph checks your theory against the truth and reveals what actually happened.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend & API | Next.js (App Router), TypeScript, Tailwind CSS |
| Graph visualization | react-force-graph-2d (HTML5 Canvas) |
| Graph database | Neo4j AuraDB (Free Tier) |
| AI copilot | Google Gemini API (`gemini-3.5-flash-lite`) |
| Hosting | Vercel (Free Tier) |

Every piece of this stack runs on a permanently free tier — no paid infrastructure required to run or extend this project.

## Architecture

Two question paths feed the same investigation graph:

- **Guided questions** — a curated set of question templates, filtered live against each case's actual graph data so a player is never offered a question with zero possible answers. These map directly to pre-built, parameterized Cypher queries — no AI-generated query involved, so they're fast and always reliable.
- **Free-text questions** — a player can also type their own question. Gemini translates it into a Cypher query (schema-constrained, read-only, validated before execution), which runs against Neo4j. The results are then narrated back by a second Gemini call in atmospheric, noir-style prose.

Both paths return the same shape of data, which gets merged into the corkboard's live graph state and rendered as pinned, portrait-style nodes connected by curved string lines.

## Getting started

### Prerequisites

- Node.js 18+
- A free [Neo4j AuraDB](https://console.neo4j.io) instance
- A free [Google AI Studio](https://aistudio.google.com/apikey) API key

### Setup

```bash
git clone https://github.com/Jainil-Patel-04/detectives-web.git
cd detectives-web
npm install
```

Create a `.env.local` file in the project root:

```
NEO4J_URI=neo4j+s://your-instance.databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password
GEMINI_API_KEY=your-gemini-key
```

Load the case data into your Neo4j instance via the Aura Query browser (see `/neo4j-import` for the seed scripts, if included), then run:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
src/
  app/
    page.tsx                        # Landing page — case archive grid
    case/[caseId]/intro/page.tsx    # Case brief — victim, suspects, timeline
    case/[caseId]/page.tsx          # Investigation room — corkboard + copilot
    api/
      cases/[caseId]/
        suspects/route.ts
        evidence/route.ts
        capabilities/route.ts       # Powers guided-question filtering
        guided-query/route.ts       # Template-based Cypher execution
        accuse/route.ts             # Server-side accusation verdict
      query/route.ts                # Free-text Gemini → Cypher → Neo4j pipeline
  components/
    Corkboard.tsx                   # Canvas-based graph visualization
    CaseFile.tsx                    # Chat log + guided question buttons
    AccusationModal.tsx
    SpotlightHero.tsx / HowItWorks.tsx / MarqueeStrip.tsx
  lib/
    themes.ts                       # Per-case color palettes & ambient effects
    caseIntros.ts / caseBriefs.ts   # Narrative content per case
    solutions.ts                    # Spoiler content, shown only on a correct accusation
    questionTemplates.ts            # Guided-question template + capability system
    gemini.ts / neo4j.ts / graphMapper.ts
```

## The ten cases

| Case | Difficulty |
|---|---|
| The Midnight Portrait | Beginner |
| Poison at the Summit | Intermediate |
| The Lighthouse Disappearance | Hard |
| The Bullet Train Sabotage | Intermediate |
| The Casino Cipher | Hard |
| The Submarine Silence | Expert |
| The Opera Drop | Beginner |
| The Alpine Avalanche | Intermediate |
| The Botanist's Venom | Intermediate |
| The Cipher of the Catacombs | Expert |

## License

MIT
