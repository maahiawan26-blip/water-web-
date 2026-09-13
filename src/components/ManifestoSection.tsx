import React, { useState } from 'react';
import { Globe, ArrowRight, PlayCircle, Shield, Waves, ChevronDown, ChevronUp, Droplet } from 'lucide-react';
import { audioEngine } from './AudioEngine.ts';

interface ManifestoSectionProps {
  onDiscoverClick: () => void;
  onWatchFilmClick: () => void;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({
  onDiscoverClick,
  onWatchFilmClick,
}) => {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  return (
    <section
      id="manifestoSection"
      className="relative z-10 px-4 pt-10 pb-16 bg-gradient-to-b from-[#061327] via-[#020e22] to-[#020e22] min-w-0"
    >
      {/* Editorial Headline */}
      <div className="max-w-md mx-auto text-center space-y-4 mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#22d3ee]/15 text-[#8aebff] border border-[#22d3ee]/30">
          <Globe className="w-3.5 h-3.5" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
            Global Purity Initiative
          </span>
        </div>

        <h2 className="font-headline text-[38px] sm:text-[44px] font-bold text-[#d6e3ff] tracking-tight leading-[1.12]">
          Save Ocean.<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8aebff] via-[#7bd0ff] to-[#97e9ff]">
            Choose Pure Water.
          </span>
        </h2>

        <p className="text-[16px] sm:text-[18px] text-[#bbc9cd] max-w-sm mx-auto leading-relaxed">
          Pure water. Conscious choices.<br />A cleaner, breathing ocean for generations to come.
        </p>
      </div>

      {/* Technical Specification Glass Card */}
      <div className="max-w-md mx-auto bg-[#1d2a3f]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 mb-8 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Droplet className="w-5 h-5 text-[#8aebff]" />
            <span className="text-[16px] text-[#d6e3ff] font-semibold font-mono">
              Batch No. 0048-ARC
            </span>
          </div>
          <span className="text-[10px] font-semibold text-[#bbc9cd] uppercase tracking-wider font-mono">
            Svalbard Depth Well
          </span>
        </div>

        <div className="space-y-2.5 text-[13px] font-medium">
          <div className="flex justify-between items-center text-[#bbc9cd]">
            <span>Total Dissolved Solids (TDS)</span>
            <span className="text-[#d6e3ff] font-semibold font-mono">32 mg/L (Ultra-Light)</span>
          </div>
          <div className="flex justify-between items-center text-[#bbc9cd]">
            <span>Silica (SiO₂)</span>
            <span className="text-[#d6e3ff] font-semibold font-mono">14.2 mg/L</span>
          </div>
          <div className="flex justify-between items-center text-[#bbc9cd]">
            <span>Carbon Footprint per Litre</span>
            <span className="text-[#8aebff] font-semibold font-mono">Net-Negative (-42g CO₂e)</span>
          </div>
          <div className="flex justify-between items-center text-[#bbc9cd]">
            <span>Vessel Certification</span>
            <span className="text-[#d6e3ff] font-semibold">B-Corp Ocean Verified™</span>
          </div>
        </div>

        {/* Toggle Detailed Mineral Chromatography */}
        <button
          onClick={() => setShowFullAnalysis(!showFullAnalysis)}
          className="w-full pt-2 flex items-center justify-center space-x-1.5 text-[11px] font-semibold text-[#7bd0ff] hover:text-[#8aebff] transition-colors border-t border-white/5"
        >
          <span>{showFullAnalysis ? 'Hide' : 'View'} Complete Mineral Chromatography</span>
          {showFullAnalysis ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showFullAnalysis && (
          <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] bg-[#0e1c30]/70 p-3 rounded-xl border border-white/5 animate-fadeIn">
            <div className="flex justify-between text-[#859397]">
              <span>Calcium (Ca²⁺):</span>
              <span className="text-[#d6e3ff] font-mono">8.1 mg/L</span>
            </div>
            <div className="flex justify-between text-[#859397]">
              <span>Magnesium (Mg²⁺):</span>
              <span className="text-[#d6e3ff] font-mono">3.4 mg/L</span>
            </div>
            <div className="flex justify-between text-[#859397]">
              <span>Potassium (K⁺):</span>
              <span className="text-[#d6e3ff] font-mono">1.8 mg/L</span>
            </div>
            <div className="flex justify-between text-[#859397]">
              <span>Bicarbonates (HCO₃⁻):</span>
              <span className="text-[#d6e3ff] font-mono">28.0 mg/L</span>
            </div>
            <div className="flex justify-between text-[#859397]">
              <span>Sulfate (SO₄²⁻):</span>
              <span className="text-[#d6e3ff] font-mono">2.2 mg/L</span>
            </div>
            <div className="flex justify-between text-[#859397]">
              <span>Sodium (Na⁺):</span>
              <span className="text-[#d6e3ff] font-mono">3.1 mg/L</span>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Center */}
      <div className="max-w-md mx-auto space-y-3">
        {/* Luxury Radiant CTA Button */}
        <button
          onClick={() => {
            audioEngine.playBubbleSound();
            onDiscoverClick();
          }}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#2fd9f4] text-[#00363e] text-[16px] font-bold flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(34,211,238,0.38)] hover:shadow-[0_0_45px_rgba(34,211,238,0.6)] transition-all duration-300 active:scale-[0.98] cursor-pointer"
        >
          <span>Discover Pure Water</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary Glass Action: Watch Film */}
        <button
          onClick={() => {
            audioEngine.playBubbleSound();
            onWatchFilmClick();
          }}
          className="w-full py-3.5 px-6 rounded-full bg-[#28354b]/70 border border-white/10 backdrop-blur-xl text-[#d6e3ff] text-[15px] font-medium flex items-center justify-center space-x-2 hover:bg-[#28354b] transition-all duration-200 cursor-pointer"
        >
          <PlayCircle className="w-5 h-5 text-[#7bd0ff]" />
          <span>Watch The Ocean Film (02:14)</span>
        </button>
      </div>

      {/* Micro Impact Seal & Legal */}
      <div className="max-w-md mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col items-center space-y-2 text-center text-[#859397]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 text-[10px] font-semibold tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5 text-[#8aebff]" />
            <span>100% RECYCLED PACKAGING</span>
          </span>
          <span className="flex items-center space-x-1.5 text-[10px] font-semibold tracking-wider uppercase">
            <Waves className="w-3.5 h-3.5 text-[#7bd0ff]" />
            <span>1% FOR THE PLANET MEMBER</span>
          </span>
        </div>
        <p className="text-[10px] tracking-widest text-[#bbc9cd]/60 uppercase">
          © 2025 PURE OCEAN ARCTIC S.A. ALL RIGHTS RESERVED. BOTTLED AT THE SOURCE.
        </p>
      </div>
    </section>
  );
};
