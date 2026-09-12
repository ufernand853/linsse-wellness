import { useCallback, useEffect, useRef } from "react";
import type { EnvironmentId } from "../session/types";

export function useAmbientAudio(environment: EnvironmentId, enabled: boolean, volume: number, paused: boolean) {
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const start = useCallback(() => {
    if (contextRef.current) return;
    const context = new AudioContext();
    const buffer = context.createBuffer(2, context.sampleRate * 4, context.sampleRate);
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const data = buffer.getChannelData(channel);
      let last = 0;
      for (let i = 0; i < data.length; i++) { last = (last + (Math.random() * 2 - 1) * 0.025) / 1.012; data[i] = last * 0.8; }
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const profiles: Record<EnvironmentId, { cutoff: number; notes: number[] }> = {
      lake: { cutoff: 780, notes: [174.61, 261.63] }, forest: { cutoff: 1050, notes: [146.83, 220] },
      beach: { cutoff: 520, notes: [130.81, 196] }, night: { cutoff: 430, notes: [110, 164.81] },
    };
    const profile = profiles[environment];
    filter.type = "lowpass"; filter.frequency.value = profile.cutoff; source.buffer = buffer; source.loop = true;
    gain.gain.value = enabled && !paused ? volume * 0.42 : 0; source.connect(filter).connect(gain).connect(context.destination); source.start();
    const oscillators = profile.notes.map((frequency, index) => {
      const oscillator = context.createOscillator(); const toneGain = context.createGain();
      oscillator.type = "sine"; oscillator.frequency.value = frequency; toneGain.gain.value = index === 0 ? 0.018 : 0.009;
      oscillator.connect(toneGain).connect(gain); oscillator.start(); return oscillator;
    });
    contextRef.current = context; sourceRef.current = source; gainRef.current = gain;
    oscillatorsRef.current = oscillators;
  }, [enabled, environment, paused, volume]);

  useEffect(() => {
    const context = contextRef.current;
    const gain = gainRef.current;
    if (!context || !gain) return;
    gain.gain.setTargetAtTime(enabled && !paused ? volume * 0.42 : 0, context.currentTime, 0.25);
  }, [enabled, paused, volume]);

  const stop = useCallback(() => {
    sourceRef.current?.stop(); sourceRef.current?.disconnect(); oscillatorsRef.current.forEach((node) => { node.stop(); node.disconnect(); }); gainRef.current?.disconnect(); void contextRef.current?.close();
    sourceRef.current = null; gainRef.current = null; contextRef.current = null;
  }, []);
  useEffect(() => stop, [stop]);
  return { start, stop };
}
