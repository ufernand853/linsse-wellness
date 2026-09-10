import type { EnvironmentId, SessionMode } from "./types";

export const environments: { id: EnvironmentId; name: string; description: string; image: string; accent: string }[] = [
  { id: "lake", name: "Lago sereno", description: "Agua quieta entre montañas", image: "/scenes/lake.svg", accent: "#b8d4c6" },
  { id: "forest", name: "Bosque", description: "Luz suave entre los árboles", image: "/scenes/forest.svg", accent: "#9db69c" },
  { id: "beach", name: "Playa al atardecer", description: "Mar tranquilo y cielo cálido", image: "/scenes/beach.svg", accent: "#d9b899" },
  { id: "night", name: "Noche estrellada", description: "Silencio bajo un cielo profundo", image: "/scenes/night.svg", accent: "#a4a8c8" },
];

export const modes: { id: SessionMode; name: string; description: string }[] = [
  { id: "landscape", name: "Solo paisaje", description: "Observá y escuchá a tu manera." },
  { id: "breathing", name: "Respiración", description: "Una guía visual de 4 segundos al inhalar y 6 al exhalar." },
  { id: "bilateral", name: "Movimiento suave", description: "Una luz recorre la pantalla de forma continua." },
  { id: "guided", name: "Sesión guiada", description: "Paisaje, respiración y movimiento se alternan suavemente." },
];
