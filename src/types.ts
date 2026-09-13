export interface TelemetryMetric {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  detailedNotes?: string;
}

export interface ExpeditionStep {
  step: string;
  title: string;
  description: string;
  image: string;
  depth: string;
  coordinates: string;
  diverNote: string;
}

export interface BottleAllocationOption {
  id: string;
  name: string;
  volume: string;
  bottlesCount: number;
  price: number;
  plasticOffset: number;
  badge?: string;
  description: string;
}

export type SceneId = 'heroSection' | 'descentSection' | 'rescueSection' | 'manifestoSection';
