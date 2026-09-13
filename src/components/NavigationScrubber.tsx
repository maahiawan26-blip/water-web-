import React from 'react';
import { Volume2, VolumeX, Waves } from 'lucide-react';
import { SceneId } from '../types.ts';
import { audioEngine } from './AudioEngine.ts';
import { BrandLogo } from './BrandLogo.tsx';

interface NavigationScrubberProps {
  currentDepth: number;
  activeScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  onOpenAllocations: () => void;
}

export const NavigationScrubber: React.FC<NavigationScrubberProps> = ({
  currentDepth,
  activeScene,
  onSelectScene,
  isAudioActive,
  onToggleAudio,
  onOpenAllocations,
}) => {
  const scenes: { id: SceneId; label: string; num: string }[] = [
    { id: 'heroSection', label: 'PURE', num: '01' },
    { id: 'descentSection', label: 'ABYSS', num: '02' },
    { id: 'rescueSection', label: 'RESCUE', num: '03' },
    { id: 'manifestoSection', label: 'IMPACT', num: '04' },
  ];

  return (
    <header className="sticky top-3 z-50 px-4 w-full max-w-lg mx-auto">
      <div className="bg-[#0e1c30]/90 backdrop-blur-2xl border border-white/10 px-3 py-2 rounded-full flex items-center justify-between shadow-2xl shadow-[#020e22]/80">
        {/* Left: Brand Icon & Depth telemetry indicator */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onSelectScene('heroSection')}
            className="hover:scale-105 transition-transform"
            title="PURE OCEAN"
          >
            <BrandLogo size={24} showGlow={false} />
          </button>
          <div className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8aebff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22d3ee]"></span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8aebff] font-mono select-none">
              DEPTH: {currentDepth}M
            </span>
          </div>
        </div>

        {/* Center: 4 Scene Navigation Buttons */}
        <nav className="flex items-center space-x-1" aria-label="Scene navigation">
          {scenes.map((s) => {
            const isActive = activeScene === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  audioEngine.playBubbleSound();
                  onSelectScene(s.id);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wider transition-all duration-300 select-none ${
                  isActive
                    ? 'bg-[#28354b] text-[#8aebff] shadow-sm shadow-[#22d3ee]/20 font-semibold'
                    : 'text-[#859397] hover:text-[#d6e3ff] hover:bg-white/5'
                }`}
              >
                <span className="opacity-70 mr-0.5">{s.num}</span> {s.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Hydro-Audio & Quick Allocation CTA */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              onToggleAudio();
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              isAudioActive
                ? 'bg-[#22d3ee]/25 text-[#8aebff] ring-1 ring-[#22d3ee]/50 shadow-sm'
                : 'bg-[#132034] text-[#bbc9cd] hover:text-[#8aebff]'
            }`}
            title={isAudioActive ? 'Mute Ocean Hydro-Acoustics' : 'Enable Ocean Hydro-Acoustics'}
            aria-label="Toggle Hydro-Acoustics Soundscape"
          >
            {isAudioActive ? (
              <Waves className="w-3.5 h-3.5 animate-pulse text-[#8aebff]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={onOpenAllocations}
            className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-[#22d3ee]/20 text-[#8aebff] text-[10px] font-semibold tracking-wider hover:bg-[#22d3ee]/30 transition-colors border border-[#22d3ee]/40"
          >
            RESERVE
          </button>
        </div>
      </div>
    </header>
  );
};
