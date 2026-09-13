import React from 'react';
import { ArrowDown, ShieldCheck, FlaskConical, Infinity as InfinityIcon, Snowflake, ExternalLink } from 'lucide-react';
import { TelemetryMetric } from '../types.ts';
import { audioEngine } from './AudioEngine.ts';

interface DescentSectionProps {
  onOpenMetricModal: (metric: TelemetryMetric) => void;
  onOpenMonolithModal: () => void;
}

export const DescentSection: React.FC<DescentSectionProps> = ({
  onOpenMetricModal,
  onOpenMonolithModal,
}) => {
  const metrics: TelemetryMetric[] = [
    {
      id: 'plastics',
      title: '0.00%',
      subtitle: 'Synthetic Microplastics',
      value: '0.00%',
      description: 'Certified subterranean source completely isolated from oceanic runoff.',
      icon: 'shield',
      color: '#8aebff',
      detailedNotes:
        'Independently tested via Raman Microspectroscopy down to 0.2 microns. Zero presence of PET, HDPE, LDPE, polypropylene, or synthetic polymers detected across 240 batch samples.',
    },
    {
      id: 'ph',
      title: 'pH 7.85',
      subtitle: 'Natural Cellular Alkalinity',
      value: 'pH 7.85',
      description: 'Naturally mineralized with ocean basalt magnesium and calcium ions.',
      icon: 'flask',
      color: '#7bd0ff',
      detailedNotes:
        'Slightly alkaline profile optimized for human cellular absorption. Balanced ionic ratio: Mg²⁺ (3.4 mg/L) and Ca²⁺ (8.1 mg/L) dissolved through basalt beds over 3 millennia.',
    },
    {
      id: 'glass',
      title: '100%',
      subtitle: 'Infinite Optical Glass',
      value: '100%',
      description: 'Melted from retrieved coastal glass cullet. Zero single-use polymers.',
      icon: 'infinity',
      color: '#97e9ff',
      detailedNotes:
        'Custom flint glass composition offering pharmaceutical-grade inertness. Zero phthalates, BPA, or leaching under UV or pressure changes.',
    },
    {
      id: 'temp',
      title: '2.4°C',
      subtitle: 'Hydro-Thermal Core',
      value: '2.4°C',
      description: 'Preserved under natural sub-glacial pressure since the late Holocene.',
      icon: 'snowflake',
      color: '#a2eeff',
      detailedNotes:
        'Sourced directly at natural wellhead temperature of 2.4°C, maintained under 45 atmospheres of hydro-static basalt pressure without active chilling.',
    },
  ];

  return (
    <section
      id="descentSection"
      className="relative z-10 px-4 py-14 bg-gradient-to-b from-[#061327] via-[#020e22] to-[#0e1c30]/95 rounded-t-3xl min-w-0"
    >
      {/* Bathypelagic Atmosphere Header */}
      <div className="max-w-md mx-auto mb-8 text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#28354b]/50 border border-white/5">
          <ArrowDown className="w-3 h-3 text-[#97e9ff]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#97e9ff]">
            Twilight Zone • 400M Below Ice
          </span>
        </div>
        <h2 className="font-headline text-[28px] sm:text-[32px] text-[#d6e3ff] font-semibold tracking-tight">
          Deep Aquifer Extraction.
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#bbc9cd] leading-relaxed">
          Filtered under tectonic basalt rock over 3,000 years. Free from contemporary atmosphere, light, and contaminants.
        </p>
      </div>

      {/* Underwater Interactive Telemetry Cards Grid */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8">
        {metrics.map((m) => {
          return (
            <div
              key={m.id}
              onClick={() => {
                audioEngine.playBubbleSound();
                onOpenMetricModal(m);
              }}
              className="group bg-[#132034]/70 hover:bg-[#1d2a3f]/85 border border-white/5 hover:border-[#22d3ee]/30 backdrop-blur-xl p-4 rounded-2xl flex flex-col justify-between space-y-3 shadow-lg shadow-[#020e22]/50 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              title="Click to view lab certification and scientific analysis"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${m.color}15`, color: m.color }}
                >
                  {m.id === 'plastics' && <ShieldCheck className="w-4 h-4" />}
                  {m.id === 'ph' && <FlaskConical className="w-4 h-4" />}
                  {m.id === 'glass' && <InfinityIcon className="w-4 h-4" />}
                  {m.id === 'temp' && <Snowflake className="w-4 h-4" />}
                </div>
                <span className="opacity-0 group-hover:opacity-100 text-[#8aebff] text-[10px] font-mono transition-opacity">
                  VIEW
                </span>
              </div>

              <div>
                <div
                  className="font-headline text-[22px] sm:text-[24px] font-bold tracking-tight"
                  style={{ color: m.color }}
                >
                  {m.title}
                </div>
                <div className="text-[12px] font-medium text-[#bbc9cd] mt-0.5">
                  {m.subtitle}
                </div>
              </div>

              <p className="text-[12px] text-[#859397] leading-snug">
                {m.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tactile Visual Showcase Card: The Submerged Specimen */}
      <div className="max-w-md mx-auto bg-[#0e1c30]/90 border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold text-[#8aebff] uppercase tracking-[0.14em]">
              OPTICAL INTEGRITY
            </span>
            <h3 className="text-[18px] sm:text-[20px] text-[#d6e3ff] font-semibold">
              Hermetic Seal Monolith
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#28354b] text-[#7bd0ff] text-[11px] font-medium tracking-wider">
            ISO 14044
          </span>
        </div>

        {/* Visual Showcase: Subsea Lab Probe Monolith Macro Photo */}
        <div
          onClick={() => {
            audioEngine.playBubbleSound();
            onOpenMonolithModal();
          }}
          className="group relative w-full h-44 rounded-2xl overflow-hidden bg-[#28354b] cursor-pointer"
          title="Click to view macro optical structure"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHkuQyfhZZDd7RTdNQtjjhSc4P6NKNm7pltynKDBGgNpg6jBKSgzP7-DJDEMYLZayIEvuxTGOrvTQfAs_rPK6p0jC-KOb54Wt7m-NrxD2sB8Zk0Ks5pyfdS7W9mCRBjObSodEjxRDPnW5vCK4Q0IJCeLTkrqkkBx9vadoifXr6-LNMKQmNdWxhXskSlnt95oy8VsQwhbqOahkrBBHQG2HTw4roogyF41xbzPwDKNB6Kr4VqrcrjgST"
            alt="Macro close-up shot of a luxury glass water bottle underwater with glowing microscopic bubbles"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020e22] via-[#020e22]/20 to-transparent pointer-events-none" />

          {/* Overlay Floating Specs */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#d6e3ff] text-[11px] font-medium">
            <span className="flex items-center space-x-1.5 bg-[#061327]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#97e9ff] animate-ping" />
              <span>Refractive Index: 1.52 N/D</span>
            </span>
            <span className="text-[#bbc9cd] bg-[#061327]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              Pressure rated: 45 ATM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
