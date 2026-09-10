import type { BilateralSpeed } from "../session/types";

export function BilateralStimulus({ enabled, paused, speed, size, opacity }: { enabled: boolean; paused: boolean; speed: BilateralSpeed; size: number; opacity: number }) {
  if (!enabled) return null;
  return <div className={`bilateral-track ${paused ? "paused" : ""}`} aria-hidden="true"><span className={`bilateral-light speed-${speed}`} style={{ width: size, height: size, opacity }} /></div>;
}
