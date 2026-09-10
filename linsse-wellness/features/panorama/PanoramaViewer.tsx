import { useRef, useState } from "react";

export function PanoramaViewer({ image, name }: { image: string; name: string }) {
  const [position, setPosition] = useState(50);
  const dragging = useRef<{ x: number; start: number } | null>(null);
  return <div className="panorama" role="img" aria-label={`Vista panorámica: ${name}`} tabIndex={0}
    style={{ backgroundImage: `url(${image})`, backgroundPosition: `${position}% center` }}
    onPointerDown={(event) => { dragging.current = { x: event.clientX, start: position }; event.currentTarget.setPointerCapture(event.pointerId); }}
    onPointerMove={(event) => { if (!dragging.current) return; setPosition(Math.max(0, Math.min(100, dragging.current.start - (event.clientX - dragging.current.x) / 7))); }}
    onPointerUp={() => { dragging.current = null; }}
    onKeyDown={(event) => { if (event.key === "ArrowLeft") setPosition((value) => Math.max(0, value - 4)); if (event.key === "ArrowRight") setPosition((value) => Math.min(100, value + 4)); }}>
    <div className="panorama-shade" />
  </div>;
}
