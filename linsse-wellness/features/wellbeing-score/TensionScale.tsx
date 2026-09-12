interface TensionScaleProps { value: number; onChange: (value: number) => void; }

export function TensionScale({ value, onChange }: TensionScaleProps) {
  return <div className="tension-wrap">
    <div className="score-value" aria-live="polite">{value}</div>
    <input aria-label="Nivel de tensión de 0 a 10" className="tension-slider" type="range" min="0" max="10" step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    <div className="scale-labels"><span>0 · Muy tranquilo</span><span>10 · Mucha tensión</span></div>
    <div className="score-buttons" aria-label="Elegir nivel de tensión">{Array.from({ length: 11 }, (_, score) => <button aria-label={`${score} de 10`} aria-pressed={score === value} key={score} onClick={() => onChange(score)}>{score}</button>)}</div>
  </div>;
}
