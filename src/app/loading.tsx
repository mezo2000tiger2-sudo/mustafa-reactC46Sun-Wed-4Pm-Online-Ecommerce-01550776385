import React from 'react'

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-[#f6f1e8] flex items-center justify-center overflow-hidden">
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sage glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_50%_40%,rgba(14,133,40,0.08),transparent_60%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Brand wordmark */}
        <div className="text-center">
          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-[#1c1914] leading-none">
            Fresh<span className="text-[#0e8528] italic">cart</span>
          </h1>
        </div>

        {/* Cascade dots */}
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="size-2 rounded-full bg-[#0e8528]/30"
              style={{
                animation: `pulse-dot 1.4s ease-in-out ${i * 0.32}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Status line */}
        <p className="text-[10px] font-bold text-[#1c1914]/20 uppercase tracking-[0.3em]">
          preparing your experience
        </p>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 80%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
            background-color: rgb(14, 133, 40);
          }
        }
      `}</style>
    </div>
  )
}
