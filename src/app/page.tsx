import { getDriver } from '@/lib/neo4j';
import { getTheme } from '@/lib/themes';
import { getCaseBrief } from '@/lib/caseBriefs';
import { getCaseIntro } from '@/lib/caseIntros';
import Link from 'next/link';
import SpotlightHero from '@/components/SpotlightHero';
import HowItWorks from '@/components/HowItWorks';
import MarqueeStrip from '@/components/MarqueeStrip';

async function getCases() {
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
    return result.records.map((r) => ({
      id: r.get('id'),
      title: r.get('title'),
      difficulty: r.get('difficulty'),
      suspectCount: r.get('suspectCount').toNumber(),
      clueCount: r.get('clueCount').toNumber(),
    }));
  } finally {
    await session.close();
  }
}

export default async function HomePage() {
  const cases = await getCases();

  return (
    <main style={{ backgroundColor: '#0a0705' }}>
    <SpotlightHero />
    <div className="sticky top-0 z-40">
    <MarqueeStrip />
    </div>
      <HowItWorks />
      <div
        id="case-room"
        style={{
          background: 'radial-gradient(ellipse at 20% 0%, #3a2a12 0%, #120d08 55%, #0a0705 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
            <h1
              className="text-5xl md:text-6xl font-bold text-[#f4ede0]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Pick your body.
            </h1>
            <p className="text-xs text-[#c9b896] opacity-70 max-w-xs text-right leading-relaxed">
              TEN SEALED DOSSIERS. DIFFICULTY IS MEASURED IN HOW MANY LIES YOU MUST UNTANGLE
              BEFORE THE GRAPH CLOSES.
            </p>
          </div>
          <div className="h-px w-full bg-[#c9b896]/20 mt-8 mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {cases.map((c) => {
              const theme = getTheme(c.id);
              const brief = getCaseBrief(c.id);
              const intro = getCaseIntro(c.id);
              return (
                <Link key={c.id} href={`/case/${c.id}/intro`} className="group">
                  <div
                    className="relative rounded-sm p-5 h-full flex flex-col shadow-xl transition-transform duration-200 group-hover:-translate-y-1"
                    style={{ backgroundColor: '#f2e9d8', color: '#241c14' }}
                  >
                    {/* pin dot */}
                    <div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-md"
                      style={{ backgroundColor: theme.accent }}
                    />

                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] tracking-widest opacity-50 font-mono">
                        CASE NO. {brief?.caseNumber ?? '??-???-?'}
                      </span>
                      <span
                        className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border font-semibold"
                        style={{ borderColor: theme.accent, color: theme.accent }}
                      >
                        {c.difficulty}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {c.title}
                    </h2>
                    <p className="text-[10px] tracking-wider uppercase opacity-50 mb-3">
                      {brief?.locationYear ?? ''}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(brief?.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full border opacity-70"
                          style={{ borderColor: '#241c1440' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm opacity-75 leading-relaxed mb-4 flex-1">
                      {intro?.atmosphericText.slice(0, 110)}
                      {intro && intro.atmosphericText.length > 110 ? '\u2026' : ''}
                    </p>

                    {/* redacted-style decorative bars */}
                    <div className="space-y-1 mb-4">
                      <div className="h-2 rounded" style={{ backgroundColor: '#241c1425', width: '85%' }} />
                      <div className="h-2 rounded" style={{ backgroundColor: '#241c1418', width: '55%' }} />
                    </div>

                    <div
                      className="flex items-center justify-between text-[11px] opacity-60 pt-3 border-t"
                      style={{ borderColor: '#241c1420' }}
                    >
                      <span>
                        {c.suspectCount} suspects &middot; {c.clueCount} clues
                      </span>
                      <span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: theme.accent }}
                      >
                        OPEN &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}