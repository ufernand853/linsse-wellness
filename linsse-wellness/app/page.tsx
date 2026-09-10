"use client";

import { useEffect, useMemo, useState } from "react";
import { Compass, Heart, Leaf, Menu, Play, ShieldCheck, Sparkles, Waves, Wind } from "@/components/Icons";
import { SessionExperience } from "@/features/session/SessionExperience";
import { SetupWizard } from "@/features/session/SetupWizard";
import { SessionResult } from "@/features/session/SessionResult";
import type { SessionConfig, View } from "@/features/session/types";

const DEFAULT_CONFIG: SessionConfig = {
  environment: "lake",
  mode: "breathing",
  duration: 5,
  initialScore: 5,
  finalScore: 5,
  bilateralSpeed: "slow",
  stimulusSize: 28,
  stimulusOpacity: 0.78,
  audioEnabled: true,
  bilateralAudio: false,
  ambientVolume: 0.28,
};

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [config, setConfig] = useState<SessionConfig>(DEFAULT_CONFIG);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const startSetup = () => setView("setup");
  const updateConfig = (patch: Partial<SessionConfig>) => setConfig((current) => ({ ...current, ...patch }));

  if (view === "session") {
    return <SessionExperience config={config} reducedMotion={reducedMotion} onConfigChange={updateConfig} onExit={() => setView("home")} onComplete={() => setView("score")} />;
  }

  if (view === "result") {
    return <SessionResult config={config} onRestart={startSetup} onHome={() => setView("home")} />;
  }

  if (view === "setup" || view === "score") {
    return <SetupWizard config={config} stage={view} reducedMotion={reducedMotion} onChange={updateConfig} onBack={() => setView("home")} onStart={() => setView("session")} onResult={() => setView("result")} />;
  }

  return <Landing onStart={startSetup} />;
}

function Landing({ onStart }: { onStart: () => void }) {
  const features = useMemo(() => [
    { icon: <Waves />, title: "Paisajes que envuelven", copy: "Naturaleza en movimiento y sonidos suaves para desconectar del ruido." },
    { icon: <Wind />, title: "Respirá a tu ritmo", copy: "Una guía visual simple, sin exigencias. Solo una invitación a volver a vos." },
    { icon: <Sparkles />, title: "Movimiento que acompaña", copy: "Un estímulo visual sutil que viaja de un lado al otro con calma." },
  ], []);

  return (
    <main className="landing">
      <div className="hero-scene" aria-hidden="true"><div className="hero-glow" /><div className="hero-ridge far" /><div className="hero-ridge near" /></div>
      <nav className="nav shell" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Linsse inicio"><span className="brand-mark"><Leaf width={22} /></span><span>Linsse</span></a>
        <div className="nav-links"><a href="#experiencia">La experiencia</a><a href="#como-funciona">Cómo funciona</a><a href="#bienestar">Bienestar</a></div>
        <button className="nav-start" onClick={onStart}>Empezar <span>→</span></button>
        <button className="mobile-menu" aria-label="Abrir menú"><Menu /></button>
      </nav>

      <section className="hero shell" id="inicio">
        <div className="eyebrow"><span /> TU PAUSA, A TU MANERA</div>
        <h1>Volvé a vos.<br /><em>Respirá.</em></h1>
        <p className="hero-copy">Un espacio inmersivo para bajar el ritmo, regular tu energía y regalarte unos minutos de calma.</p>
        <button className="primary-cta" onClick={onStart}><span className="play-icon"><Play width={17} fill="currentColor" /></span> EMPEZAR MI PAUSA <span className="arrow">→</span></button>
        <div className="hero-meta"><span><span className="status-dot" /> Sin registro</span><span>2–10 minutos</span><span>Tu privacidad, siempre</span></div>
      </section>

      <section className="features-section" id="experiencia">
        <div className="shell">
          <div className="section-kicker"><span>UNA EXPERIENCIA SIMPLE</span><i /></div>
          <div className="features-grid">
            <div className="features-intro"><h2>Todo lo que necesitás<br />para hacer una <em>pausa.</em></h2><p>Sin objetivos que cumplir. Sin métricas que alcanzar. Solo vos, un paisaje y unos minutos.</p></div>
            <div className="feature-list">{features.map((feature, index) => <article className="feature-row" key={feature.title}><div className="feature-number">0{index + 1}</div><div className="feature-icon">{feature.icon}</div><div><h3>{feature.title}</h3><p>{feature.copy}</p></div></article>)}</div>
          </div>
        </div>
      </section>

      <section className="how-section" id="como-funciona">
        <div className="shell how-grid"><div><div className="eyebrow dark"><span /> CÓMO FUNCIONA</div><h2>Tres pasos.<br />Un momento <em>tuyo.</em></h2></div><ol><li><b>01</b><span><strong>Elegí tu entorno</strong>Playa, bosque, lago o noche. El lugar que hoy te haga bien.</span></li><li><b>02</b><span><strong>Elegí cómo acompañarte</strong>Solo paisaje, respiración o movimiento visual suave.</span></li><li><b>03</b><span><strong>Dejá que el tiempo fluya</strong>Podés pausar o salir en cualquier momento. Vos tenés el control.</span></li></ol></div>
      </section>

      <section className="wellbeing shell" id="bienestar"><div className="wellbeing-card"><div className="wellbeing-icon"><ShieldCheck /></div><div><span>BIENESTAR, NO EXIGENCIA</span><h2>Un refugio breve<br />en medio del día.</h2><p>Esta aplicación está diseñada para relajación y bienestar general. No sustituye atención médica, psicológica ni profesional.</p><small>Si una sesión te resulta incómoda, podés detenerla en cualquier momento.</small></div><button className="quiet-cta" onClick={onStart}>Explorar la experiencia <Compass width={18} /></button></div></section>

      <footer className="footer shell"><div className="brand"><span className="brand-mark"><Leaf width={18} /></span><span>Linsse</span></div><p>Un momento de calma, cuando lo necesites.</p><span><Heart width={14} /> Hecho para respirar mejor</span></footer>
    </main>
  );
}
