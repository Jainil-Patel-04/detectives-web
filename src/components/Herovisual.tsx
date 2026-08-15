export type HeroType =
  | "moon"
  | "mountain"
  | "lighthouse"
  | "train"
  | "skyline"
  | "roulette"
  | "submarine"
  | "curtain"
  | "greenhouse"
  | "tunnel"
  | "none";

export default function HeroVisual({ type }: { type: HeroType }) {
  if (type === "moon") {
    return (
      <div className="absolute top-10 right-10 md:right-24 pointer-events-none select-none">
        <svg width="360" height="360" viewBox="0 0 360 360">
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f4f1e8" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#e8e2d0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e8e2d0" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="moonBody" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fdfbf5" />
              <stop offset="100%" stopColor="#d8d2c0" />
            </radialGradient>
          </defs>
          <circle cx="180" cy="180" r="180" fill="url(#moonGlow)" />
          <circle cx="180" cy="180" r="95" fill="url(#moonBody)" />
          <circle cx="150" cy="145" r="12" fill="#c9c2ac" opacity="0.5" />
          <circle cx="205" cy="120" r="7" fill="#c9c2ac" opacity="0.4" />
          <circle cx="145" cy="215" r="9" fill="#c9c2ac" opacity="0.45" />
          <circle cx="215" cy="200" r="16" fill="#c9c2ac" opacity="0.4" />
          <circle cx="190" cy="165" r="5" fill="#c9c2ac" opacity="0.35" />
        </svg>
      </div>
    );
  }

  if (type === "mountain") {
    return (
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none opacity-90">
        <svg
          width="100%"
          height="320"
          viewBox="0 0 1200 320"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="mtnBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a4a5c" />
              <stop offset="100%" stopColor="#1e2a36" />
            </linearGradient>
            <linearGradient id="mtnFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8eef2" />
              <stop offset="100%" stopColor="#c5d2da" />
            </linearGradient>
            <radialGradient id="moonPale" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#eef3f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eef3f6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="980" cy="70" r="120" fill="url(#moonPale)" />
          <circle cx="980" cy="70" r="45" fill="#f4f7f9" opacity="0.9" />
          <path
            d="M0,320 L0,180 L150,90 L280,170 L420,60 L600,190 L750,100 L900,200 L1050,80 L1200,190 L1200,320 Z"
            fill="url(#mtnBack)"
            opacity="0.6"
          />
          <path
            d="M0,320 L0,240 L120,140 L220,220 L380,110 L520,230 L680,150 L820,240 L960,130 L1100,220 L1200,170 L1200,320 Z"
            fill="url(#mtnFront)"
          />
          <path d="M380,110 L410,140 L350,140 Z" fill="#ffffff" opacity="0.9" />
          <path d="M120,140 L150,170 L90,170 Z" fill="#ffffff" opacity="0.9" />
          <path d="M960,130 L990,160 L930,160 Z" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
    );
  }

  if (type === "lighthouse") {
    return (
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <style>{`
          @keyframes beamSweep { 0%{transform:rotate(-35deg)} 50%{transform:rotate(15deg)} 100%{transform:rotate(-35deg)} }
          @keyframes boatSail { 0%{transform:translateX(-40px)} 100%{transform:translateX(calc(100vw + 40px))} }
          @keyframes waveShimmer { 0%,100%{opacity:0.25} 50%{opacity:0.45} }
        `}</style>
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: "30%",
            background: "linear-gradient(180deg, #0f2933 0%, #0a1c22 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: "30%" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute left-0 w-full"
              style={{
                bottom: `${8 + i * 18}px`,
                height: "1px",
                background: "#7fb3ab",
                opacity: 0.3,
                animation: `waveShimmer ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
        <div
          className="absolute"
          style={{ bottom: "12%", animation: "boatSail 22s linear infinite" }}
        >
          <svg width="60" height="30" viewBox="0 0 60 30">
            <polygon points="5,24 55,24 46,15 14,15" fill="#0a1418" />
            <line
              x1="30"
              y1="15"
              x2="30"
              y2="2"
              stroke="#0a1418"
              strokeWidth="1.5"
            />
            <polygon points="30,3 30,13 42,13" fill="#0a1418" opacity="0.85" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-10 md:right-24">
          <svg width="220" height="380" viewBox="0 0 220 380">
            <g
              style={{
                transformOrigin: "110px 77px",
                animation: "beamSweep 6s ease-in-out infinite",
              }}
            >
              <defs>
                <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f4e9c9" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#f4e9c9" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="110,77 320,20 320,140" fill="url(#beam)" />
            </g>
            <polygon points="80,340 140,340 130,90 90,90" fill="#d9d2c4" />
            <polygon
              points="86,270 134,270 131,240 89,240"
              fill="#8b2020"
              opacity="0.85"
            />
            <polygon
              points="91,180 129,180 127,150 93,150"
              fill="#8b2020"
              opacity="0.85"
            />
            <rect x="85" y="60" width="50" height="35" rx="2" fill="#3a2f28" />
            <circle cx="110" cy="77" r="10" fill="#f4e9c9" opacity="0.9" />
            <polygon points="80,60 140,60 110,35" fill="#2a221c" />
            <ellipse
              cx="110"
              cy="345"
              rx="70"
              ry="14"
              fill="#1a1d22"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (type === "train") {
    const windows = Array.from({ length: 6 });
    return (
      <div className="absolute bottom-16 left-0 w-full h-40 pointer-events-none select-none overflow-hidden">
        <style>{`
          @keyframes trainRun { 0%{transform:translateX(110vw)} 100%{transform:translateX(-520px)} }
          @keyframes flicker { 0%,100%{opacity:0.9} 48%{opacity:0.9} 50%{opacity:0.3} 52%{opacity:0.9} }
        `}</style>
        <div
          className="absolute bottom-0 left-0 w-full h-1"
          style={{ background: "rgba(200,200,200,0.15)" }}
        />
        <div style={{ animation: "trainRun 9s linear infinite" }}>
          <svg width="520" height="130" viewBox="0 0 520 130">
            <rect x="0" y="30" width="520" height="70" rx="18" fill="#1c1f24" />
            <rect x="0" y="90" width="520" height="14" fill="#0c0e10" />
            <path d="M0,30 Q-20,65 0,100 L20,100 L20,30 Z" fill="#1c1f24" />
            {windows.map((_, i) => {
              const x = 45 + i * 78;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={44}
                    width="54"
                    height="34"
                    rx="4"
                    fill="#f4e9c9"
                    opacity="0.15"
                  />
                  <rect
                    x={x}
                    y={44}
                    width="54"
                    height="34"
                    rx="4"
                    fill="none"
                    stroke="#3a3f46"
                    strokeWidth="2"
                  />
                  {i % 2 === 0 && (
                    <g
                      style={{
                        animation: `flicker ${4 + i}s ease-in-out infinite`,
                      }}
                    >
                      <circle
                        cx={x + 27}
                        cy={57}
                        r="7"
                        fill="#0c0e10"
                        opacity="0.75"
                      />
                      <path
                        d={`M${x + 15},80 Q${x + 27},64 ${x + 39},80 Z`}
                        fill="#0c0e10"
                        opacity="0.75"
                      />
                    </g>
                  )}
                </g>
              );
            })}
            {[40, 160, 280, 400].map((cx) => (
              <circle key={cx} cx={cx} cy="104" r="8" fill="#0c0e10" />
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (type === "skyline") {
    const buildings = [
      { x: 0, w: 60, h: 140 },
      { x: 65, w: 40, h: 200 },
      { x: 110, w: 70, h: 100 },
      { x: 185, w: 45, h: 240 },
      { x: 235, w: 55, h: 160 },
      { x: 295, w: 50, h: 280 },
      { x: 350, w: 65, h: 120 },
      { x: 420, w: 40, h: 190 },
    ];
    return (
      <div className="absolute bottom-0 left-0 w-full h-72 pointer-events-none select-none overflow-hidden">
        <style>{`
          @keyframes windowFlicker { 0%,85%,100%{opacity:0.8} 90%{opacity:0.1} 95%{opacity:0.8} }
          @keyframes alertPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
          @keyframes steamRise { 0%{transform:translateY(0) scaleX(1); opacity:0.6} 100%{transform:translateY(-40px) scaleX(1.6); opacity:0} }
        `}</style>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 480 280"
          preserveAspectRatio="xMidYMax slice"
        >
          {buildings.map((b, i) => (
            <g key={i}>
              <rect
                x={b.x}
                y={280 - b.h}
                width={b.w}
                height={b.h}
                fill="#0f1419"
              />
              {Array.from({ length: Math.floor(b.h / 22) }).map((_, r) =>
                Array.from({ length: Math.floor(b.w / 16) }).map((_, c) => {
                  const isDeadWindow = i === 3 && r === 2 && c === 1; // the CEO's office, permanently dark
                  const seed = (i * 7 + r * 3 + c) % 5;
                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={b.x + 6 + c * 16}
                      y={280 - b.h + 8 + r * 22}
                      width="8"
                      height="10"
                      fill={isDeadWindow ? "#1a0a0a" : "#e8c565"}
                      opacity={isDeadWindow ? 1 : 0.75}
                      style={
                        !isDeadWindow && seed === 0
                          ? {
                              animation: `windowFlicker ${6 + seed}s ease-in-out infinite`,
                              animationDelay: `${seed}s`,
                            }
                          : undefined
                      }
                    />
                  );
                }),
              )}
            </g>
          ))}
          {/* red alert dot over the dead window's building */}
          <circle
            cx="215"
            cy="90"
            r="4"
            fill="#dc2626"
            style={{ animation: "alertPulse 1.4s ease-in-out infinite" }}
          />
        </svg>
        {/* espresso cup with rising steam, foreground */}
        <div className="absolute" style={{ bottom: "14px", left: "40px" }}>
          <svg width="30" height="26" viewBox="0 0 30 26">
            <rect x="4" y="10" width="18" height="14" rx="2" fill="#2a221c" />
            <path
              d="M22,13 q7,0 7,6 q0,6 -7,6"
              fill="none"
              stroke="#2a221c"
              strokeWidth="2"
            />
          </svg>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${8 + i * 5}px`,
                bottom: "26px",
                width: "2px",
                height: "10px",
                background: "#e8c565",
                opacity: 0.5,
                animation: `steamRise ${2.5 + i * 0.4}s ease-out infinite`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "roulette") {
    return (
      <div className="absolute top-90 right-10 md:right-24 pointer-events-none select-none">
        <style>{`
          @keyframes wheelSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
          @keyframes ballOrbit { 0%{transform:rotate(0deg)} 100%{transform:rotate(-360deg)} }
          @keyframes neonPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        `}</style>
        <div className="relative" style={{ width: 220, height: 220 }}>
          <div
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              boxShadow: "0 0 40px 10px #db277755",
              animation: "neonPulse 2.5s ease-in-out infinite",
            }}
          />
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            style={{
              animation: "wheelSpin 14s linear infinite",
              transformOrigin: "110px 110px",
            }}
          >
            <circle
              cx="110"
              cy="110"
              r="100"
              fill="#12071c"
              stroke="#db2777"
              strokeWidth="2"
            />
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * 360;
              const color = i % 2 === 0 ? "#1e0a2e" : "#db2777";
              return (
                <path
                  key={i}
                  d={`M110,110 L${110 + 100 * Math.cos((angle * Math.PI) / 180)},${110 + 100 * Math.sin((angle * Math.PI) / 180)} A100,100 0 0,1 ${110 + 100 * Math.cos(((angle + 22.5) * Math.PI) / 180)},${110 + 100 * Math.sin(((angle + 22.5) * Math.PI) / 180)} Z`}
                  fill={color}
                  opacity="0.85"
                />
              );
            })}
            <circle
              cx="110"
              cy="110"
              r="28"
              fill="#12071c"
              stroke="#22d3ee"
              strokeWidth="2"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              animation: "ballOrbit 3.2s linear infinite",
              transformOrigin: "110px 110px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 106,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#f4e9c9",
                boxShadow: "0 0 6px #f4e9c9",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "submarine") {
    return (
      <div className="absolute top-1/3 left-0 w-full h-56 pointer-events-none select-none overflow-hidden">
        <style>{`
          @keyframes subDrift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-10px)} }
          @keyframes sonarPing { 0%{transform:scale(0.3);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
          @keyframes hullBlink { 0%,90%,100%{opacity:0.9} 95%{opacity:0.1} }
        `}</style>
        <div
          className="absolute"
          style={{
            left: "60%",
            top: "55%",
            animation: "subDrift 9s ease-in-out infinite",
          }}
        >
          <div style={{ position: "relative", width: 160, height: 160 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute rounded-full border"
                style={{
                  inset: 60,
                  borderColor: "#67e8f9",
                  animation: `sonarPing 3s ease-out infinite`,
                  animationDelay: `${i}s`,
                }}
              />
            ))}
            <svg
              width="140"
              height="60"
              viewBox="0 0 140 60"
              style={{ position: "absolute", top: 50, left: 10 }}
            >
              <ellipse cx="70" cy="35" rx="65" ry="18" fill="#0e2a33" />
              <rect x="60" y="8" width="16" height="20" fill="#0e2a33" />
              <line
                x1="68"
                y1="0"
                x2="68"
                y2="8"
                stroke="#0e2a33"
                strokeWidth="3"
              />
              <circle
                cx="118"
                cy="35"
                r="3"
                fill="#67e8f9"
                style={{ animation: "hullBlink 2s ease-in-out infinite" }}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (type === "curtain") {
    return (
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <style>{`
          @keyframes curtainSwayL { 0%,100%{transform:skewY(1.5deg)} 50%{transform:skewY(-1deg)} }
          @keyframes curtainSwayR { 0%,100%{transform:skewY(-1.5deg)} 50%{transform:skewY(1deg)} }
          @keyframes spotFlicker { 0%,100%{opacity:0.5} 45%{opacity:0.5} 50%{opacity:0.3} 55%{opacity:0.5} }
          @keyframes sandbagDrop { 0%{transform:translateY(0)} 70%{transform:translateY(280px)} 100%{transform:translateY(280px)} }
        `}</style>
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: "18%",
            background:
              "linear-gradient(90deg, #5c0f22 0%, #9f1239 60%, #5c0f22 100%)",
            transformOrigin: "top",
            animation: "curtainSwayL 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            width: "18%",
            background:
              "linear-gradient(270deg, #5c0f22 0%, #9f1239 60%, #5c0f22 100%)",
            transformOrigin: "top",
            animation: "curtainSwayR 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            width: 300,
            height: 400,
            background:
              "radial-gradient(ellipse at top, #f4e9c9 0%, transparent 70%)",
            animation: "spotFlicker 5s ease-in-out infinite",
          }}
        />
        <div className="absolute" style={{ left: "55%", top: 0 }}>
          <div
            style={{
              width: 1,
              height: 40,
              background: "#3a2f28",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              width: 16,
              height: 12,
              background: "#2a221c",
              borderRadius: 2,
              animation: "sandbagDrop 5s ease-in infinite",
            }}
          />
        </div>
      </div>
    );
  }

  if (type === "greenhouse") {
    return (
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <style>{`
          @keyframes toxicPulse { 0%,100%{opacity:0.25; transform:scale(1)} 50%{opacity:0.5; transform:scale(1.08)} }
          @keyframes sporeFloat { 0%{transform:translateY(0); opacity:0} 20%{opacity:0.6} 100%{transform:translateY(-120px); opacity:0} }
        `}</style>
        {/* glass roof grid, top third */}
        <svg
          width="100%"
          height="140"
          viewBox="0 0 600 140"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 75}
              y1="0"
              x2={i * 75 - 30}
              y2="140"
              stroke="#3a4a3f"
              strokeWidth="2"
              opacity="0.5"
            />
          ))}
          <line
            x1="0"
            y1="70"
            x2="600"
            y2="70"
            stroke="#3a4a3f"
            strokeWidth="2"
            opacity="0.4"
          />
        </svg>
        {/* large plant silhouette with toxic glow, bottom-left */}
        <div className="absolute bottom-0 left-10">
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #4ade8055 0%, transparent 70%)",
              animation: "toxicPulse 4s ease-in-out infinite",
            }}
          />
          <svg width="200" height="260" viewBox="0 0 200 260">
            <path
              d="M100,260 C100,180 60,160 40,120 C70,140 95,150 100,180 C105,150 130,140 160,120 C140,160 100,180 100,260 Z"
              fill="#0e2312"
            />
            <path
              d="M100,180 C100,130 70,110 50,80 C80,100 100,110 100,140 C100,110 120,100 150,80 C130,110 100,130 100,180 Z"
              fill="#123018"
            />
          </svg>
        </div>
        {/* floating spores */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${15 + i * 8}%`,
              bottom: "10%",
              width: 4,
              height: 4,
              background: "#a3e635",
              animation: `sporeFloat ${5 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "tunnel") {
    return (
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
        <style>{`
          @keyframes torchFlicker { 0%,100%{opacity:0.8; transform:scaleY(1)} 40%{opacity:0.6; transform:scaleY(0.92)} 60%{opacity:0.9; transform:scaleY(1.05)} 80%{opacity:0.7; transform:scaleY(0.96)} }
        `}</style>
        <svg width="700" height="400" viewBox="0 0 700 400">
          {/* receding arches toward a vanishing point */}
          {[
            { w: 700, h: 400, o: 0.9 },
            { w: 520, h: 320, o: 0.75 },
            { w: 360, h: 240, o: 0.6 },
            { w: 220, h: 160, o: 0.45 },
          ].map((a, i) => {
            const x = (700 - a.w) / 2;
            const y = 400 - a.h;
            return (
              <path
                key={i}
                d={`M${x},400 L${x},${y + 40} Q${x},${y} ${x + a.w / 2},${y} Q${x + a.w},${y} ${x + a.w},${y + 40} L${x + a.w},400`}
                fill="none"
                stroke="#2a2019"
                strokeWidth="10"
                opacity={a.o}
              />
            );
          })}
          <ellipse
            cx="350"
            cy="330"
            rx="90"
            ry="30"
            fill="#0a0705"
            opacity="0.6"
          />
          {/* torches, nearest arch only */}
          {[80, 620].map((x, i) => (
            <g
              key={i}
              style={{
                transformOrigin: `${x}px 260px`,
                animation: `torchFlicker ${1.6 + i * 0.3}s ease-in-out infinite`,
              }}
            >
              <rect x={x - 3} y="260" width="6" height="60" fill="#1a130d" />
              <ellipse
                cx={x}
                cy="250"
                rx="10"
                ry="16"
                fill="#e08a2b"
                opacity="0.85"
              />
              <ellipse cx={x} cy="248" rx="5" ry="9" fill="#f4d06a" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return null;
}
