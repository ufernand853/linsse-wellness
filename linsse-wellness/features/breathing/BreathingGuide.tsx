import { useEffect, useState } from "react";

export function BreathingGuide({ active, paused }: { active: boolean; paused: boolean }) {
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
  useEffect(() => {
    if (!active || paused) return;
    const timeout = window.setTimeout(() => setPhase((current) => current === "inhale" ? "exhale" : "inhale"), phase === "inhale" ? 4000 : 6000);
    return () => window.clearTimeout(timeout);
  }, [active, paused, phase]);
  if (!active) return null;
  return <div className={`breathing-guide ${phase} ${paused ? "paused" : ""}`} aria-live="polite"><div className="breathing-orbit"><span /></div><strong>{paused ? "Sesión pausada" : phase === "inhale" ? "Inhalá" : "Exhalá"}</strong><small>{paused ? "Tomate el tiempo que necesites" : "Seguí el ritmo si te resulta cómodo."}</small></div>;
}
