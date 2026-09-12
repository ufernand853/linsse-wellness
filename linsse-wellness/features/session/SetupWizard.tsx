import Image from "next/image";
import { ArrowLeft, Bookmark, Check, Leaf } from "@/components/Icons";
import { environments, modes } from "./data";
import type { SessionConfig, View } from "./types";
import { TensionScale } from "../wellbeing-score/TensionScale";

interface Props { config: SessionConfig; stage: Extract<View, "setup" | "score">; reducedMotion: boolean; onChange: (patch: Partial<SessionConfig>) => void; onBack: () => void; onStart: () => void; onResult: () => void; }

export function SetupWizard({ config, stage, reducedMotion, onChange, onBack, onStart, onResult }: Props) {
  if (stage === "score") return <ScoreScreen config={config} onChange={onChange} onResult={onResult} />;
  const savePlace = () => localStorage.setItem("linsse-my-place", JSON.stringify({ environment: config.environment, mode: config.mode, duration: config.duration, bilateralSpeed: config.bilateralSpeed, stimulusStyle: config.stimulusStyle }));
  return <main className="setup-page">
    <header className="setup-header shell"><button className="icon-button" onClick={onBack} aria-label="Volver al inicio"><ArrowLeft /></button><div className="brand"><span className="brand-mark"><Leaf width={19} /></span><span>Linsse</span></div><span className="step-label">Prepará tu pausa</span></header>
    <div className="setup-shell">
      <section><span className="setup-step">01 · ENTORNO</span><h1>¿Dónde querés estar?</h1><p>Elegí el paisaje que mejor acompañe este momento.</p><div className="environment-grid">{environments.map((environment) => <button key={environment.id} aria-pressed={config.environment === environment.id} className={`environment-card ${config.environment === environment.id ? "selected" : ""}`} onClick={() => onChange({ environment: environment.id })}><Image src={environment.image} width={480} height={240} alt="" /><span className="card-check"><Check /></span><strong>{environment.name}</strong><small>{environment.description}</small></button>)}</div></section>
      <section><span className="setup-step">02 · EXPERIENCIA</span><h2>¿Cómo querés acompañarte?</h2><div className="mode-grid">{modes.map((mode) => <button key={mode.id} aria-pressed={config.mode === mode.id} className={config.mode === mode.id ? "selected" : ""} onClick={() => onChange({ mode: mode.id })}><span className="radio-dot" /><strong>{mode.name}</strong><small>{mode.description}</small></button>)}</div>{reducedMotion && <p className="motion-note">Tu dispositivo prefiere movimiento reducido. El estímulo visual se desactivará; podés usar solo respiración y paisaje.</p>}</section>
      {(config.mode === "bilateral" || config.mode === "guided") && !reducedMotion && <section className="stimulus-setup"><span className="setup-step">PERSONALIZÁ EL MOVIMIENTO</span><h2>Elegí cómo querés seguirlo</h2><div className="stimulus-options"><label>Apariencia<select value={config.stimulusStyle} onChange={(event) => onChange({ stimulusStyle: event.target.value as SessionConfig["stimulusStyle"] })}><option value="butterfly">Mariposa de luz</option><option value="light">Luz suave</option></select></label><label>Velocidad<select value={config.bilateralSpeed} onChange={(event) => onChange({ bilateralSpeed: event.target.value as SessionConfig["bilateralSpeed"] })}><option value="slow">Lenta · 5,5 segundos</option><option value="medium">Media · 3,8 segundos</option><option value="fast">Rápida · 2,6 segundos</option></select></label></div><p>También vas a poder cambiarlo durante la sesión desde “Ajustar”.</p></section>}
      <section className="options-row"><div><span className="setup-step">03 · DURACIÓN</span><h2>¿Cuánto tiempo tenés?</h2><div className="duration-options">{[2, 5, 10, ...(process.env.NODE_ENV === "development" ? [0.5] : [])].map((duration) => <button className={config.duration === duration ? "selected" : ""} key={duration} onClick={() => onChange({ duration })}>{duration === .5 ? "30 seg" : `${duration} min`}</button>)}</div></div><button className="save-place" onClick={savePlace}><Bookmark /> Guardar como Mi lugar</button></section>
      <section className="initial-score"><span className="setup-step">04 · ANTES DE EMPEZAR</span><h2>¿Cómo sentís tu nivel de tensión ahora?</h2><p>No hay respuestas correctas. Es solo una referencia para vos.</p><TensionScale value={config.initialScore} onChange={(initialScore) => onChange({ initialScore })} /></section>
      <button className="start-session" onClick={onStart}>INICIAR MI PAUSA <span>→</span></button><p className="comfort-note">Podés pausar o salir en cualquier momento.</p>
    </div>
  </main>;
}

function ScoreScreen({ config, onChange, onResult }: { config: SessionConfig; onChange: (patch: Partial<SessionConfig>) => void; onResult: () => void }) {
  return <main className="score-page"><div className="score-panel"><div className="complete-mark"><Check /></div><span className="setup-step">SESIÓN FINALIZADA</span><h1>¿Cómo sentís tu nivel<br />de tensión ahora?</h1><p>Tomate un momento. Elegí el número que mejor represente cómo estás.</p><TensionScale value={config.finalScore} onChange={(finalScore) => onChange({ finalScore })} /><button className="start-session" onClick={onResult}>VER MI CIERRE <span>→</span></button></div></main>;
}
