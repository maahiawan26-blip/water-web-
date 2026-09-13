/**
 * Procedural underwater sound generator using standard Web Audio API.
 * Simulates gentle abyssal oceanic currents, deep hydro-acoustic resonance, and micro-bubbles.
 */

class HydroAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported on this device.');
    }
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public setDepth(depthMeters: number) {
    if (!this.filterNode || !this.ctx) return;
    // As depth increases, filter frequency gets deeper and more muffled
    const targetFreq = Math.max(90, 420 - depthMeters * 2);
    this.filterNode.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.4);
  }

  public playBubbleSound() {
    if (!this.ctx || !this.isRunning) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Rising frequency creates bubbly water pop
      const startFreq = 400 + Math.random() * 200;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.12);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // ignore
    }
  }

  private start() {
    if (!this.ctx) return;
    try {
      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 1.2);
      this.masterGain.connect(this.ctx.destination);

      // Create brown/pink noise buffer for oceanic deep swell
      const bufferSize = this.ctx.sampleRate * 4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain compensation
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Lowpass hydro filter
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(260, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(3.5, this.ctx.currentTime);

      // Low frequency modulation for undulating swells
      this.lfoNode = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfoNode.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 8 second wave period
      lfoGain.gain.setValueAtTime(80, this.ctx.currentTime);

      this.lfoNode.connect(lfoGain);
      lfoGain.connect(this.filterNode.frequency);

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.masterGain);

      this.lfoNode.start();
      this.noiseNode.start();
      this.isRunning = true;
    } catch (e) {
      console.error('Failed to start hydro-audio:', e);
      this.isRunning = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) {
      this.isRunning = false;
      return;
    }
    try {
      this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.5);
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.noiseNode?.disconnect();
          this.lfoNode?.stop();
          this.lfoNode?.disconnect();
        } catch {
          // ignore
        }
        this.isRunning = false;
      }, 600);
    } catch {
      this.isRunning = false;
    }
  }
}

export const audioEngine = new HydroAudioEngine();
