import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Gauge, Pause, Play, Settings2, Volume2, VolumeX, X } from "@/components/Icons";
import { BilateralStimulus } from "../bilateral/BilateralStimulus";
import { BreathingGuide } from "../breathing/BreathingGuide";
import { useAmbientAudio } from "../audio/useAmbientAudio";
import { PanoramaViewer } from "../panorama/PanoramaViewer";
import { environments } from "./data";
import type { SessionConfig } from "./types";

interface Props { config: SessionConfig; reducedMotion: boolean; onConfigChange: (patch: Partial<SessionConfig>) => void; onExit: () => void; onComplete: () => void; }

export function SessionExperience({ config, reducedMotion, onConfigChange, onExit, onComplete }: Props) {
  const total = Math.round(config.duration * 60);
  const [remaining, setRemaining] = useState(total);
  const [paused, setPaused] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const environment = environments.find((item) => item.id === config.environment) ?? environments[0];
  const { start: startAudio, stop: stopAudio } = useAmbientAudio(config.audioEnabled, config.ambientVolume, paused);
  const elapsedRatio = (total - remaining) / total;
  const guidedBreathing = config.mode === "guided" && elapsedRatio > .15 && elapsedRatio < .85;
  const guidedBilateral = config.mode === "guided" && elapsedRatio > .42 && elapsedRatio < .88;
  const breathing = config.mode === "breathing" || guidedBreathing;
  const bilateral = !reducedMotion && (config.mode === "bilateral" || guidedBilateral);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setRemaining((value) => {
      if (value <= 1) { window.clearInterval(interval); onComplete(); return 0; }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(interval);
  }, [paused, onComplete]);
  useEffect(() => () => stopAudio(), [stopAudio]);
  const clock = useMemo(() => `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`, [remaining]);

  const exit = () => { stopAudio(); onExit(); };
  return <main className="session-player" onPointerDown={startAudio}>
    <PanoramaViewer image={environment.image} name={environment.name} />
    <header className="session-top"><button onClick={exit}><ArrowLeft /> SALIR</button><div><span>{environment.name}</span><small>{config.mode === "guided" ? "Pausa guiada" : "Pausa libre"}</small></div><button className="round-control" aria-label={config.audioEnabled ? "Silenciar ambiente" : "Activar ambiente"} onClick={() => onConfigChange({ audioEnabled: !config.audioEnabled })}>{config.audioEnabled ? <Volume2 /> : <VolumeX />}</button></header>
    <BreathingGuide active={breathing} paused={paused} />
    <BilateralStimulus enabled={bilateral} paused={paused} speed={config.bilateralSpeed} size={config.stimulusSize} opacity={config.stimulusOpacity} />
    {reducedMotion && (config.mode === "bilateral" || config.mode === "guided") && <div className="reduced-badge">Movimiento reducido · solo respiración y paisaje</div>}
    <div className="session-bottom"><span className="session-clock">{clock}</span><div className="session-progress"><i style={{ width: `${elapsedRatio * 100}%` }} /></div><div className="session-actions"><button onClick={() => setPaused((value) => !value)}>{paused ? <Play /> : <Pause />} {paused ? "CONTINUAR" : "PAUSAR"}</button><button onClick={() => setSettingsOpen((value) => !value)}><Settings2 /> AJUSTAR</button></div></div>
    {settingsOpen && <aside className="preferences"><button className="close-prefs" onClick={() => setSettingsOpen(false)} aria-label="Cerrar ajustes"><X /></button><span className="setup-step">INTENSIDAD</span><h2>Ajustá la experiencia</h2><label>Velocidad<select value={config.bilateralSpeed} onChange={(event) => onConfigChange({ bilateralSpeed: event.target.value as SessionConfig["bilateralSpeed"] })}><option value="slow">Lenta</option><option value="medium">Media</option><option value="fast">Rápida suave</option></select></label><label>Tamaño<input type="range" min="18" max="48" value={config.stimulusSize} onChange={(event) => onConfigChange({ stimulusSize: Number(event.target.value) })} /></label><label>Brillo<input type="range" min=".35" max="1" step=".05" value={config.stimulusOpacity} onChange={(event) => onConfigChange({ stimulusOpacity: Number(event.target.value) })} /></label><label>Volumen ambiente<input type="range" min="0" max="1" step=".05" value={config.ambientVolume} onChange={(event) => onConfigChange({ ambientVolume: Number(event.target.value) })} /></label><p><Gauge /> Todos los valores se mantienen dentro de límites suaves.</p></aside>}
    {process.env.NODE_ENV === "development" && <button className="debug-skip" onClick={onComplete}>DEBUG · saltar al cierre</button>}
  </main>;
}
