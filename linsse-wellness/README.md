# Linsse Wellness

MVP web de relajación y bienestar general. Combina paisajes inmersivos, una guía de respiración y movimiento visual bilateral suave. No es una herramienta terapéutica ni sustituye atención profesional.

## Stack y decisiones

- **Next.js 16 (App Router), React 19 y TypeScript**.
- **Panorama liviano propio:** una imagen panorámica local desplazable con pointer, touch y teclado. Evita cargar Three.js para el MVP, funciona sin giroscopio y no depende de servicios externos.
- **Audio:** Web Audio API crea un ambiente filtrado de volumen bajo después de una interacción del usuario.
- **Animación:** CSS para respiración y estímulo bilateral, con desactivación bajo `prefers-reduced-motion`.
- **Estado:** estado React en memoria. `localStorage` se usa únicamente para “Mi lugar” y nunca para las puntuaciones subjetivas.

## Arquitectura

```text
app/                         shell, metadata y estilos globales
components/                  iconografía SVG local
features/audio/              ambiente Web Audio y cleanup
features/bilateral/          estímulo visual independiente
features/breathing/          ciclo 4 s / 6 s independiente
features/panorama/           visor interactivo sin librerías pesadas
features/session/            configuración, flujo, player y resultado
features/wellbeing-score/    escala accesible 0–10
public/scenes/               cuatro paisajes panorámicos SVG locales
```

## Ejecución

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`. Para validar producción:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Flujo implementado

Inicio → entorno → modo → duración → puntuación inicial → sesión → puntuación final → cierre. La sesión incluye pausa/reanudación, salida inmediata, mute, temporizador, ajustes de velocidad/tamaño/brillo/volumen y cleanup al desmontar. En desarrollo aparecen la duración de 30 segundos y el salto al cierre.

### Configuración de imágenes, movimiento y sonido

- Las imágenes disponibles y sus rutas se configuran en `features/session/data.ts`; los archivos locales viven en `public/scenes/`. Reemplazá un SVG conservando el nombre o agregá allí un nuevo asset y registralo en `environments`.
- Al elegir “Movimiento suave” o “Sesión guiada” aparece una sección para seleccionar mariposa/luz y velocidad. Durante la sesión, “Ajustar” permite cambiar además tamaño y brillo. El estímulo está integrado al visor y acompaña horizontalmente el panorama al arrastrarlo.
- El sonido no usa archivos musicales: es un paisaje sonoro ambiental generado con Web Audio, con un perfil diferente por entorno. Dentro de la sesión hay que pulsar “Activar sonido ambiente” una vez para cumplir la política de reproducción de los navegadores; luego se controla con mute y volumen.

## Eventos conceptuales (sin analytics)

Si se agrega instrumentación en el futuro, el límite propuesto es: `session_started`, `session_completed`, `session_abandoned`, `mode_selected` y `environment_selected`. El MVP no conecta ningún servicio ni envía información.

## Compatibilidad y límites

Diseñado mobile-first para Safari iOS, Chrome Android, Chrome/Edge y Safari desktop modernos. El panorama usa drag/touch y flechas del teclado; no se incluyó giroscopio. Los paisajes son ilustraciones SVG locales de bajo peso, no fotografías 360 equirectangulares. El ambiente Web Audio es sintético para mantener el proyecto autocontenido y puede permanecer silenciado hasta la primera interacción por las políticas del navegador.
