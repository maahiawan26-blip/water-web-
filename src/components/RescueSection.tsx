import React, { useState } from 'react';
import { Compass, Leaf, Sparkles, Sliders } from 'lucide-react';
import { ExpeditionStep } from '../types.ts';
import { audioEngine } from './AudioEngine.ts';

interface RescueSectionProps {
  onSelectStep: (step: ExpeditionStep) => void;
}

export const RescueSection: React.FC<RescueSectionProps> = ({ onSelectStep }) => {
  const [interactiveBottles, setInteractiveBottles] = useState<number>(4);

  const expeditionSteps: ExpeditionStep[] = [
    {
      step: '01',
      title: 'The Deep Blue Descent',
      description: 'A young guardian descends 35 meters along the continental shelf toward the ocean floor.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCmB1rU0_EFP20s1pqc8AXgo1FOZCUR_1egPtlxiHZlqrr2IND6GTrW7EUiYy20QGw3mgpQJ64komYBZmpAXz-R1LCmW1m0mRpSD1JB80m9znnnu2HfEdJHVnvkLdabw7gEPpG2KGRRF__ibw0KRJU_5LFkRR3Aa4hUfOfi6c55tasPC2TRJH3dzM46ncX9R_tkwc83b8BGd9Pm1RbHjKj_ZY26NOfAoPJbV_dZd08_j_TZxRUwWAc9',
      depth: '35m Sub-Surface',
      coordinates: '78°13′24″ N, 15°38′49″ E',
      diverNote:
        'Entering the benthic thermocline. Ambient water temp: 1.8°C. Visibility exceeds 60 meters under pristine glacial runoff currents.',
    },
    {
      step: '02',
      title: 'Intercepting the Relic',
      description: 'Interlocking with pristine ocean treasures before debris can disturb delicate pelagic habitats.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBPSypwKR2HaxMeST0gfhuZR_lfwgFoz8g1FMiSiDcCcf-6Jq25-fOi-zZSO0yyN0873UELhPcZBRRe32HRxnTxD2ZfRrehUHPihv8wJHmNu_kZDey814VciQwNjO_pqLTRhYhGb_JT2QUdA5bSSkxijleyvHsjXkoFgjbQBT1Te4N7JWaWP-cIqZwVUPSkgR0A6DcH1uAQy2ygc8Zt5XiVJu_CuDXV1ybx-vHe0BoO7m4nOCVKZVTr',
      depth: '42m Tectonic Shelf',
      coordinates: '78°14′02″ N, 15°40′12″ E',
      diverNote:
        'Target sealed aquifer vessel located weightless above basalt terrace. Zero surface fouling; glass hermetic seal intact under hydrostatic balance.',
    },
    {
      step: '03',
      title: 'Canister Secure & Ascend',
      description: 'The vessel is safely harnessed into an eco-recovery harness for circular repurposing.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCoo_DVX58xgFom5Znwo4mHQq4rgLZd5DHXgCXrJjs5-BUrTNK7GnG3lyL3xyqBqnT0lrEEoyYZqvY33bi2s2R6jbDaalvFKTBHDA8tuZ31_TUe8Pen4ImnaRMi3PGq-xT_aibMaFEYxSG4T_Y3P7W3VFDxcwGerYUpZl9tFqzlMukbzacBhp-CiSyN2FRwF-Y5RpnGUbIj9-3w9yxFgAeoESLkxtPCNht8n6xG0-P7JKRbNiaOh1Yb',
      depth: 'Surface Ascent Stage',
      coordinates: '78°13′50″ N, 15°39′10″ E',
      diverNote:
        'Hermetically docked in carbon-neutral dive pod. Hydro-pressure released in controlled decompression lock. Ready for return to base.',
    },
  ];

  return (
    <section id="rescueSection" className="relative z-10 px-4 py-16 bg-[#061327] min-w-0">
      {/* Chapter Title */}
      <div className="max-w-md mx-auto space-y-3 text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1d2a3f] text-[#7bd0ff] border border-white/5">
          <Compass className="w-3.5 h-3.5" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
            CHAPTER 03 • GUARDIAN EXPEDITION
          </span>
        </div>
        <h2 className="font-headline text-[28px] sm:text-[32px] text-[#d6e3ff] font-semibold tracking-tight">
          Every Sip Heals the Deep.
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#bbc9cd] leading-relaxed">
          Follow the aquatic retrieval story: clean waters are not found; they are protected by human conviction.
        </p>
      </div>

      {/* Cinematic 3-Step Sequence Cards */}
      <div className="max-w-md mx-auto space-y-3.5">
        {expeditionSteps.map((step) => {
          return (
            <div
              key={step.step}
              onClick={() => {
                audioEngine.playBubbleSound();
                onSelectStep(step);
              }}
              className="group bg-[#132034]/70 hover:bg-[#1d2a3f]/90 border border-white/5 hover:border-[#22d3ee]/40 backdrop-blur-md rounded-2xl p-4 flex items-center space-x-4 shadow-md transition-all duration-300 cursor-pointer hover:translate-x-1"
              title="Click to view diver logbook entry"
            >
              <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden bg-[#28354b] relative border border-white/10">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-1 left-1 bg-[#020e22]/85 text-[#8aebff] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                  {step.step}
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-[16px] text-[#d6e3ff] font-medium truncate group-hover:text-[#8aebff] transition-colors">
                  {step.title}
                </div>
                <p className="text-[13px] text-[#bbc9cd] line-clamp-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Conversion Banner */}
      <div className="max-w-md mx-auto mt-6 bg-gradient-to-r from-[#0e1c30] via-[#132034] to-[#0e1c30] border border-white/10 p-5 rounded-2xl shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8aebff]">
            THE 1 : 50 RATIO
          </span>
          <div className="font-headline text-[22px] sm:text-[24px] text-[#d6e3ff] font-semibold">
            50 Ocean Bottles
          </div>
          <p className="text-[12px] text-[#bbc9cd]">
            Diverted from marine ecosystems per bottle enjoyed.
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#22d3ee]/15 border border-[#22d3ee]/30 flex items-center justify-center text-[#8aebff] flex-shrink-0">
          <Leaf className="w-6 h-6" />
        </div>
      </div>

      {/* Interactive Micro Footprint Calculator */}
      <div className="max-w-md mx-auto mt-3 p-4 rounded-xl bg-[#0e1c30]/50 border border-white/5 space-y-2.5">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#bbc9cd] flex items-center space-x-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#22d3ee]" />
            <span>Interactive Impact Calculator</span>
          </span>
          <span className="text-[#8aebff] font-mono font-semibold">
            {interactiveBottles} bottles / mo
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="24"
          value={interactiveBottles}
          onChange={(e) => setInteractiveBottles(parseInt(e.target.value))}
          className="w-full accent-[#22d3ee] bg-[#1d2a3f] h-1.5 rounded-lg cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] text-[#859397]">
          <span>Single Allocation</span>
          <span className="text-[#97e9ff] font-medium">
            Prevents <strong className="text-white font-bold">{interactiveBottles * 50}</strong> plastic bottles from ocean reefs annually!
          </span>
        </div>
      </div>
    </section>
  );
};
