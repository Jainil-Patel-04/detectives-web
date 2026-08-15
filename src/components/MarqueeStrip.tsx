const tickerCases = [
  { number: '04-118-M', title: 'THE MIDNIGHT PORTRAIT' },
  { number: '09-233-P', title: 'POISON AT THE SUMMIT' },
  { number: '98-004-L', title: 'THE LIGHTHOUSE DISAPPEARANCE' },
  { number: '12-560-B', title: 'THE BULLET TRAIN SABOTAGE' },
  { number: '20-777-C', title: 'THE CASINO CIPHER' },
  { number: '15-309-S', title: 'THE SUBMARINE SILENCE' },
  { number: '07-441-O', title: 'THE OPERA DROP' },
  { number: '11-062-A', title: 'THE ALPINE AVALANCHE' },
  { number: '03-198-G', title: "THE BOTANIST'S VENOM" },
  { number: '22-905-K', title: 'THE CIPHER OF THE CATACOMBS' },
];

export default function MarqueeStrip() {
  const items = [...tickerCases, ...tickerCases]; // duplicated for seamless looping

  return (
    <div
      className="relative overflow-hidden whitespace-nowrap border-b py-2"
      style={{ backgroundColor: '#0a0705', borderColor: '#2a2018' }}
    >
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="inline-flex" style={{ animation: 'marqueeScroll 45s linear infinite' }}>
        {items.map((c, i) => (
          <span
            key={i}
            className="inline-flex items-center text-[11px] tracking-widest font-mono px-6"
            style={{ color: '#c9b896' }}
          >
            <span className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: '#c0392b' }} />
            NO. {c.number} &mdash; {c.title} &mdash; UNSOLVED
          </span>
        ))}
      </div>
    </div>
  );
}