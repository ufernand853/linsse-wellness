import { useCallback, useEffect, useRef } from "react";

export function useAmbientAudio(enabled: boolean, volume: number, paused: boolean) {
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

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
    filter.type = "lowpass"; filter.frequency.value = 620; source.buffer = buffer; source.loop = true;
    gain.gain.value = volume * 0.18; source.connect(filter).connect(gain).connect(context.destination); source.start();
    contextRef.current = context; sourceRef.current = source; gainRef.current = gain;
  }, [volume]);

  useEffect(() => {
    const context = contextRef.current;
    const gain = gainRef.current;
    if (!context || !gain) return;
    gain.gain.setTargetAtTime(enabled && !paused ? volume * 0.18 : 0, context.currentTime, 0.25);
  }, [enabled, paused, volume]);

  const stop = useCallback(() => {
    sourceRef.current?.stop(); sourceRef.current?.disconnect(); gainRef.current?.disconnect(); void contextRef.current?.close();
    sourceRef.current = null; gainRef.current = null; contextRef.current = null;
  }, []);
  useEffect(() => stop, [stop]);
  return { start, stop };
}
