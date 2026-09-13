import React from 'react';
import { X, ShieldCheck, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { TelemetryMetric, ExpeditionStep } from '../types.ts';

interface DetailModalProps {
  metric: TelemetryMetric | null;
  expeditionStep: ExpeditionStep | null;
  showMonolith: boolean;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  metric,
  expeditionStep,
  showMonolith,
  onClose,
}) => {
  if (!metric && !expeditionStep && !showMonolith) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0e1c30] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#8aebff]" />
            <span className="text-[12px] font-semibold text-[#8aebff] font-mono uppercase tracking-wider">
              {metric
                ? 'LAB TELEMETRY AUDIT'
                : expeditionStep
                ? 'DIVER LOGBOOK DISPATCH'
                : 'OPTICAL ARCHITECTURE'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1d2a3f] text-[#bbc9cd] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content for Metric */}
        {metric && (
          <div className="py-4 space-y-4 overflow-y-auto flex-1">
            <div className="text-center py-2">
              <div
                className="font-headline text-[36px] font-bold tracking-tight"
                style={{ color: metric.color }}
              >
                {metric.title}
              </div>
              <div className="text-[15px] font-semibold text-[#d6e3ff] mt-1">
                {metric.subtitle}
              </div>
              <p className="text-[13px] text-[#bbc9cd] mt-1">{metric.description}</p>
            </div>

            <div className="bg-[#132034] p-4 rounded-2xl border border-white/5 space-y-3">
              <div className="text-[11px] font-semibold text-[#8aebff] uppercase tracking-wider">
                Certified Testing Protocol
              </div>
              <p className="text-[13px] text-[#bbc9cd] leading-relaxed">
                {metric.detailedNotes}
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#859397]">
                <span>Testing Body: SGS Arctic Lab S.A.</span>
                <span className="text-[#8aebff] font-mono">STATUS: VERIFIED</span>
              </div>
            </div>
          </div>
        )}

        {/* Content for Expedition Step */}
        {expeditionStep && (
          <div className="py-4 space-y-4 overflow-y-auto flex-1">
            <div className="rounded-2xl overflow-hidden h-40 bg-[#132034] relative border border-white/10">
              <img
                src={expeditionStep.image}
                alt={expeditionStep.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 text-[#8aebff] font-mono text-[11px]">
                STAGE {expeditionStep.step}
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white font-mono text-[11px] flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#22d3ee]" />
                <span>{expeditionStep.depth}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-[18px] font-bold text-white">{expeditionStep.title}</h4>
              <p className="text-[13px] text-[#bbc9cd]">{expeditionStep.description}</p>
            </div>

            <div className="bg-[#132034] p-4 rounded-2xl border border-white/5 space-y-2 text-[12px]">
              <div className="text-[11px] font-semibold text-[#8aebff] uppercase tracking-wider">
                Diver Field Telemetry
              </div>
              <p className="text-[#bbc9cd] italic">"{expeditionStep.diverNote}"</p>
              <div className="pt-2 border-t border-white/5 text-[#859397] font-mono text-[11px]">
                GPS Coordinates: {expeditionStep.coordinates}
              </div>
            </div>
          </div>
        )}

        {/* Content for Monolith Glass Specimen */}
        {showMonolith && (
          <div className="py-4 space-y-4 overflow-y-auto flex-1">
            <div className="rounded-2xl overflow-hidden h-44 bg-[#132034] relative border border-white/10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHkuQyfhZZDd7RTdNQtjjhSc4P6NKNm7pltynKDBGgNpg6jBKSgzP7-DJDEMYLZayIEvuxTGOrvTQfAs_rPK6p0jC-KOb54Wt7m-NrxD2sB8Zk0Ks5pyfdS7W9mCRBjObSodEjxRDPnW5vCK4Q0IJCeLTkrqkkBx9vadoifXr6-LNMKQmNdWxhXskSlnt95oy8VsQwhbqOahkrBBHQG2HTw4roogyF41xbzPwDKNB6Kr4VqrcrjgST"
                alt="Hermetic Monolith Vessel"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/75 text-[#8aebff] font-mono text-[11px]">
                ISO 14044 VALIDATED
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-[18px] font-bold text-white">Hermetic Seal Monolith</h4>
              <p className="text-[13px] text-[#bbc9cd]">
                Manufactured with aerospace-grade flint optical cullet. Engineered to withstand 45 atmospheres of deep-ocean hydrostatic pressure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div className="bg-[#132034] p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[#859397] text-[10px] uppercase font-mono">Refractive Index</span>
                <div className="text-[14px] font-bold text-[#8aebff] font-mono">1.52 N/D</div>
                <p className="text-[11px] text-[#bbc9cd]">Pure optical transmission without color casting</p>
              </div>
              <div className="bg-[#132034] p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[#859397] text-[10px] uppercase font-mono">Pressure Rating</span>
                <div className="text-[14px] font-bold text-[#7bd0ff] font-mono">45 ATM (450M)</div>
                <p className="text-[11px] text-[#bbc9cd]">Cryogenic hermetic mechanical seal</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-2 py-3 rounded-full bg-[#1d2a3f] text-[#d6e3ff] hover:text-white font-medium text-[13px] transition-colors"
        >
          Close Inspection
        </button>
      </div>
    </div>
  );
};
