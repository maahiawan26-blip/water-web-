import React from 'react';

interface AmbientLightingProps {
  depth: number;
}

export const AmbientLighting: React.FC<AmbientLightingProps> = ({ depth }) => {
  // Top glow dims as we go deeper into the bathypelagic abyss
  const topGlowOpacity = Math.max(0.12, 1 - depth / 130);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top Sunlit Surface Halo */}
      <div
        className="absolute -top-28 left-1/2 -translate-x-1/2 w-[420px] h-[380px] rounded-full bg-[#8aebff]/15 blur-[120px] transition-opacity duration-700"
        style={{ opacity: topGlowOpacity }}
      />

      {/* Mid-Depth Pelagic Cyan Shimmer */}
      <div className="absolute top-[42%] -left-24 w-[340px] h-[340px] rounded-full bg-[#7bd0ff]/10 blur-[100px]" />

      {/* Abyssal Trench Bioluminescent Pod */}
      <div className="absolute top-[76%] -right-20 w-[380px] h-[380px] rounded-full bg-[#22d3ee]/12 blur-[120px]" />

      {/* Floating Pelagic Caustic Light Rays SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 mix-blend-screen pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 400 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rayGrad1" x1="0%" x2="35%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#8aebff" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#061327" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rayGrad2" x1="10%" x2="55%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#7bd0ff" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#061327" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          className="animate-pulse"
          fill="url(#rayGrad1)"
          points="110,0 210,0 320,900 150,900"
          style={{ animationDuration: '8s' }}
        />
        <polygon
          className="animate-pulse"
          fill="url(#rayGrad2)"
          points="250,0 350,0 430,900 280,900"
          style={{ animationDuration: '11s', animationDelay: '2s' }}
        />
      </svg>
    </div>
  );
};
