# Design System: Editorial Systems Atelier

<!-- impeccable:design-schema 1 -->

## Visual Authority & Principles

A high-craft editorial monograph reverse-engineered from the award-winning design language of `ajaygirish.dev`, tailored exclusively for Ajay Girish—systems builder, BCA scholar, and creative technologist in Kerala, India (`10.8505° N, 76.2711° E`).

Refined editorial cadence with monumental serif typography, tactile paper-to-espresso color chapter transitions, and live interactive telemetry sandboxes:
- **Left Rail Navigation**: A fixed 64px vertical header rail on desktop featuring dynamic background/text inversion per chapter, a vertical hairline scroll progress indicator, and IST time telemetry.
- **Chapter Storytelling**: Five deliberate narrative chapters (`Prologue`, `Chapter I ─ Profile`, `Chapter II ─ Selected Systems`, `Chapter III ─ Disciplines & Lab`, `Chapter IV ─ Open Source Ledger`, and `Next chapter ─ Contact`).
- **Tactile Material Shifts**: Alternating chapters between deep espresso umber (`#262220` / `#1f1d1b`) and warm alabaster bone paper (`#faf9f6` / `#edeae6`).
- **Interactive Proof of Work**: Rolling odometer year counter (`2021` → `2026`), floating project image previews on hover, live 60fps mathematical Kalman filter simulation on `<canvas>`, and ESP32 UART packet hex builder.

## Color Tokens

### Dark Material Chapters (Prologue, Disciplines & Next Chapter)
- `--bg-dark`: `#262220` (warm charcoal espresso)
- `--bg-dark-deep`: `#1f1d1b` (charred umber ground)
- `--text-light`: `#f3eee8` (creamy ivory linen)
- `--text-light-muted`: `#b8b3ac` (refined warm stone)
- `--border-dark`: `#5a524d` (editorial hairline divider)

### Light Material Chapters (Profile, Selected Works & Arsenal)
- `--bg-light`: `#faf9f6` (warm alabaster bone paper)
- `--bg-travertine`: `#edeae6` (warm travertine linen)
- `--text-dark`: `#2e2b28` (rich espresso walnut ink)
- `--text-dark-muted`: `#6e6761` (editorial secondary text)
- `--border-light`: `#b8b3ac` (stone border)

### Telemetry Signals & Accents
- `--accent-terracotta`: `#8a8178` (scroll progress bar and structural markings)
- `--accent-cobalt`: `#38bdf8` (Kalman estimate vector path)
- `--accent-emerald`: `#34d399` (live status and verified indicators)

## Typography

- **Display & Headings**: `Instrument Serif` (Italic & Regular, letter-spacing -0.035em to -0.04em, line-height 0.92 to 1.1). Open-source twin of `PP Editorial Old`.
- **Body & Interface**: `Plus Jakarta Sans` / `-apple-system` (400-600 weight, line-height 1.6, max measure 65ch). Refined sans twin of `PP Neue Montreal`.
- **Metrics & Telemetry**: `JetBrains Mono` (`font-variant-numeric: tabular-nums`).

## Interactive Mechanics

1. **Desktop Left Rail Header (`EditorialRailHeader.jsx`)**: Tracks active section via scroll observer and dynamically changes header theme colors (`data-header-bg`, `data-header-text`, `data-header-border`) with a vertical scroll progress bar.
2. **Rolling Year Odometer (`EditorialHero.jsx`)**: Smooth rolling timeline counter (`2021` → `2026`).
3. **Floating Image Preview Reveal (`ChapterWork.jsx`)**: Smooth perspective image preview tracking list item hover.
4. **Interactive Kalman Simulation (`ChapterDisciplines.jsx`)**: Real-time 60fps HTML5 Canvas solving recursive 1D Kalman equations with dynamic gain readout and variance reduction.
5. **ESP32 UART Packet Builder (`ChapterDisciplines.jsx`)**: Real-time XOR checksum generator formatting 8-byte framing strings (`0xAA 0x02 ...`).
6. **Sliding Underline Animations (`.to-link-underline`)**: Smooth directional link underlines using cubic-bezier easing.
