import React, { useState } from 'react';
import { Droplets, ChevronDown, Sparkles } from 'lucide-react';
import { audioEngine } from './AudioEngine.ts';

interface HeroSectionProps {
  onDiveClick: () => void;
  onBottleClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDiveClick, onBottleClick }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="heroSection"
      className="relative z-10 px-4 pt-6 sm:pt-10 pb-16 flex flex-col items-center min-w-0"
    >
      {/* Editorial Eyebrow Tag */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1d2a3f]/80 border border-white/10 backdrop-blur-md mb-4 shadow-sm hover:border-[#22d3ee]/40 transition-colors">
        <Droplets className="text-[#8aebff] w-3.5 h-3.5" />
        <span className="text-[10px] font-semibold text-[#8aebff] uppercase tracking-[0.14em]">
          ARCTIC DEEP AQUIFER • 750ML
        </span>
      </div>

      {/* Main Monumental Typography */}
      <div className="text-center max-w-md mx-auto space-y-2.5 mb-4">
        <h1 className="font-headline text-[42px] sm:text-[54px] font-bold text-[#d6e3ff] tracking-tight leading-[1.08]">
          PURE OCEAN
        </h1>
        <p className="text-[15px] sm:text-[17px] text-[#bbc9cd] tracking-normal font-normal leading-relaxed">
          Born in the eternal abyss.<br />Crafted untouched by nature.
        </p>
      </div>

      {/* Centerpiece: Floating Bottle Container with Marine Organisms */}
      <div
        className="relative w-full max-w-sm h-[480px] sm:h-[520px] flex items-center justify-center my-2 cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          audioEngine.playBubbleSound();
          onBottleClick();
        }}
        title="Click to inspect the Pure Ocean Monolith Vessel"
      >
        {/* Underwater Marine Life SVG Layers */}

        {/* 1. Swimming Fish School (SVG) */}
        <div className="absolute top-10 -left-6 z-20 pointer-events-none transition-transform duration-700 hover:translate-x-3">
          <svg className="opacity-70" fill="none" height="42" viewBox="0 0 110 42" width="110">
            <path
              d="M12 8C20 4 32 10 38 12C32 14 20 20 12 16C8 14 2 20 0 12C2 4 8 10 12 8Z"
              fill="#8aebff"
              fillOpacity="0.75"
            />
            <circle cx="33" cy="11" fill="#061327" r="1.2" />
            <path
              d="M48 18C54 15 62 19 66 21C62 23 54 27 48 24C45 23 41 27 40 21C41 15 45 19 48 18Z"
              fill="#7bd0ff"
              fillOpacity="0.6"
            />
            <path
              d="M72 26C77 23 84 27 88 28C84 30 77 34 72 31C70 30 66 34 65 28C66 22 70 26 72 26Z"
              fill="#97e9ff"
              fillOpacity="0.65"
            />
          </svg>
        </div>

        {/* 2. Bioluminescent Jellyfish (Left) */}
        <div
          className="absolute bottom-16 -left-3 z-20 pointer-events-none animate-bounce"
          style={{ animationDuration: '5s' }}
        >
          <svg fill="none" height="68" viewBox="0 0 44 64" width="44">
            <path
              d="M6 24C6 11.8497 13.1634 2 22 2C30.8366 2 38 11.8497 38 24C38 27 33 27 28 25C24 23 20 23 16 25C11 27 6 27 6 24Z"
              fill="#8aebff"
              fillOpacity="0.4"
            />
            <path
              d="M12 25C13 36 10 48 11 60"
              stroke="#8aebff"
              strokeDasharray="2 3"
              strokeOpacity="0.6"
              strokeWidth="1.2"
            />
            <path
              d="M18 24C20 37 17 50 19 62"
              stroke="#2fd9f4"
              strokeOpacity="0.75"
              strokeWidth="1.2"
            />
            <path
              d="M26 24C24 37 27 50 25 62"
              stroke="#2fd9f4"
              strokeOpacity="0.75"
              strokeWidth="1.2"
            />
            <path
              d="M32 25C31 36 34 48 33 60"
              stroke="#8aebff"
              strokeDasharray="2 3"
              strokeOpacity="0.6"
              strokeWidth="1.2"
            />
            <circle cx="22" cy="14" fill="#22d3ee" fillOpacity="0.75" r="5" />
          </svg>
        </div>

        {/* 3. Gliding Sea Turtle Silhouette (Top Right) */}
        <div className="absolute top-6 -right-4 z-10 pointer-events-none opacity-45 hover:opacity-85 transition-opacity">
          <svg fill="none" height="56" viewBox="0 0 78 56" width="78">
            <ellipse cx="38" cy="28" fill="#1d2a3f" rx="20" ry="14" />
            <path d="M22 28C10 32 4 40 2 46C12 44 20 38 24 34" fill="#132034" />
            <path d="M46 20C54 10 66 6 74 4C70 12 62 20 54 24" fill="#132034" />
            <path d="M48 34C58 42 68 46 76 48C70 42 62 38 54 36" fill="#132034" />
            <circle cx="16" cy="28" fill="#1d2a3f" r="5" />
          </svg>
        </div>

        {/* 4. Distant Pelagic Shadow (Bottom Right) */}
        <div className="absolute bottom-8 right-2 z-0 pointer-events-none opacity-25">
          <svg fill="none" height="48" viewBox="0 0 120 48" width="120">
            <path
              d="M0 24C30 18 50 4 70 4C85 4 110 16 120 24C110 32 85 44 70 44C50 44 30 30 0 24Z"
              fill="#28354b"
            />
          </svg>
        </div>

        {/* Soft Caustic Glow Ring Behind Vessel */}
        <div
          className="absolute inset-x-8 inset-y-12 bg-[#22d3ee]/18 rounded-full blur-3xl -z-10 animate-pulse"
          style={{ animationDuration: '4.5s' }}
        />

        {/* The Hero Crystal Bottle Image */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) rotate(${
              mouseOffset.x * 0.15
            }deg)`,
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_JjralDZhX8ErnlwStQOiPM-y04ilSZhELc_SG_sjc9E37c2WH_XRbJcKHb0GaQqUXVK0Q99D4Ig7lkrkfAeND9-I2EvQ9LVcrLUrIHlXEroXHa0NGh53w9ogSW5mFlr2vR-yVlkDaE5a6-_4Zgsy6Fi_6BWz-dIDkrkhb_Ri1xIWH08aK8MTNJk6wfcIllc8FytWUamyd6i6p-3KJNbDNuZoK1Iixc500bGXjgSYaRdYBRdvyC9l"
            alt="PURE OCEAN 750ml ultra-pure bottled water illuminated underwater with radiant aquatic sun rays and crystal air bubbles"
            className="w-auto h-[440px] sm:h-[480px] max-w-full object-contain drop-shadow-[0_28px_44px_rgba(2,14,34,0.92)] z-10 animate-float-subtle"
          />

          {/* Interactive Micro Sparkles Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#97e9ff] shadow-lg shadow-[#97e9ff] animate-ping absolute top-36 left-24" />
            <div
              className="w-1 h-1 rounded-full bg-[#8aebff] shadow-lg shadow-[#8aebff] animate-ping absolute bottom-40 right-20"
              style={{ animationDelay: '1.5s' }}
            />
            <div
              className="w-2 h-2 rounded-full bg-[#2fd9f4] shadow-md shadow-[#2fd9f4] animate-ping absolute top-52 right-24"
              style={{ animationDelay: '2.3s' }}
            />
          </div>
        </div>
      </div>

      {/* Tactile Dive Prompt */}
      <div
        className="flex flex-col items-center mt-3 cursor-pointer group"
        onClick={() => {
          audioEngine.playBubbleSound();
          onDiveClick();
        }}
      >
        <span className="text-[10px] font-semibold text-[#bbc9cd] group-hover:text-[#8aebff] transition-colors uppercase tracking-[0.15em]">
          Scroll to Dive with the Vessel
        </span>
        <div className="w-8 h-8 rounded-full bg-[#132034] border border-white/10 flex items-center justify-center mt-2 group-hover:bg-[#22d3ee]/20 group-hover:text-[#8aebff] group-hover:border-[#22d3ee]/40 transition-all">
          <ChevronDown className="w-4 h-4 animate-bounce text-[#8aebff]" />
        </div>
      </div>
    </section>
  );
};
