import React, { useState, useEffect } from 'react';
import { SceneId, TelemetryMetric, ExpeditionStep } from './types.ts';
import { audioEngine } from './components/AudioEngine.ts';
import { AmbientLighting } from './components/AmbientLighting.tsx';
import { NavigationScrubber } from './components/NavigationScrubber.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { DescentSection } from './components/DescentSection.tsx';
import { RescueSection } from './components/RescueSection.tsx';
import { ManifestoSection } from './components/ManifestoSection.tsx';
import { AllocationModal } from './components/AllocationModal.tsx';
import { OceanFilmModal } from './components/OceanFilmModal.tsx';
import { DetailModal } from './components/DetailModal.tsx';

export default function App() {
  const [currentDepth, setCurrentDepth] = useState<number>(12);
  const [activeScene, setActiveScene] = useState<SceneId>('heroSection');
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  // Modals state
  const [isAllocationOpen, setIsAllocationOpen] = useState<boolean>(false);
  const [isFilmOpen, setIsFilmOpen] = useState<boolean>(false);
  const [selectedMetric, setSelectedMetric] = useState<TelemetryMetric | null>(null);
  const [selectedExpeditionStep, setSelectedExpeditionStep] = useState<ExpeditionStep | null>(null);
  const [showMonolithDetail, setShowMonolithDetail] = useState<boolean>(false);

  // Scroll listener for dynamic depth telemetry & active scene tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Simulated depth calculation from 12m down to 140m
      const calculatedDepth = Math.min(140, Math.floor(12 + scrollY / 14));
      setCurrentDepth(calculatedDepth);
      audioEngine.setDepth(calculatedDepth);

      // Determine which section is active in viewport
      const sceneIds: SceneId[] = [
        'heroSection',
        'descentSection',
        'rescueSection',
        'manifestoSection',
      ];

      for (let i = sceneIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sceneIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveScene(sceneIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectScene = (sceneId: SceneId) => {
    setActiveScene(sceneId);
    const element = document.getElementById(sceneId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleToggleAudio = () => {
    const active = audioEngine.toggle();
    setIsAudioActive(active);
    if (active) {
      audioEngine.playBubbleSound();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#061327] text-[#d6e3ff] selection:bg-[#22d3ee]/30 selection:text-[#8aebff] overflow-x-hidden">
      {/* Dynamic Bathypelagic Lighting Layer */}
      <AmbientLighting depth={currentDepth} />

      {/* Main Container - Responsive layout matching design specs */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col min-h-screen">
        {/* Interactive Sticky Top Scrubber Navigation */}
        <NavigationScrubber
          currentDepth={currentDepth}
          activeScene={activeScene}
          onSelectScene={handleSelectScene}
          isAudioActive={isAudioActive}
          onToggleAudio={handleToggleAudio}
          onOpenAllocations={() => {
            audioEngine.playBubbleSound();
            setIsAllocationOpen(true);
          }}
        />

        {/* Section 1: Surface to Abyss (Hero Showcase) */}
        <HeroSection
          onDiveClick={() => handleSelectScene('descentSection')}
          onBottleClick={() => setShowMonolithDetail(true)}
        />

        {/* Section 2: The Descent (Abyssal Telemetry & Purity Specs) */}
        <DescentSection
          onOpenMetricModal={(metric) => setSelectedMetric(metric)}
          onOpenMonolithModal={() => setShowMonolithDetail(true)}
        />

        {/* Section 3: The Rescue & Mission (Guardian Expedition) */}
        <RescueSection
          onSelectStep={(step) => setSelectedExpeditionStep(step)}
        />

        {/* Section 4: Grand Reveal & Manifesto (Save Ocean. Choose Pure Water.) */}
        <ManifestoSection
          onDiscoverClick={() => setIsAllocationOpen(true)}
          onWatchFilmClick={() => setIsFilmOpen(true)}
        />
      </div>

      {/* Interactive Modals */}
      <AllocationModal
        isOpen={isAllocationOpen}
        onClose={() => setIsAllocationOpen(false)}
      />

      <OceanFilmModal
        isOpen={isFilmOpen}
        onClose={() => setIsFilmOpen(false)}
      />

      <DetailModal
        metric={selectedMetric}
        expeditionStep={selectedExpeditionStep}
        showMonolith={showMonolithDetail}
        onClose={() => {
          setSelectedMetric(null);
          setSelectedExpeditionStep(null);
          setShowMonolithDetail(false);
        }}
      />
    </div>
  );
}
