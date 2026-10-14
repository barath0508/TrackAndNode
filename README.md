# TraceAndNode (`traceandnode.com`)

> **High-speed, copyright-clean, AdSense-optimized hardware engineering utility platform.**  
> Delivering zero-latency client-side computation, 100% server-side static pre-rendering (SSG), anti-thin-content engineering articles, and interactive CAD/C++ code generators for embedded, IoT, and RF systems designers.

---

## 🛠️ The Three Core Engineering Workbenches

### 1. IoT Battery Life & Duty-Cycle Power Profiler
- **Target URL:** `/iot-battery-calculator`
- **Features:**
  - Multi-state power budget simulation: Deep Sleep, Standby/Sensing, Active Processing, RF Transmit (Tx), and RF Receive (Rx).
  - Physics-backed derating: Battery chemistry self-discharge (Li-ion 2%/mo, LiFePO4 1.5%/mo, LiSOCl2 0.1%/mo, CR2032 Alkaline/MnO2 1%/mo).
  - Power supply architecture: Direct battery connection, low-dropout linear regulator (LDO) with quiescent leakage current, and high-efficiency switching buck/boost DC-DC converters.
  - Interactive log-scale dynamic current waveform (`PowerWaveformSvg`) with zoom, dual cursor measurement, and one-click vector SVG export.
  - Programmatic presets: ESP32 Deep Sleep 18650, ESP32-C6 Zigbee/Thread on CR2032/CR2477, LoRaWAN SX1262 on LiFePO4, nRF52840 BLE Beacon, STM32L4 Stop-2 Mode with Li-SOCl2, and more.

### 2. Microstrip Patch Antenna & PCB Trace Impedance Calculator
- **Target URL:** `/patch-antenna-calculator`
- **Features:**
  - Balanis transmission line model with Hammerstad-Jensen dynamic fringing field extensions ($\Delta L$).
  - Inset notch feed matching ($y_0$) to calculate precise physical 50Ω feed penetration without external matching networks.
  - Interactive dimensional CAD blueprint (`PatchBlueprintSvg`) displaying physical copper width ($W$), resonant length ($L$), inset depth ($y_0$), feed width ($W_0$), and ground plane clearance ($W_g, L_g$).
  - One-click exporters: Parametric CST Studio Suite VBScript macro, KiCad PCB layout coordinates, and vector SVG blueprint download.
  - Programmatic presets: 2.45 GHz Wi-Fi / BLE on FR-4, 5.8 GHz FPV/ISM on Rogers RO4003C, 915 MHz US LoRa, 868 MHz EU/IN LoRa, and 1.575 GHz GPS L1 Ceramic Patch.

### 3. Interactive Microcontroller Pinout & Bus Conflict Checker
- **Target URL:** `/pinout-conflict-checker`
- **Features:**
  - Silicon-level hardware rule evaluator:
    - Direct GPIO multiplexer contention and bus pin collisions.
    - 7-bit I2C multi-drop slave address collision detection across shared Wire buses.
    - ESP32 / ESP32-S3 ADC2 SAR converter lockout when Wi-Fi/Bluetooth RF power amplifier is active.
    - Input-only GPIO drive violations (GPI34–39 lack output FETs).
    - Boot strapping pin voltage hazard alerts (GPIO0, 2, 12, 15 on ESP32, GPIO8/9 on ESP32-C6).
  - Interactive procedural QFN/LQFP package visualizer (`McuPackageSvg`) with pin-by-pin color-coded state indicators.
  - One-click export of clean-room, production-ready C/C++ `pin_config.h` headers.
  - Silicon profiles included: ESP32-WROOM-32, ESP32-S3-WROOM-1 (Octal PSRAM), ESP32-C6 (LP-IO), STM32F103 (BluePill 5V-FT), and Nordic nRF52840.

---

## ⚡ Programmatic SEO & AdSense Approval Architecture

- **Anti-Thin Content Engineering Engine (`WorkedExampleSection.tsx`):**
  - Generates a substantive, 750+ word semantic `<article>` on every single route and programmatic preset.
  - **Section 1 (id="mathematical-derivation"):** Live step-by-step mathematical derivation interpolating active user inputs into Balanis/Hammerstad/TI SLVA412 formulas.
  - **Section 2 (id="sensitivity-comparison"):** Multi-scenario sensitivity `<table>` comparing 5 adjacent hardware configurations (5 wake intervals x 3 LDO quiescent currents for IoT, 5 common PCB laminates for RF patch, full physical GPIO capability matrix for MCU).
  - **Section 3 (id="hardware-advisory"):** Engineering advisory note with a 4-point verification checklist (decoupling capacitor placement, VNA return-loss tuning, ground via stitching spacing $\le \lambda_g / 10$, pull-up sizing).
  - **Section 4 (id="engineering-faq"):** 4 expandable `<details open>` engineering FAQs pre-rendered open for instant search indexation and crawler discovery.
- **Hub-and-Spoke Internal Linking (`RelatedToolsMatrix.tsx`):**
  - Cross-Discipline Hardware Stack Card linking contextually between RF antennas, IoT battery profilers, and MCU pinouts.
  - Sibling Preset Directory Grid ensuring every programmatic route is reachable within 2 clicks from the homepage.
- **Triple-Layer Structured Data (`JsonLdSchema.tsx`):**
  - Synthesizes `@graph` JSON-LD with `SoftwareApplication`, `BreadcrumbList`, and `FAQPage`.
- **Pre-Approval Ad Slot Architecture (`AdSlot.tsx`):**
  - Reads `NEXT_PUBLIC_ADSENSE_APPROVED`. During review (`false`), returns `null` to prevent empty gray placeholder boxes from being flagged as "Site Under Construction". Once approved (`true`), activates zero-CLS pre-dimensioned containers (`min-h-[90px]` banner and `min-h-[280px]` mid content).
- **AdSense Seller Verification (`public/ads.txt`):**
  - Pre-configured at `https://traceandnode.com/ads.txt`. Replace `pub-0000000000000000` with your live Publisher ID.
- **Dynamic Social Cards (`opengraph-image.tsx`):**
  - Uses `next/og` (`ImageResponse`) to generate a 1200×630 dark oscilloscope vector social card.

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
- **Styling:** Tailwind CSS + CSS Custom Properties (Oscilloscope Dark Theme)
- **Visuals:** Pure React Inline SVG (Zero external charting library bloat)
- **Icons:** [lucide-react](https://lucide.dev/)
- **SEO & Schemas:** Structured JSON-LD (`SoftwareApplication`, `FAQPage`, `BreadcrumbList`), dynamic OpenGraph cards, `robots.txt`, `sitemap.xml`, and `ads.txt`.

---

## 📄 License
This project is open-source under the MIT License.
