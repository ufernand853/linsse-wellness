import type { SVGProps } from "react";

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>; }
export const Leaf = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z"/><path d="M4 21c3-6 7-9 12-12"/></Icon>;
export const Play = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path fill={p.fill || "none"} d="m8 5 11 7-11 7Z"/></Icon>;
export const Menu = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Icon>;
export const Waves = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M2 8c3-3 5 3 8 0s5 3 8 0 4 0 4 0M2 13c3-3 5 3 8 0s5 3 8 0 4 0 4 0M2 18c3-3 5 3 8 0s5 3 8 0 4 0 4 0"/></Icon>;
export const Wind = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M3 8h11c4 0 4-5 1-5-2 0-3 1-3 2M3 12h16c4 0 3 5 0 5-2 0-3-1-3-2M3 16h8"/></Icon>;
export const Sparkles = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5ZM19 17l.6 2.4L22 20l-2.4.6L19 23l-.6-2.4L16 20l2.4-.6Z"/></Icon>;
export const ShieldCheck = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z"/><path d="m8 12 2.5 2.5L16 9"/></Icon>;
export const Heart = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M20 8c0 5-8 11-8 11S4 13 4 8c0-5 6-6 8-2 2-4 8-3 8 2Z"/></Icon>;
export const Compass = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5Z"/></Icon>;
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="m15 18-6-6 6-6M9 12h11"/></Icon>;
export const ArrowRight = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="m9 18 6-6-6-6M4 12h11"/></Icon>;
export const Check = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="m5 12 4 4L19 6"/></Icon>;
export const Bookmark = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M6 4h12v17l-6-4-6 4Z"/></Icon>;
export const Volume2 = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M5 9H2v6h3l5 4V5Z"/><path d="M14 9c2 2 2 4 0 6M17 6c4 4 4 8 0 12"/></Icon>;
export const VolumeX = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M5 9H2v6h3l5 4V5Z"/><path d="m15 9 6 6m0-6-6 6"/></Icon>;
export const Pause = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M8 5v14M16 5v14"/></Icon>;
export const Settings2 = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M4 7h10m4 0h2M4 17h2m4 0h10M14 5v4M6 15v4"/></Icon>;
export const X = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="m5 5 14 14M19 5 5 19"/></Icon>;
export const Gauge = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M4 18a9 9 0 1 1 16 0M12 14l4-4"/></Icon>;
export const Home = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3Z"/></Icon>;
export const RotateCcw = (p: SVGProps<SVGSVGElement>) => <Icon {...p}><path d="M4 8V3m0 0h5M4 3l4 4a8 8 0 1 1-2 8"/></Icon>;
