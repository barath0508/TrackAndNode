# TrackAndNode (`trackandnode.dev`)

> **High-speed, copyright-clean, AdSense-optimized hardware engineering utility platform.**  
> Delivering zero-latency client-side computation, 100% server-side static pre-rendering (SSG), and interactive CAD/C++ code generators for embedded, IoT, and RF systems designers.

---

## 🛠️ The Three Core Engineering Workbenches

### 1. IoT Battery Life & Duty-Cycle Power Profiler
- **Target URL:** `/iot-battery-calculator`
- **Features:**
  - Multi-state power budget simulation: Deep Sleep, Standby/Sensing, Active Processing, RF Transmit (Tx), and RF Receive (Rx).
  - Physics-backed derating: Battery chemistry self-discharge (Li-ion 2%/mo, LiFePO4 1.5%/mo, LiSOCl2 0.1%/mo, CR2032 Alkaline/MnO2 1%/mo).
  - Power supply architecture: Direct battery connection, low-dropout linear regulator (LDO) with quiescent leakage current, and high-efficiency switching buck/boost DC-DC converters.
  - Interactive log-scale dynamic current waveform (`PowerWaveformSvg`) with zoom, dual cursor measurement, and one-click vector SVG export.
  - Programmatic presets: ESP32, ESP32-C6 Zigbee/Thread, nRF52840 BLE, STM32L4 LoRaWAN, Raspberry Pi Pico W, and more.

### 2. Microstrip Patch Antenna & PCB Trace Impedance Calculator
- **Target URL:** `/patch-antenna-calculator`
- **Features:**
  - Balanis transmission line model with Hammerstad-Jensen dynamic fringing field extensions ($\Delta L$).
  - Inset notch feed matching ($y_0$) to calculate precise physical 50Ω feed penetration without external matching networks.
  - Interactive dimensional CAD blueprint (`PatchBlueprintSvg`) displaying physical copper width ($W$), resonant length ($L$), inset depth ($y_0$), feed width ($W_0$), and ground plane clearance ($W_g, L_g$).
  - One-click exporters: Parametric CST Studio Suite VBScript macro, KiCad PCB layout coordinates, and vector SVG blueprint download.
  - Programmatic presets: 2.4 GHz Wi-Fi / BLE on FR-4 & Rogers RO4350B, 5.8 GHz FPV/ISM, 868/915 MHz LoRa, 1.575 GHz GPS L1, and 24 GHz K-Band Radar.

### 3. Interactive Microcontroller Pinout & Bus Conflict Checker
- **Target URL:** `/pinout-conflict-checker`
- **Features:**
  - Silicon-level hardware rule evaluator:
    - Direct GPIO multiplexer contention and bus pin collisions.
    - 7-bit I2C multi-drop slave address collision detection across shared Wire buses.
    - ESP32 / ESP32-S3 ADC2 SAR converter lockout when Wi-Fi/Bluetooth RF power amplifier is active.
    - Input-only GPIO drive violations (GPI34–39 lack output FETs).
    - Boot strapping pin voltage hazard alerts (GPIO0, 2, 12, 15).
  - Interactive procedural QFN/LQFP package visualizer (`McuPackageSvg`) with pin-by-pin color-coded state indicators.
  - One-click export of clean-room, production-ready C/C++ `pin_config.h` headers.
  - Silicon profiles included: ESP32-WROOM-32, ESP32-S3-WROOM-1, ESP32-C6, STM32F401RE, Raspberry Pi RP2040, Arduino Uno R4 (RA4M1), and Nordic nRF52840.

---

## ⚡ Architectural Principles & Non-Negotiables

- **100% Client-Side Computation, 100% Server-Side Static Pre-Rendering (SSG):** All 46+ routes and programmatic presets are pre-rendered statically via Next.js App Router (`generateStaticParams`). Mathematical operations, slider inputs, and SVG rendering execute at 60 FPS purely on the client with zero backend API latency and zero compute costs.
- **Zero Copyright or Trademark Infringement:** Never scrapes third-party graphics, vendor pinout PNGs, or trademarked logos. All visuals are 100% procedural vector graphics built with clean React `<svg>`. Hardware electrical traits are public factual physical constants.
- **Strict Core Web Vitals & Zero-CLS AdSense Compliance:** Cumulative Layout Shift (CLS) stays `< 0.05`. Hard-coded responsive ad containers (`#ad-slot-top-banner` with `min-h-[90px]` and `#ad-slot-mid-content` with `min-h-[280px]`) prevent layout reflow during ad injection.
- **Oscilloscope / Soldermask Dark Theme:** Engineered with Slate-950/900 backgrounds, Electric Cyan (`#06B6D4`), Emerald, Amber, and Rose accents, paired with `JetBrains Mono` for all telemetry indicators and numerical readouts.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or bun

### Local Development
```bash
git clone https://github.com/barath0508/TrackAndNode.git
cd TrackAndNode
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Static Build
```bash
npm run build
```
Generates 46 fully static pre-rendered routes ready for zero-latency deployment on Vercel, Cloudflare Pages, AWS CloudFront, or any static web host.

---

## 📐 Technology Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, SSG static pre-rendering, Turbopack)
- **Language:** TypeScript 5 (Strict mode)
- **Styling:** Tailwind CSS + CSS Custom Properties
- **Visuals:** Pure React Inline SVG (Zero external charting library bloat)
- **Icons:** [lucide-react](https://lucide.dev/)
- **SEO & Schemas:** Structured JSON-LD (`SoftwareApplication`, `FAQPage`, `BreadcrumbList`), dynamic OpenGraph cards, `robots.txt`, and `sitemap.xml`.

---

## 📄 License
This project is open-source under the MIT License.
