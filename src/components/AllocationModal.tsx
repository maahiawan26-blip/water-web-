import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Box, Droplet, ArrowRight } from 'lucide-react';
import { BottleAllocationOption } from '../types.ts';
import { audioEngine } from './AudioEngine.ts';

interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AllocationModal: React.FC<AllocationModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string>('six_pack');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [reservationCode, setReservationCode] = useState<string>('');

  if (!isOpen) return null;

  const allocationOptions: BottleAllocationOption[] = [
    {
      id: 'single',
      name: 'The Solitary Monolith',
      volume: '750ml Single Vessel',
      bottlesCount: 1,
      price: 18,
      plasticOffset: 50,
      description: 'Single hand-numbered bottle sealed in hermetic cryogenic presentation box.',
    },
    {
      id: 'six_pack',
      name: 'Expedition Reserve Case',
      volume: '6 × 750ml Vessels',
      bottlesCount: 6,
      price: 96,
      plasticOffset: 300,
      badge: 'MOST POPULAR',
      description: 'Packed in vacuum-insulated basalt fiber case. Includes Batch certificate.',
    },
    {
      id: 'cellar',
      name: 'Annual Arctic Allocation',
      volume: '12 × 750ml Quarterly',
      bottlesCount: 12,
      price: 180,
      plasticOffset: 600,
      badge: 'LIMITED ALLOCATION',
      description: 'Direct deep-well allocation with custom engraved titanium thermal stopper.',
    },
  ];

  const currentSelection = allocationOptions.find((opt) => opt.id === selectedOption)!;
  const totalPrice = currentSelection.price * quantity;
  const totalOffset = currentSelection.plasticOffset * quantity;

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playBubbleSound();
    const code = `ARC-${Math.floor(1000 + Math.random() * 9000)}-${currentSelection.bottlesCount * quantity}X`;
    setReservationCode(code);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0e1c30] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow halo */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#22d3ee]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8aebff]">
              ARCTIC ALLOCATION
            </span>
            <h3 className="text-[20px] font-bold text-[#d6e3ff]">Reserve Pure Ocean</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1d2a3f] text-[#bbc9cd] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#22d3ee]/20 border border-[#22d3ee]/50 text-[#8aebff] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#8aebff] font-mono">
                ALLOCATION CONFIRMED
              </span>
              <h4 className="text-[22px] font-bold text-white">Vessel Reserved</h4>
              <p className="text-[13px] text-[#bbc9cd] max-w-xs mx-auto">
                Your reservation code is <strong className="text-[#8aebff] font-mono">{reservationCode}</strong>. Our refrigerated transport courier will contact you with batch dispatch telemetry.
              </p>
            </div>

            <div className="bg-[#132034] p-4 rounded-2xl border border-white/5 text-left text-[12px] space-y-1.5">
              <div className="flex justify-between text-[#859397]">
                <span>Selection:</span>
                <span className="text-white font-medium">{currentSelection.name} ({quantity}x)</span>
              </div>
              <div className="flex justify-between text-[#859397]">
                <span>Marine Plastic Offset:</span>
                <span className="text-[#8aebff] font-semibold">{totalOffset} Ocean Bottles Diverted</span>
              </div>
              <div className="flex justify-between text-[#859397]">
                <span>Wellhead Batch:</span>
                <span className="text-white font-mono">Svalbard 0048-ARC</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-[#22d3ee] text-[#00363e] font-semibold text-[14px] hover:bg-[#2fd9f4] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleReserve} className="overflow-y-auto space-y-4 pt-3 flex-1">
            {/* Options */}
            <div className="space-y-2.5">
              {allocationOptions.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      audioEngine.playBubbleSound();
                      setSelectedOption(opt.id);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1d2a3f]/90 border-[#22d3ee] shadow-lg shadow-[#22d3ee]/10 ring-1 ring-[#22d3ee]'
                        : 'bg-[#132034]/50 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-[14px] font-semibold text-white">{opt.name}</span>
                          {opt.badge && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#22d3ee]/20 text-[#8aebff] border border-[#22d3ee]/30">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-[#8aebff] font-mono">{opt.volume}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[16px] font-bold text-white font-mono">${opt.price}</span>
                        <div className="text-[10px] text-[#7bd0ff]">
                          -{opt.plasticOffset} ocean bottles
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#859397] mt-1.5">{opt.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-[#132034] p-3 rounded-2xl border border-white/5">
              <span className="text-[13px] text-[#bbc9cd] font-medium">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full bg-[#1d2a3f] text-white flex items-center justify-center hover:bg-[#28354b]"
                >
                  -
                </button>
                <span className="text-[14px] font-bold font-mono text-white min-w-4 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-[#1d2a3f] text-white flex items-center justify-center hover:bg-[#28354b]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Impact Metric callout */}
            <div className="bg-[#22d3ee]/10 border border-[#22d3ee]/30 p-3 rounded-2xl flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-[#22d3ee] flex-shrink-0" />
              <div className="text-[12px] text-[#bbc9cd]">
                This allocation will finance the recovery of{' '}
                <strong className="text-[#8aebff] font-semibold">{totalOffset} ocean-bound plastic bottles</strong>.
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#2fd9f4] text-[#00363e] font-bold text-[15px] flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] transition-all"
              >
                <span>Confirm Reservation (${totalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center mt-2 text-[10px] text-[#859397]">
                Free climate-neutral cold shipping • Dispatched directly from Svalbard Well
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
