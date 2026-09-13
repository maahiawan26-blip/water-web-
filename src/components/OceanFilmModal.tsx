import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, Sparkles } from 'lucide-react';
import { audioEngine } from './AudioEngine.ts';

interface OceanFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OceanFilmModal: React.FC<OceanFilmModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const duration = 134; // 2 minutes 14 seconds
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getSubtitles = () => {
    if (currentTime < 20) {
      return 'Arctic Archipelago: Glacial melt begins its 3,000-year filtration through tectonic basalt beds...';
    } else if (currentTime < 55) {
      return '400 meters below sea level, hydrostatic pressure locks natural alkalinity at pH 7.85 and 2.4°C...';
    } else if (currentTime < 95) {
      return 'Guardian Divers intercept each vessel before contemporary surface runoff can reach the sanctuary...';
    } else if (currentTime < 120) {
      return 'The 1:50 Pledge: Every sip permanently finances the diversion of 50 marine plastic bottles...';
    } else {
      return 'Pure Ocean. Born in the eternal abyss. Crafted untouched by nature.';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#061327] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0e1c30]/80 border-b border-white/10 z-20">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-ping" />
            <span className="text-[12px] font-semibold text-[#8aebff] font-mono uppercase tracking-wider">
              PURE OCEAN • CHAPTER 03 FILM (4K HDR)
            </span>
          </div>
          <button
            onClick={() => {
              audioEngine.playBubbleSound();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#1d2a3f] text-[#bbc9cd] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas Area */}
        <div className="relative aspect-video w-full bg-[#020e22] overflow-hidden flex items-center justify-center">
          {/* Visual ocean background image */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHkuQyfhZZDd7RTdNQtjjhSc4P6NKNm7pltynKDBGgNpg6jBKSgzP7-DJDEMYLZayIEvuxTGOrvTQfAs_rPK6p0jC-KOb54Wt7m-NrxD2sB8Zk0Ks5pyfdS7W9mCRBjObSodEjxRDPnW5vCK4Q0IJCeLTkrqkkBx9vadoifXr6-LNMKQmNdWxhXskSlnt95oy8VsQwhbqOahkrBBHQG2HTw4roogyF41xbzPwDKNB6Kr4VqrcrjgST"
            alt="Ocean film still"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105 filter brightness-90' : 'filter brightness-75'
            }`}
          />

          {/* Oceanic Caustics and Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020e22] via-transparent to-[#020e22]/50 pointer-events-none" />

          {/* Play/Pause Center Overlay */}
          <button
            onClick={() => {
              audioEngine.playBubbleSound();
              setIsPlaying(!isPlaying);
            }}
            className="absolute z-30 w-16 h-16 rounded-full bg-[#22d3ee]/25 border border-[#22d3ee]/60 backdrop-blur-md flex items-center justify-center text-[#8aebff] hover:scale-110 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>

          {/* Subtitles Overlay */}
          <div className="absolute bottom-6 left-4 right-4 text-center z-20 pointer-events-none">
            <span className="inline-block bg-[#020e22]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[12px] sm:text-[13px] text-[#d6e3ff] font-medium tracking-wide">
              {getSubtitles()}
            </span>
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="p-4 bg-[#0e1c30] border-t border-white/10 space-y-2.5">
          {/* Progress Bar */}
          <div className="relative w-full h-1.5 bg-[#1d2a3f] rounded-full overflow-hidden cursor-pointer">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#22d3ee] to-[#7bd0ff] transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[12px] text-[#bbc9cd]">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-[#8aebff] transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setCurrentTime(0)}
                className="hover:text-[#8aebff] transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[#8aebff]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#8aebff] transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#1d2a3f] text-[#8aebff]">
                Spatial Audio ON
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
