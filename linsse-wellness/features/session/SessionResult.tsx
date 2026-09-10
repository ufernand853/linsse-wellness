import { ArrowRight, Home, Leaf, RotateCcw } from "@/components/Icons";
import type { SessionConfig } from "./types";

export function SessionResult({ config, onRestart, onHome }: { config: SessionConfig; onRestart: () => void; onHome: () => void }) {
  const change = config.initialScore - config.finalScore;
  return <main className="result-page"><div className="result-card"><div className="brand result-brand"><span className="brand-mark"><Leaf /></span><span>Linsse</span></div><span className="setup-step">TU CIERRE</span><h1>Gracias por regalarte<br />este momento.</h1><div className="comparison"><div><small>ANTES</small><strong>{config.initialScore}</strong></div><ArrowRight /><div><small>AHORA</small><strong>{config.finalScore}</strong></div></div><p className="result-message">{change > 0 ? <>Tu nivel de tensión bajó <strong>{change} {change === 1 ? "punto" : "puntos"}</strong> durante esta sesión.</> : <>Gracias por completar la sesión. Las sensaciones pueden variar de una vez a otra.</>}</p><div className="result-actions"><button className="start-session" onClick={onRestart}><RotateCcw /> HACER OTRA PAUSA</button><button className="secondary-button" onClick={onHome}><Home /> VOLVER AL INICIO</button></div><small className="result-note">Este resultado es solo una referencia personal y no constituye una evaluación profesional.</small></div></main>;
}
