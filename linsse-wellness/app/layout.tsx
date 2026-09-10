import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linsse · Tu pausa, a tu manera",
  description: "Paisajes, respiración y experiencias suaves para regalarte unos minutos de calma.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
