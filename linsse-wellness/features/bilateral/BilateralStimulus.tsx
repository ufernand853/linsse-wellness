import type { BilateralSpeed, StimulusStyle } from "../session/types";

export function BilateralStimulus({ enabled, paused, speed, size, opacity, style }: { enabled: boolean; paused: boolean; speed: BilateralSpeed; size: number; opacity: number; style: StimulusStyle }) {
  if (!enabled) return null;
  return <div className={`bilateral-track ${paused ? "paused" : ""}`} aria-hidden="true"><span className={`bilateral-stimulus stimulus-${style} speed-${speed}`} style={{ width: size, height: size, opacity }}><i /><b /></span></div>;
}
