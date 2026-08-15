export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Break the seal',
      text: 'Open a file and the copilot lays out the scene: the body, the hour, the people who were close enough to do it.',
    },
    {
      number: '02',
      title: 'Question everything',
      text: 'Ask in plain language, or choose a lead. The copilot answers in narrative \u2014 dialogue, testimony, contradictions you asked for.',
    },
    {
      number: '03',
      title: 'Watch the web form',
      text: 'Each answer pins a node and pulls a thread. Suspects, motives, and evidence knot together beside you in real time.',
    },
  ];

  return (
    <div className="relative px-6 py-20 overflow-hidden">
      {/* real photo background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/evidence-board.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* dark overlay for readability */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,6,4,0.82)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold leading-tight mb-14"
          style={{ fontFamily: "'Playfair Display', serif", color: '#f4ede0' }}
        >
          You don&apos;t read the case.{' '}
          <span className="italic" style={{ color: '#c0392b' }}>
            You interrogate it.
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border" style={{ borderColor: '#2a2018' }}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="p-8"
              style={{
                borderRight: i < steps.length - 1 ? '1px solid #2a2018' : undefined,
                backgroundColor: i === 1 ? 'rgba(22,15,10,0.6)' : 'transparent',
              }}
            >
              <p
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: '#8b2020' }}
              >
                {step.number}
              </p>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#f4ede0' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-70" style={{ color: '#c9b896' }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}