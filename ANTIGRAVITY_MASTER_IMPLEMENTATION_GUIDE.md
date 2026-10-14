# ANTIGRAVITY MASTER IMPLEMENTATION GUIDE
## BenchPulse (`benchpulse.dev`) — Hardware Engineering Utility Platform
**Document Revision:** 1.0.0  
**Status:** Implementation-Ready Architecture Specification  
**Target Platform:** Next.js (App Router, SSG/Client Hybrid, TypeScript Strict)  
**Author:** Principal Full-Stack Systems Architect, RF/Embedded Hardware Engineer & Technical SEO Specialist

---

## 1. Project Understanding, Assumptions & Core Mission

### 1.1 Project Purpose & Mission
BenchPulse (`benchpulse.dev`) is a copyright-clean, zero-backend, search-optimized engineering utility platform designed for electrical engineers, firmware developers, RF hardware designers, and IoT systems architects. It delivers three zero-latency, client-side engineering tools with instant static indexing:
1. **IoT Battery Life & Duty-Cycle Power Profiler:** Simulates multi-state sleep/wake/transmit cycles, accounting for LDO quiescent leakage, DC-DC converter efficiency, and battery chemistry self-discharge derating.
2. **Microstrip Patch Antenna & PCB Trace Impedance Calculator:** Computes physical copper patch geometry ($W$, $L$), inset feed notch depth ($y_0$), fringing field extensions ($\Delta L$), characteristic microstrip trace impedance ($Z_0$), and parametric CST Studio Suite CAD macros using the closed-form Balanis and Hammerstad-Jensen transmission line models.
3. **Interactive Microcontroller Pinout & Bus Conflict Checker:** Evaluates physical pin allocations against silicon-level hardware constraints (direct collisions, I2C 7-bit bus address conflicts, ESP32 ADC2/Wi-Fi SAR ADC lockout, input-only GPIO drive violations, and boot strapping pin hazards) with auto-generated C++ `pin_config.h` headers.

### 1.2 Core Architectural Non-Negotiables
1. **100% Client-Side Computation, 100% Server-Side Pre-Rendering (SSG):** All calculators and programmatic presets must be pre-rendered as static HTML via Next.js `generateStaticParams()` for immediate search indexation. Once loaded in the browser, all mathematical evaluations, slider interactions, and SVG recalculations execute client-side at 60 FPS without external API dependencies or compute costs.
2. **Zero Copyright or Trademark Infringement:** No copyrighted pinout diagrams, vendor pinout graphics, datasheet excerpts, or proprietary logos are scraped or hotlinked. Hardware physical traits (pin capabilities, dielectric constants, quiescent currents) are public physical facts. All visuals (2D RF blueprints, current waveforms, IC pin packages) are procedurally rendered via parametric React `<svg>` components. Every page features a clean-room trademark disclaimer.
3. **Core Web Vitals & Zero-CLS AdSense Architecture:** Cumulative Layout Shift (CLS) must remain strictly `< 0.05`. Every ad placement container (`#ad-slot-top-banner` and `#ad-slot-mid-content`) reserves fixed, immutable physical dimensions prior to script hydration.
4. **Oscilloscope & Soldermask Engineering Aesthetics:** Dark-mode first UI (Slate-950 background, Slate-900 surface cards) accented with Electric Cyan (`#06B6D4`), Emerald (`#10B981`), Amber (`#F59E0B`), Rose (`#F43F5E`), and Copper Gold (`#D97706`). Numerical displays, unit badges, and pin labels use `JetBrains Mono`; instructional text and UI use `Inter`.

### 1.3 Key Assumptions
- **Hosting Target:** Vercel or modern static CDN edge (Cloudflare Pages / AWS S3 + CloudFront).
- **Client Requirements:** Modern evergreen browsers supporting ES2022, CSS Grid, CSS Variables, SVG 2.0, and Clipboard API.
- **Backend Infrastructure:** Zero dedicated application server required; all routing and assets compile to static HTML, CSS, and JS bundles during build time.

---

## 2. Product Requirements & Feature Hierarchy

### 2.1 Essential Launch Features (P0)
- **IoT Battery Life Workbench:**
  - Dual-synchronized numeric and slider inputs for battery capacity (mAh), chemistries, annual self-discharge, LDO quiescent drain ($\mu\text{A}$), converter efficiency ($\eta$), sleep current ($\mu\text{A}$), sensor wake current (mA), sensor duration (ms), RF transmit current (mA), RF burst duration (ms), and cycle period (seconds).
  - Parametric logarithmic current pulse waveform visualizer (`PowerWaveformSvg`).
  - Metric ribbon (Est. Battery Life in Years/Days, Average Current in $\mu\text{A}$, Daily Consumption in mAh) with 1-click clipboard copy.
  - Active energy breakdown percentage (Sleep vs. Wake vs. TX vs. Regulator Overhead).
  - Diagnostic warnings for high LDO quiescent drain ($I_q > 30\ \mu\text{A}$) and small-battery TX voltage droop risk ($I_{tx} > 150\text{ mA}$ with $C < 300\text{ mAh}$).
- **Microstrip Patch Antenna Workbench:**
  - Dual-synchronized inputs for resonant frequency ($f_0$ in GHz), dielectric constant ($\varepsilon_r$), substrate height ($h$ in mm), and characteristic target impedance ($Z_0$ in $\Omega$).
  - Substrate presets (FR-4, Rogers RO4003C, Rogers RO4350B, RT/duroid 5880, Alumina, PTFE).
  - Parametric 2D top-down CAD blueprint (`PatchBlueprintSvg`) displaying physical patch ($W \times L$), inset feed notches ($y_0$, $g$), feedline width ($W_f$), quarter-wave matching section, and ground plane clearance with technical dimension leader lines.
  - Export capabilities: Raw SVG file download, CST Studio Suite VBScript macro export, and KiCad PCB footprint dimension summary copy.
  - Metric ribbon (Patch Width, Patch Length, Inset Notch Depth, Feedline Width, Ground Plane Width/Length).
- **Microcontroller Pinout & Conflict Checker Workbench:**
  - Support for 5 target microcontrollers: ESP32-WROOM-32 (38-pin), ESP32-C6-DevKitC-1, ESP32-S3-DevKitC-1, STM32F103C8T6 (BluePill), and Arduino UNO R4 Minima.
  - Peripheral assignment engine: I2C (Bus 0 & 1 with selectable 7-bit addresses), SPI (Bus 0 & 1), UART, Analog ADC, PWM Outputs, Digital GPIO, and External Radio/Wi-Fi states.
  - Procedural dual-inline / QFN SVG chip package (`McuPackageSvg`) rendering color-coded pin labels, allocated peripherals, and pulsing red warning indicators for conflicted pins.
  - 5 deterministic conflict rules:
    1. Direct GPIO pin collisions (excluding shared I2C buses).
    2. I2C address bus collision (identical 7-bit addresses on same physical bus).
    3. ESP32 ADC2 + Wi-Fi radio concurrent conflict.
    4. Input-only GPIO drive violation (ESP32 GPIO 34–39 driven as output/PWM/I2C/SPI).
    5. Boot strapping pin risk warnings (ESP32 GPIO 0, 2, 12, 15; ESP32-C6 GPIO 8, 9).
  - 1-click C++ header generator (`pin_config.h`) with compile-time safety notes.
- **Programmatic SEO (pSEO) Engine:**
  - 30+ statically pre-rendered dynamic routes across the 3 tools with rich technical metadata.
  - Semantic dynamic worked mathematical guide (`WorkedExampleSection.tsx`) displaying exact formula proofs with substituted user parameters.
  - Engineering trade-off sensitivity table comparing active parameters against standard baselines.
  - Dynamic JSON-LD structured data (`SoftwareApplication` and `FAQPage`).
- **AdSense & Legal Compliance:**
  - Zero-CLS pre-sized AdSense wrapper (`AdSlot.tsx`).
  - Mandatory policy pages: `/about` (E-E-A-T hardware engineering credentials), `/privacy-policy` (AdSense cookie/DART notice), `/terms` (engineering liability disclaimer), and `/contact` (errata submission form).

### 2.2 Post-Launch Enhancements (P1 / P2)
- P1: Coaxial probe-feed patch antenna calculation mode.
- P1: Multi-cell battery configuration calculator (series/parallel balancing and self-discharge mismatch).
- P2: ESP32-H2 and Raspberry Pi Pico (RP2040/RP2350) pinout matrices.
- P2: KiCad 8 footprint Python script generator plugin.

---

## 3. Competitor Analysis & Market Differentiation

| Feature / Metric | Conventional Web Calculators (e.g., Omni, Everything RF, Random Hobbyist Blogs) | BenchPulse (`benchpulse.dev`) |
| :--- | :--- | :--- |
| **Calculation Latency** | 200–800 ms (often triggered by HTTP form POST or bloated React states) | **< 16 ms (60 FPS pure client-side synchronous state updates)** |
| **Visualizations** | Static raster diagrams, low-res PNGs, or heavy Chart.js/Plotly bundles (300KB+) | **Custom parametric inline SVG (zero library bloat, scalable, CAD-accurate)** |
| **Copyright Compliance** | Scraped datasheet PNGs, vendor logo infringements, copied pinout charts | **100% clean-room vector graphics, factual silicon register tables** |
| **Layout Stability (CLS)** | CLS > 0.25 due to dynamically injected Google auto-ads shifting workbench | **CLS < 0.05 with hard-coded reserved slots (`min-h-[90px]`, `min-h-[280px]`)** |
| **Engineering Depth** | Basic $L \times W$ without inset feed impedance matching; simple $mAh / mA$ battery math | **Hammerstad-Jensen fringing & inset feed depth; LDO quiescent & chemistry self-discharge** |
| **Embedded Validation** | Generic pin lists without conflict checks | **Real-time silicon rule evaluator (ADC2+Wi-Fi, strapping pins, I2C address conflicts)** |
| **CAD & Code Export** | None (manual transcription) | **CST Studio Suite VBScript macro, KiCad dimensions, C++ `pin_config.h` headers** |
| **SEO Architecture** | Single generic tool page with thin text | **30+ targeted pSEO long-tail presets with complete dynamic mathematical proofs** |

---

## 4. Technology Selection & Architectural Deliverables

### 4.1 Technology Stack & Justification

```
+-----------------------------------------------------------------------------------+
|                                   BENCHPULSE STACK                                |
+-----------------------------------------------------------------------------------+
| Framework:       Next.js 14+ (App Router, Strict TypeScript, SSG Static Export)  |
| Styling:         Tailwind CSS + CSS Custom Properties (Oscilloscope Theme)        |
| Typography:      next/font/google (Inter for prose, JetBrains Mono for telemetry) |
| Icons:           lucide-react (lightweight SVG tree-shaken icons)                 |
| Visuals:         Parametric React <svg> Components (Zero external charting bloat) |
| SEO & Schemas:   Next.js Metadata API + JSON-LD (SoftwareApplication + FAQPage)   |
| Testing:         Vitest (pure math unit tests) + Playwright (responsive/CLS tests)|
+-----------------------------------------------------------------------------------+
```

- **Why Next.js App Router (SSG):** Provides compile-time `generateStaticParams()` to render all 30+ long-tail keyword routes as static HTML for instant Googlebot indexing, while serving zero client-side server runtime overhead.
- **Why Pure React SVG over Charting Libraries (Chart.js / Recharts / D3):** Typical charting libraries add 60KB–180KB of minified JavaScript, degrade Interaction to Next Paint (INP), and cannot cleanly render technical CAD leader lines or custom dual-inline microcontroller packages. Parametric React SVGs weigh `< 6KB`, scale infinitely, and render synchronously with state.
- **Why Tailwind CSS + CSS Variables:** Enables exact color tokens without runtime CSS-in-JS overhead, guaranteeing sub-millisecond theme resolution and zero layout shifts.

### 4.2 Application Architecture Diagram

```
[ Browser Client / Googlebot Crawler ]
                  │
        (HTTP GET / Fast CDN)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│ Next.js App Router Static Server-Side Pre-Rendering (SSG)    │
│  ├── Dynamic Preset Routes: /[tool]/[preset]/page.tsx       │
│  ├── Default Calculator Routes: /[tool]/page.tsx            │
│  ├── Dynamic Sitemap & Robots: /sitemap.xml, /robots.txt    │
│  └── Compliance Pages: /about, /privacy-policy, /terms      │
└────────────────────────────────┬────────────────────────────┘
                                 │ Hydrates UI Shell
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│ Client-Side Interactive Engine (React 18 / 60 FPS)           │
│  ├── Synchronized Inputs (Numeric Box <-> Smooth Slider)    │
│  │                                                          │
│  ├── Pure TypeScript Mathematical Cores (lib/)              │
│  │   ├── iot-battery-math.ts                                │
│  │   ├── patch-antenna-math.ts                              │
│  │   └── pinout-conflict-engine.ts                          │
│  │                                                          │
│  ├── Procedural Parametric SVG Renderers (components/)      │
│  │   ├── PowerWaveformSvg.tsx                               │
│  │   ├── PatchBlueprintSvg.tsx                              │
│  │   └── McuPackageSvg.tsx                                  │
│  │                                                          │
│  └── Output Exporters (Clipboard API, CST VBScript, C++ .h) │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Directory Structure & Complete File Inventory

```
src/
├── app/
│   ├── layout.tsx                        # Global root layout, font bindings, JSON-LD, Nav, Footer
│   ├── page.tsx                          # Engineering hub homepage (tool selector, KPIs, links)
│   ├── sitemap.ts                        # Static XML sitemap generator (root + 30+ pSEO routes)
│   ├── robots.ts                         # Robots.txt generator (all-access for Googlebot/AdSense)
│   ├── iot-battery-calculator/
│   │   ├── page.tsx                      # Default IoT Battery Calculator page
│   │   └── [preset]/page.tsx             # Dynamic preset route for IoT Battery pSEO
│   ├── patch-antenna-calculator/
│   │   ├── page.tsx                      # Default Microstrip Patch Antenna page
│   │   └── [preset]/page.tsx             # Dynamic preset route for RF Antenna pSEO
│   ├── pinout-conflict-checker/
│   │   ├── page.tsx                      # Default MCU Pinout Conflict Checker page
│   │   └── [preset]/page.tsx             # Dynamic preset route for MCU Pinout pSEO
│   ├── about/page.tsx                    # E-E-A-T engineering methodology & credentials
│   ├── privacy-policy/page.tsx           # AdSense cookie, CCPA/GDPR, and DART policy
│   ├── terms/page.tsx                    # Terms of service, engineering liability disclaimer
│   └── contact/page.tsx                  # Contact information & hardware errata submission
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                    # Sticky header with tool switcher & theme toggle
│   │   ├── Footer.tsx                    # Clean-room trademark disclaimer, sitemap links
│   │   └── AdSlot.tsx                    # Zero-CLS ID-targeted Google AdSense wrapper
│   ├── calculators/
│   │   ├── iot/
│   │   │   ├── IotBatteryWorkbench.tsx   # Split-pane interactive state controller
│   │   │   └── PowerWaveformSvg.tsx      # Parametric log-scale current pulse SVG chart
│   │   ├── rf/
│   │   │   ├── PatchAntennaWorkbench.tsx # Split-pane RF calculator interactive controller
│   │   │   └── PatchBlueprintSvg.tsx     # CAD-style 2D copper + inset feed SVG blueprint
│   │   └── pinout/
│   │       ├── PinoutCheckerWorkbench.tsx# Peripheral allocator & conflict analyzer
│   │       └── McuPackageSvg.tsx         # Interactive SVG dual-inline / QFN chip diagram
│   ├── ui/
│   │   ├── DualInput.tsx                 # Reusable numeric box + synchronized range slider
│   │   ├── MetricCard.tsx                # KPI readout card with 1-click clipboard copy
│   │   ├── PresetPillBar.tsx             # Horizontal scrollable ribbon for quick configuration
│   │   └── MobileTelemetryDock.tsx       # Sticky h-16 bottom dock with primary metric
│   └── seo/
│       ├── WorkedExampleSection.tsx      # Dynamic step-by-step math proof & sensitivity table
│       └── JsonLdSchema.tsx              # SoftwareApplication + FAQPage JSON-LD injector
├── data/
│   ├── mcu-profiles.ts                   # Factual pinout & electrical profiles for 5 MCUs
│   ├── sensor-radio-profiles.ts          # Factual current profiles for sensors & radios
│   ├── rf-substrates.ts                  # Dielectric constants & loss tangents (FR4, Rogers, etc.)
│   └── pseo-presets.ts                   # 30+ long-tail SEO preset definitions & metadata
└── lib/
    ├── iot-battery-math.ts               # Pure TS duty-cycle, LDO, & capacity derating math
    ├── patch-antenna-math.ts             # Pure TS Balanis / Hammerstad-Jensen RF engine
    └── pinout-conflict-engine.ts         # Deterministic silicon rule evaluator & conflict solver
```

---

## 6. UI/UX Design System: "Oscilloscope & Soldermask"

### 6.1 Color Palette & Design Tokens

All tokens are defined in `src/app/globals.css` via CSS variables and mirrored in `tailwind.config.ts`.

| Token Name | Hex Code / Value | Usage Description |
| :--- | :--- | :--- |
| `--bg-base` | `#090D16` (Slate-950) | Dark mode primary page background |
| `--bg-surface` | `#111827` (Slate-900) | Workbench cards, input panels, dropdown menus |
| `--border-subtle`| `#1E293B` (Slate-800) | Card boundaries, dividers, slider tracks |
| `--border-focus` | `#06B6D4` (Cyan-500) | Focused input outlines, active tabs, leader lines |
| `--accent-rf` | `#06B6D4` (Cyan-500) | Primary signal lines, telemetry accents, active pills |
| `--state-pass` | `#10B981` (Emerald-500)| Valid hardware check, optimal efficiency, GPIO/PWM |
| `--state-warn` | `#F59E0B` (Amber-500) | Boot strapping pins, high LDO quiescent warnings, ADC |
| `--state-hazard`| `#F43F5E` (Rose-500)  | Direct pin collision, bus address conflict, flash pins |
| `--copper-fill` | `#D97706` (Amber-600) | 2D antenna patch copper representation |
| `--copper-edge` | `#F59E0B` (Amber-500) | Copper boundary stroke in CAD blueprints |
| `--substrate-fr4`| `#064E3B` (Emerald-950)| Soldermask green dielectric substrate background |
| `--text-primary`| `#F8FAFC` (Slate-50)  | Headings, primary numerical telemetry |
| `--text-muted` | `#94A3B8` (Slate-400) | Field labels, descriptive text, formula annotations |

### 6.2 Typography Hierarchy
- **Primary Technical Font (`next/font/google` Inter):** Used for site navigation, explanatory prose, engineering guides, and modal dialogs.
- **Precision Telemetry Font (`next/font/google` JetBrains_Mono):** Mandatory for all numerical input fields, unit badges (`mA`, `GHz`, `mm`, `mil`), pin numbers (`GPIO12`), C++ code snippets, and metric ribbon cards.
- **Type Scale:**
  - Page `h1`: `text-3xl font-extrabold tracking-tight lg:text-4xl`
  - Section `h2`: `text-xl font-bold tracking-tight text-slate-100 lg:text-2xl`
  - Card Title `h3`: `text-sm font-semibold uppercase tracking-wider text-cyan-400`
  - Primary Metric Value: `font-mono text-2xl font-bold tracking-tight text-white lg:text-3xl`
  - Metric Unit / Label: `font-mono text-xs uppercase tracking-wider text-slate-400`
  - Input Text: `font-mono text-sm font-medium text-slate-100`

### 6.3 Desktop Layout Grid (Viewport $\ge$ 1024px)
- **Container:** `max-w-7xl mx-auto px-6 py-8`
- **Header:** Breadcrumbs + Title + Horizontal quick-preset pill bar (`overflow-x-auto py-2 flex gap-2`)
- **Top Ad Banner (`#ad-slot-top-banner`):** Centered container strictly reserving `min-h-[90px] w-full`
- **12-Column Split Workbench:**
  - **Left Pane (5 Columns, `col-span-5 space-y-5`):** Parameter cards grouped into logical sections (e.g., Section 1: Power Source & LDO; Section 2: Active Duty Profile). Features dual-synchronized inputs (`DualInput.tsx`).
  - **Right Pane (7 Columns, `col-span-7 sticky top-20 space-y-6`):**
    - **Row 1:** 3-column high-contrast KPI metric ribbon (`MetricCard.tsx`).
    - **Row 2:** Fixed aspect ratio container (`aspect-[16/10] bg-slate-950 border border-slate-800 rounded-xl p-4 relative overflow-hidden`) hosting the parametric SVG visualizer with floating action buttons (Export SVG, Copy CAD script).
    - **Row 3:** Real-time engineering diagnostic banner displaying passes, warnings, or critical hardware violation alerts.
- **Mid Ad Banner (`#ad-slot-mid-content`):** Positioned strictly below the workbench, reserving `min-h-[280px] w-full`.
- **Worked Mathematical Guide (`WorkedExampleSection.tsx`):** Complete semantic `<article>` guide.

### 6.4 Mobile Layout Architecture (Viewport $<$ 768px)
- **Padding:** `px-4 pt-4 pb-28` (reserves clearance for the sticky telemetry dock).
- **Single Column Flow:** Preset pills collapse into a horizontal touch-swipe bar; parameter cards stack vertically.
- **Touch Ergonomics:** Every interactive input, range slider thumb, and button enforces `min-h-[44px] min-w-[44px]`.
- **Mobile Sticky Bottom Telemetry Dock (`MobileTelemetryDock.tsx`):**
  - Container: `fixed bottom-0 inset-x-0 z-50 h-16 bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/30 px-4 flex items-center justify-between lg:hidden`.
  - Left Side: Primary calculated result in `font-mono font-bold text-cyan-400` (e.g., `Est. Life: 1.84 Yrs`).
  - Right Side: Button "Jump to Diagram $\downarrow$" triggering smooth scroll directly to the SVG blueprint.

---

## 7. Mathematical & Engineering Core Specifications

### 7.1 Module 1: IoT Battery Life & Duty-Cycle Engine (`src/lib/iot-battery-math.ts`)

#### Governing Physical Equations
Total operational period $T_{\text{cycle}}$ (seconds):
$$T_{\text{cycle}} = t_{\text{sensor}} + t_{\text{tx}} + t_{\text{sleep}}$$

Time-weighted average current draw $I_{\text{avg}}$ (mA) across conversion efficiency $\eta_{\text{reg}}$ and quiescent drain $I_q$:
$$I_{\text{avg}} = \frac{1}{\eta_{\text{reg}}} \left( \frac{I_{\text{sleep}} \cdot t_{\text{sleep}} + I_{\text{sensor}} \cdot t_{\text{sensor}} + I_{\text{tx}} \cdot t_{\text{tx}}}{T_{\text{cycle}}} \right) + I_q$$

Equivalent annual self-discharge current $I_{\text{sd}}$ (mA) spread over 8,760 hours/year:
$$I_{\text{sd}} = \frac{C_{\text{rated}} \cdot r_{\text{sd}}}{8760}$$

Total usable run time $T_{\text{hours}}$ accounting for chemical derating factor $k_{\text{usable}}$ (0.70 for coin cells, 0.85 for Li-Ion/LiFePO4):
$$T_{\text{hours}} = \frac{C_{\text{rated}} \cdot k_{\text{usable}}}{I_{\text{avg}} + I_{\text{sd}}}$$
$$T_{\text{days}} = \frac{T_{\text{hours}}}{24}, \quad T_{\text{years}} = \frac{T_{\text{days}}}{365.25}$$

#### Pure TypeScript Implementation
```typescript
export interface IotPowerInput {
  batteryCapacityMah: number;
  usableFraction: number;          // 0.70 (Coin cell) to 0.90 (LiFePO4)
  annualSelfDischargeRate: number; // e.g., 0.02 (2% for LiFePO4), 0.12 (LiPo)
  regulatorQuiescentUa: number;    // e.g., 2.5 uA for HT7333, 55 uA for AMS1117
  regulatorEfficiency: number;     // 0.80 to 0.96
  sleepCurrentUa: number;          // e.g., 5 uA for ESP32-C6, 15 uA for ESP32
  wakeSensorCurrentMa: number;     // Active MCU + sensor read current (mA)
  wakeSensorDurationMs: number;    // Sensor read duration (ms)
  txCurrentMa: number;             // Radio burst current (mA)
  txDurationMs: number;            // Transmission duration (ms)
  wakeIntervalSeconds: number;     // Cycle repetition period (s)
}

export interface IotPowerOutput {
  averageCurrentMa: number;
  averageCurrentUa: number;
  sleepDutyCyclePercent: number;
  estimatedHours: number;
  estimatedDays: number;
  estimatedYears: number;
  dailyChargeConsumedMah: number;
  energyBreakdownPercent: {
    sleep: number;
    sensorWake: number;
    radioTx: number;
    regulatorOverhead: number;
  };
  warnings: string[];
}

export function calculateIotBatteryLife(input: IotPowerInput): IotPowerOutput {
  const tWakeSec = Math.max(0.0001, input.wakeSensorDurationMs / 1000);
  const tTxSec = Math.max(0.0001, input.txDurationMs / 1000);
  const totalPeriodSec = Math.max(input.wakeIntervalSeconds, tWakeSec + tTxSec + 0.001);
  const tSleepSec = Math.max(0, totalPeriodSec - tWakeSec - tTxSec);

  const iSleepMa = input.sleepCurrentUa / 1000;
  const iQuiescentMa = input.regulatorQuiescentUa / 1000;
  const eff = Math.min(1, Math.max(0.1, input.regulatorEfficiency));

  const sleepChargeMas = (iSleepMa * tSleepSec) / eff;
  const sensorChargeMas = (input.wakeSensorCurrentMa * tWakeSec) / eff;
  const txChargeMas = (input.txCurrentMa * tTxSec) / eff;
  const regChargeMas = iQuiescentMa * totalPeriodSec;

  const totalCycleChargeMas = sleepChargeMas + sensorChargeMas + txChargeMas + regChargeMas;
  const averageCurrentMa = totalCycleChargeMas / totalPeriodSec;

  const selfDischargeCurrentMa =
    (input.batteryCapacityMah * Math.max(0, input.annualSelfDischargeRate)) / 8760;

  const effectiveCapacityMah = input.batteryCapacityMah * input.usableFraction;
  const totalDrainMa = averageCurrentMa + selfDischargeCurrentMa;

  const estimatedHours = totalDrainMa > 0 ? effectiveCapacityMah / totalDrainMa : 0;
  const estimatedDays = estimatedHours / 24;
  const estimatedYears = estimatedDays / 365.25;

  const warnings: string[] = [];
  if (input.regulatorQuiescentUa > 30) {
    warnings.push(
      `High LDO Quiescent Drain (${input.regulatorQuiescentUa} µA): Switching from a standard linear regulator (like AMS1117) to an ultra-low-quiescent LDO (like MCP1700 or HT7333) will significantly increase standby battery life.`
    );
  }
  if (input.txCurrentMa > 150 && input.batteryCapacityMah < 300) {
    warnings.push(
      `Peak Current Warning (${input.txCurrentMa} mA): High radio TX bursts on small coin-cell or micro-LiPo batteries cause severe internal voltage droop. Place a 100 µF–470 µF low-ESR bulk capacitor across VCC/GND.`
    );
  }

  return {
    averageCurrentMa,
    averageCurrentUa: averageCurrentMa * 1000,
    sleepDutyCyclePercent: (tSleepSec / totalPeriodSec) * 100,
    estimatedHours,
    estimatedDays,
    estimatedYears,
    dailyChargeConsumedMah: averageCurrentMa * 24,
    energyBreakdownPercent: {
      sleep: totalCycleChargeMas > 0 ? (sleepChargeMas / totalCycleChargeMas) * 100 : 0,
      sensorWake: totalCycleChargeMas > 0 ? (sensorChargeMas / totalCycleChargeMas) * 100 : 0,
      radioTx: totalCycleChargeMas > 0 ? (txChargeMas / totalCycleChargeMas) * 100 : 0,
      regulatorOverhead: totalCycleChargeMas > 0 ? (regChargeMas / totalCycleChargeMas) * 100 : 0,
    },
    warnings,
  };
}
```

---

### 7.2 Module 2: Microstrip Patch Antenna Engine (`src/lib/patch-antenna-math.ts`)

#### Governing Closed-Form Equations (Balanis / Hammerstad-Jensen)
Given $f_0$ (Hz), $c = 299,792,458\text{ m/s}$, $\varepsilon_r$, and substrate height $h$ (m):

1. **Physical Patch Width ($W$):**
$$W = \frac{c}{2 f_0} \sqrt{\frac{2}{\varepsilon_r + 1}}$$

2. **Effective Permittivity ($\varepsilon_{\text{eff}}$):**
$$\varepsilon_{\text{eff}} = \frac{\varepsilon_r + 1}{2} + \frac{\varepsilon_r - 1}{2} \left( 1 + 12 \frac{h}{W} \right)^{-0.5}$$

3. **Hammerstad Fringing Length Extension ($\Delta L$):**
$$\Delta L = 0.412 h \frac{(\varepsilon_{\text{eff}} + 0.3) \left(\frac{W}{h} + 0.264\right)}{(\varepsilon_{\text{eff}} - 0.258) \left(\frac{W}{h} + 0.8\right)}$$

4. **Physical Patch Length ($L$):**
$$L_{\text{eff}} = \frac{c}{2 f_0 \sqrt{\varepsilon_{\text{eff}}}}, \quad L = L_{\text{eff}} - 2 \Delta L$$

5. **Edge Resistance ($R_{\text{edge}}$) & Inset Feed Depth ($y_0$) for $50\ \Omega$ Match:**
$$G_1 = \frac{1}{90} \left( \frac{W}{\lambda_0} \right)^2, \quad R_{\text{edge}} = \frac{1}{2 G_1}$$
$$y_0 = \frac{L}{\pi} \arccos\left(\sqrt{\frac{Z_0}{R_{\text{edge}}}}\right)$$

6. **Microstrip Feedline Synthesis (Hammerstad-Jensen):**
Calculates the exact copper trace width $W_f$ for characteristic impedance $Z_0 = 50\ \Omega$ and quarter-wave impedance $Z_Q = \sqrt{Z_0 \cdot R_{\text{edge}}}$.

#### Pure TypeScript Implementation
```typescript
export interface PatchAntennaInput {
  frequencyGhz: number;       // e.g. 2.45 GHz
  dielectricConstant: number; // e.g. 4.4 for FR-4, 3.55 for RO4003C
  substrateHeightMm: number;  // e.g. 1.6 mm
  targetImpedanceOhm: number; // Standard 50 Ohm
}

export interface PatchAntennaOutput {
  patchWidthMm: number;
  patchLengthMm: number;
  effectivePermittivity: number;
  fringingExtensionMm: number;
  effectiveLengthMm: number;
  freeSpaceWavelengthMm: number;
  guidedWavelengthMm: number;
  edgeImpedanceOhm: number;
  insetFeedDepthMm: number;
  insetGapMm: number;
  feedTraceWidthMm: number;
  quarterWaveTransformerWidthMm: number;
  quarterWaveTransformerLengthMm: number;
  minGroundWidthMm: number;
  minGroundLengthMm: number;
  cstVbMacroSnippet: string;
}

export function calculateMicrostripPatch(input: PatchAntennaInput): PatchAntennaOutput {
  const c = 299792458; // m/s
  const f0 = input.frequencyGhz * 1e9;
  const er = Math.max(1.01, input.dielectricConstant);
  const hMm = Math.max(0.05, input.substrateHeightMm);

  const lambda0Meters = c / f0;
  const lambda0Mm = lambda0Meters * 1000;

  // 1. Patch Width W
  const wMeters = (c / (2 * f0)) * Math.sqrt(2 / (er + 1));
  const wMm = wMeters * 1000;

  // 2. Effective Dielectric Constant
  const ratioWh = wMm / hMm;
  const eEff = (er + 1) / 2 + ((er - 1) / 2) * Math.pow(1 + 12 / ratioWh, -0.5);

  // 3. Hammerstad Fringing Extension Delta L
  const num = (eEff + 0.3) * (ratioWh + 0.264);
  const den = (eEff - 0.258) * (ratioWh + 0.8);
  const deltaLMm = 0.412 * hMm * (num / den);

  // 4. Effective & Actual Patch Length L
  const lEffMm = (c / (2 * f0 * Math.sqrt(eEff))) * 1000;
  const lMm = lEffMm - 2 * deltaLMm;

  // 5. Edge Impedance & Inset Feed Position
  const g1 = (1 / 90) * Math.pow(wMm / lambda0Mm, 2);
  const rEdge = Math.min(450, Math.max(60, 1 / (2 * g1)));
  const z0 = input.targetImpedanceOhm;
  const ratioZ = Math.min(1, z0 / rEdge);
  const y0Mm = (lMm / Math.PI) * Math.acos(Math.sqrt(ratioZ));

  // 6. Microstrip Trace Width Synthesis (Hammerstad-Jensen)
  const calcTraceWidthMm = (targetZ: number): number => {
    const A =
      (targetZ / 60) * Math.sqrt((er + 1) / 2) +
      ((er - 1) / (er + 1)) * (0.23 + 0.11 / er);
    const B = (377 * Math.PI) / (2 * targetZ * Math.sqrt(er));
    const wOverHNarrow = (8 * Math.exp(A)) / (Math.exp(2 * A) - 2);
    if (wOverHNarrow < 2) {
      return wOverHNarrow * hMm;
    }
    const wOverHWide =
      (2 / Math.PI) *
      (B - 1 - Math.log(2 * B - 1) + ((er - 1) / (2 * er)) * (Math.log(B - 1) + 0.39 - 0.61 / er));
    return wOverHWide * hMm;
  };

  const feedTraceWidthMm = calcTraceWidthMm(z0);
  const zQuarter = Math.sqrt(z0 * rEdge);
  const quarterWaveTransformerWidthMm = calcTraceWidthMm(zQuarter);
  const guidedWavelengthMm = lambda0Mm / Math.sqrt(eEff);
  const quarterWaveTransformerLengthMm = guidedWavelengthMm / 4;
  const insetGapMm = Math.max(0.25, feedTraceWidthMm * 0.35);

  const minGroundWidthMm = wMm + 6 * hMm;
  const minGroundLengthMm = lMm + 6 * hMm;

  const cstVbMacroSnippet = `' Parametric CST Studio Suite Macro — Generated by BenchPulse
Sub Main()
  StoreDoubleParameter "patch_W", ${wMm.toFixed(3)}
  StoreDoubleParameter "patch_L", ${lMm.toFixed(3)}
  StoreDoubleParameter "sub_h", ${hMm.toFixed(3)}
  StoreDoubleParameter "inset_y0", ${y0Mm.toFixed(3)}
  StoreDoubleParameter "feed_W", ${feedTraceWidthMm.toFixed(3)}
  StoreDoubleParameter "gnd_W", ${minGroundWidthMm.toFixed(3)}
  StoreDoubleParameter "gnd_L", ${minGroundLengthMm.toFixed(3)}
End Sub`;

  return {
    patchWidthMm: wMm,
    patchLengthMm: lMm,
    effectivePermittivity: eEff,
    fringingExtensionMm: deltaLMm,
    effectiveLengthMm: lEffMm,
    freeSpaceWavelengthMm: lambda0Mm,
    guidedWavelengthMm,
    edgeImpedanceOhm: rEdge,
    insetFeedDepthMm: y0Mm,
    insetGapMm,
    feedTraceWidthMm,
    quarterWaveTransformerWidthMm,
    quarterWaveTransformerLengthMm,
    minGroundWidthMm,
    minGroundLengthMm,
    cstVbMacroSnippet,
  };
}
```

---

### 7.3 Module 3: Microcontroller Pinout & Bus Conflict Solver (`src/lib/pinout-conflict-engine.ts`)

#### Deterministic Validation Rules
1. **Rule 1: Direct Physical Collision (`DIRECT_COLLISION`):** Two non-bus peripherals mapped to the exact same physical GPIO.
2. **Rule 2: I2C Shared Bus Address Collision (`I2C_ADDRESS_COLLISION`):** Multiple peripherals mapped to the same I2C bus with identical 7-bit hexadecimal addresses (e.g., two sensors at `0x68`). Shared I2C pins are permitted **if and only if** addresses differ.
3. **Rule 3: ESP32 ADC2 / Wi-Fi Lockout (`ADC2_WIFI_CONFLICT`):** ESP32 / ESP32-S3 silicon shares the internal SAR ADC2 circuitry with the Wi-Fi/Bluetooth baseband. If Wi-Fi is active, any analog peripheral on ADC2 channels (e.g., GPIO0, 2, 4, 12–15, 25–27) fails runtime sampling.
4. **Rule 4: Input-Only Pin Drive Violation (`INPUT_ONLY_VIOLATION`):** Assigning output peripherals (PWM, SPI MOSI/SCK, I2C SDA/SCL, HC-SR04 TRIG) to input-only pins (ESP32 GPI 34–39).
5. **Rule 5: Strapping Pin Boot Hazard (`STRAPPING_HAZARD`):** Using boot mode pins (ESP32 GPIO 0, 2, 12, 15; ESP32-C6 GPIO 8, 9) with external pull-ups/pull-downs that disrupt power-on boot states.

#### Implementation Architecture
```typescript
import { McuProfile, McuPinDefinition } from '../data/mcu-profiles';

export interface AssignedPeripheral {
  id: string;
  name: string;
  type: 'I2C_SDA' | 'I2C_SCL' | 'SPI_MOSI' | 'SPI_MISO' | 'SPI_SCK' | 'SPI_CS' | 'UART_TX' | 'UART_RX' | 'PWM' | 'ADC' | 'GPIO_IN' | 'GPIO_OUT';
  busId?: string;       // e.g. 'Wire0', 'Wire1', 'SPI0'
  i2cAddressHex?: string;// e.g. '0x68', '0x76'
  gpio: string;         // e.g. 'GPIO21'
}

export type ConflictSeverity = 'ERROR' | 'WARNING';

export interface ConflictDiagnostic {
  severity: ConflictSeverity;
  ruleCode: 'DIRECT_COLLISION' | 'I2C_ADDRESS_COLLISION' | 'ADC2_WIFI_CONFLICT' | 'INPUT_ONLY_VIOLATION' | 'STRAPPING_HAZARD';
  affectedPins: string[];
  title: string;
  remediation: string;
}

export interface PinoutEvaluationResult {
  diagnostics: ConflictDiagnostic[];
  hasBlockingErrors: boolean;
  pinStatusMap: Record<string, { assigned: AssignedPeripheral[]; hasError: boolean; hasWarning: boolean }>;
  generatedHeaderCode: string;
}

export function evaluatePinoutConflicts(
  mcu: McuProfile,
  assignments: AssignedPeripheral[],
  isWifiRadioActive: boolean
): PinoutEvaluationResult {
  const diagnostics: ConflictDiagnostic[] = [];
  const pinStatusMap: Record<string, { assigned: AssignedPeripheral[]; hasError: boolean; hasWarning: boolean }> = {};

  mcu.pins.forEach((p) => {
    pinStatusMap[p.gpio] = { assigned: [], hasError: false, hasWarning: false };
  });

  assignments.forEach((a) => {
    if (pinStatusMap[a.gpio]) {
      pinStatusMap[a.gpio].assigned.push(a);
    }
  });

  // Check 1: Direct Physical Collisions (except valid shared I2C)
  Object.entries(pinStatusMap).forEach(([gpio, data]) => {
    if (data.assigned.length > 1) {
      const isAllI2c = data.assigned.every((a) => a.type === 'I2C_SDA' || a.type === 'I2C_SCL');
      if (!isAllI2c) {
        data.hasError = true;
        diagnostics.push({
          severity: 'ERROR',
          ruleCode: 'DIRECT_COLLISION',
          affectedPins: [gpio],
          title: `Direct Pin Collision on ${gpio}`,
          remediation: `Multiple peripherals (${data.assigned.map((a) => a.name).join(', ')}) are mapped to ${gpio}. Move one to an unassigned GPIO.`,
        });
      }
    }
  });

  // Check 2: I2C Address Collisions on shared bus
  const i2cByBus: Record<string, AssignedPeripheral[]> = {};
  assignments.filter((a) => a.type === 'I2C_SDA').forEach((a) => {
    const bus = a.busId || 'Wire0';
    if (!i2cByBus[bus]) i2cByBus[bus] = [];
    i2cByBus[bus].push(a);
  });

  Object.entries(i2cByBus).forEach(([bus, devices]) => {
    const addrMap: Record<string, string[]> = {};
    devices.forEach((d) => {
      const addr = (d.i2cAddressHex || '0x68').toLowerCase();
      if (!addrMap[addr]) addrMap[addr] = [];
      addrMap[addr].push(d.name);
    });

    Object.entries(addrMap).forEach(([addr, names]) => {
      if (names.length > 1) {
        diagnostics.push({
          severity: 'ERROR',
          ruleCode: 'I2C_ADDRESS_COLLISION',
          affectedPins: devices.map((d) => d.gpio),
          title: `I2C Address Collision on ${bus} (${addr})`,
          remediation: `Devices [${names.join(', ')}] share 7-bit address ${addr} on ${bus}. Set AD0 address select pin high or move one device to a separate I2C bus.`,
        });
      }
    });
  });

  // Check 3: ADC2 + Wi-Fi Conflict
  if (isWifiRadioActive && (mcu.id.includes('esp32') || mcu.id.includes('esp32-s3'))) {
    assignments.filter((a) => a.type === 'ADC').forEach((a) => {
      const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
      if (pinDef && pinDef.capabilities.includes('ADC2')) {
        pinStatusMap[a.gpio].hasError = true;
        diagnostics.push({
          severity: 'ERROR',
          ruleCode: 'ADC2_WIFI_CONFLICT',
          affectedPins: [a.gpio],
          title: `ADC2 Hardware Lockout on ${a.gpio}`,
          remediation: `${a.gpio} uses ADC2, which is disabled when the Wi-Fi/BT radio SAR subsystem is running. Move this analog signal to an ADC1 pin.`,
        });
      }
    });
  }

  // Check 4: Input-Only Drive Violations
  assignments.forEach((a) => {
    const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
    if (pinDef && pinDef.isInputOnly) {
      const isOutput = a.type !== 'ADC' && a.type !== 'GPIO_IN';
      if (isOutput) {
        pinStatusMap[a.gpio].hasError = true;
        diagnostics.push({
          severity: 'ERROR',
          ruleCode: 'INPUT_ONLY_VIOLATION',
          affectedPins: [a.gpio],
          title: `Output Drive Attempted on Input-Only Pin ${a.gpio}`,
          remediation: `${a.gpio} on ${mcu.name} lacks internal output push-pull FET circuitry. It can only be used as a digital or analog input.`,
        });
      }
    }
  });

  // Check 5: Strapping Pin Hazard
  assignments.forEach((a) => {
    const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
    if (pinDef && pinDef.isStrappingPin) {
      pinStatusMap[a.gpio].hasWarning = true;
      diagnostics.push({
        severity: 'WARNING',
        ruleCode: 'STRAPPING_HAZARD',
        affectedPins: [a.gpio],
        title: `Strapping Pin Assigned: ${a.gpio}`,
        remediation: `${a.gpio} samples voltage at reset (${pinDef.strappingBehavior || 'boot mode'}). Ensure external pull resistors do not force erroneous boot modes.`,
      });
    }
  });

  const hasBlockingErrors = diagnostics.some((d) => d.severity === 'ERROR');

  // Header code generator
  const generatedHeaderCode = `/**
 * @file pin_config.h
 * @brief Auto-generated hardware pin allocations by BenchPulse (benchpulse.dev)
 * @target ${mcu.name}
 * @status ${hasBlockingErrors ? 'INVALID - RESOLVE BLOCKING CONFLICTS' : 'VERIFIED CLEAN'}
 */

#pragma once

#include <stdint.h>

// Target Microcontroller: ${mcu.name}
${assignments
  .map((a) => {
    const pinDef = mcu.pins.find((p) => p.gpio === a.gpio);
    const strapComment = pinDef?.isStrappingPin ? ` // WARNING: Strapping pin (${pinDef.strappingBehavior})` : '';
    return `#define PIN_${a.name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')} ${a.gpio.replace('GPIO', '')}${strapComment}`;
  })
  .join('\n')}
`;

  return {
    diagnostics,
    hasBlockingErrors,
    pinStatusMap,
    generatedHeaderCode,
  };
}
```

---

## 8. Parametric SVG Visualizer Specifications

### 8.1 Visualizer 1: `PowerWaveformSvg.tsx`
- **ViewBox:** `0 0 800 360`
- **Coordinate Mapping:**
  - X-Axis (Time): Broken/logarithmic piecewise scale representing $t_{\text{sleep}}$ (condensed baseline), $t_{\text{sensor}}$ (step plateau), and $t_{\text{tx}}$ (sharp high-current spike).
  - Y-Axis (Current): Logarithmic mapping from $0.1\ \mu\text{A}$ ($10^{-4}\text{ mA}$) to $500\text{ mA}$.
- **Rendering Elements:**
  - `<defs>` linear gradients for area under the curve (`#06B6D4` with `stopOpacity="0.3"` to `0.0`).
  - Pulsing horizontal reference lines for Sleep Baseline ($I_s$) and Active Peak ($I_{tx}$).
  - Live hover `<rect>` hit targets revealing interactive tooltip cards with millivolt/charge metrics ($\text{mAs} = I \times t$).

### 8.2 Visualizer 2: `PatchBlueprintSvg.tsx`
- **ViewBox:** `0 0 800 500`
- **Coordinate Mapping:** Scaled 2D engineering drawing centered in canvas:
  - Substrate Rectangle: Sized to $W_{\text{gnd}} \times L_{\text{gnd}}$, filled with `#064E3B` (FR-4 soldermask green) or `#1E293B` (dark CAD view).
  - Copper Patch Polygon: Drawn using parametric SVG path commands (`M`, `L`, `Z`) forming a rectangle $W \times L$ with symmetric inset cutouts of depth $y_0$ and gap $g$ hugging the feedline of width $W_f$.
  - Dimension Leader Lines: White/cyan `<line>` elements with standard CAD `<marker id="arrow">` arrowheads displaying live calculated dimensions with dual unit tags (e.g., `38.04 mm [1498 mil]`).

### 8.3 Visualizer 3: `McuPackageSvg.tsx`
- **ViewBox:** `0 0 700 700`
- **Rendering Elements:**
  - Central IC Body: Slate-900 rounded rectangle with chip orientation notch at top.
  - Left & Right Pin Rows: Parametric copper rectangular pads extending outwards.
  - Pin Badges: Color-coded pills displaying physical pin number, GPIO identifier, and assigned peripheral type.
  - State Indicators: Conflicted pins render an animated pulsing SVG ring (`stroke="#F43F5E"` with `<animate>` tag) and pulse warning badge.

---

## 9. Programmatic SEO (pSEO) & Dynamic Routes Architecture

### 9.1 Database of Presets (`src/data/pseo-presets.ts`)
Defines 30+ comprehensive static targets across the three tool categories:

#### IoT Battery Presets:
1. `esp32-deep-sleep-18650-battery-life` (ESP32 + 2600mAh 18650 + BME280)
2. `esp32-c6-zigbee-cr2032-coin-cell-estimator` (ESP32-C6 + 225mAh CR2032)
3. `esp32-lora-sx1262-weather-station-power` (ESP32 + SX1262 LoRa 100mW burst)
4. `stm32l4-low-power-sensor-node-calculator` (STM32L476RG ultra-low power)
5. `nrf52840-ble-beacon-battery-life` (Nordic nRF52840 1-second beacon interval)
6. `raspberry-pi-pico-solar-iot-battery-profiler` (RP2040 duty-cycle profile)
7. `esp8266-dht22-aa-battery-life-estimator` (Legacy ESP-12F high TX current)
8. `cellular-lte-m-nbiot-quectel-bg95-power-model` (LTE-M high peak current)
9. `lorawan-eu868-class-a-sensor-battery-life` (868 MHz LoRaWAN Class A node)
10. `esp32-s3-camera-pir-motion-battery-model` (ESP32-S3 OV2640 burst drain)

#### Microstrip Patch Antenna Presets:
1. `2-4ghz-wifi-ble-fr4-patch-antenna` (2.45 GHz WiFi/BLE on 1.6mm FR-4)
2. `5-8ghz-fpv-ism-rogers-4350b-patch-antenna` (5.8 GHz FPV video on RO4350B)
3. `915mhz-lora-ism-microstrip-patch-calculator` (915 MHz LoRa US915 band)
4. `868mhz-lora-europe-india-patch-antenna` (868 MHz EU868 band)
5. `1-575ghz-gps-l1-ceramic-patch-calculator` (1.57542 GHz GPS L1 patch)
6. `24ghz-k-band-radar-ro4003c-patch-antenna` (24 GHz automotive radar)
7. `10-5ghz-x-band-amateur-radio-patch` (10.5 GHz microwave link)
8. `433mhz-sub-ghz-ism-telemetry-patch` (433 MHz ISM telemetry)
9. `3-5ghz-5g-nr-n78-microstrip-patch` (3.5 GHz 5G mid-band on Rogers)
10. `5-2ghz-wifi-5-unii1-patch-antenna` (5.2 GHz UNII-1 Wi-Fi)

#### Microcontroller Pinout Conflict Presets:
1. `esp32-wroom-32-i2c-spi-adc2-wifi-pinout`
2. `esp32-c6-devkitc-1-strapping-pins-checker`
3. `esp32-s3-camera-spi-i2c-pin-conflict`
4. `stm32-bluepill-i2c-spi-pwm-allocator`
5. `arduino-uno-r4-minima-bus-conflict-checker`
6. `esp32-mpu6050-oled-i2c-shared-bus-checker`
7. `esp32-lora-sx1262-spi-pinout-allocator`
8. `esp32-s3-usb-otg-jtag-pin-checker`
9. `stm32f103c8-dual-i2c-can-bus-checker`
10. `esp32-c6-zigbee-thread-low-power-pinout`

### 9.2 Dynamic Mathematical Guide (`WorkedExampleSection.tsx`)
Rendered as a semantic `<article>` below every tool:
1. **Dynamic Mathematical Proof:** Inserts the active parameters directly into the Balanis or Duty-Cycle equations, providing a complete step-by-step substitution proof for engineers.
2. **Sensitivity & Trade-Off Matrix:** A 4-row comparison table displaying the impact of parameter variation (e.g., swapping FR-4 for Rogers 4003C reduces patch size by 14% and reduces dielectric loss $\tan \delta$ by 85%).
3. **Engineering FAQs:** 4 technical questions answered with E-E-A-T depth and mirrored into JSON-LD.

---

## 10. Core Web Vitals & Zero-CLS AdSense Architecture

### 10.1 AdSlot Container Implementation (`src/components/layout/AdSlot.tsx`)
AdSense auto-resizing scripts represent the #1 cause of Cumulative Layout Shift (CLS) on engineering calculation sites. `AdSlot.tsx` guarantees zero layout shift by reserving strict physical CSS bounding boxes before any external scripts load:

```tsx
'use client';

import React from 'react';

interface AdSlotProps {
  id: string;
  slotType: 'top-banner' | 'mid-content';
}

export const AdSlot: React.FC<AdSlotProps> = ({ id, slotType }) => {
  const minHeightClass = slotType === 'top-banner' ? 'min-h-[90px] lg:min-h-[90px]' : 'min-h-[280px]';

  return (
    <div
      id={id}
      aria-label="Sponsored Engineering Tools"
      className={`w-full my-6 flex flex-col items-center justify-center bg-slate-900/40 border border-dashed border-slate-800/80 rounded-lg overflow-hidden ${minHeightClass}`}
    >
      <div className="w-full flex items-center justify-between px-3 py-1 bg-slate-950/60 border-b border-slate-800/60 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <span>Advertisement</span>
        <span>Zero-CLS Container</span>
      </div>
      <div className="flex-1 w-full flex items-center justify-center p-2 text-xs font-mono text-slate-600">
        {/* Google AdSense <ins className="adsbygoogle" ... /> mounts here */}
        <span>Ad Placement ({slotType}) Reserved Area</span>
      </div>
    </div>
  );
};
```

---

## 11. Testing & Mathematical Verification Specifications

### 11.1 Benchmark Test Suite
Prior to production sign-off, run automated tests against the mathematical cores:

| Test Identifier | Input Vector | Expected Output Metric | Acceptance Tolerance |
| :--- | :--- | :--- | :--- |
| `TEST-RF-01` | $f_0 = 2.45\text{ GHz}, \varepsilon_r = 4.4, h = 1.6\text{ mm}$ | $W \approx 37.38\text{ mm}, L \approx 28.84\text{ mm}$ | $\pm 0.15\text{ mm}$ |
| `TEST-RF-02` | $f_0 = 2.40\text{ GHz}, \varepsilon_r = 4.4, h = 1.6\text{ mm}$ | $W \approx 38.04\text{ mm}, L \approx 29.44\text{ mm}$ | $\pm 0.15\text{ mm}$ |
| `TEST-RF-03` | $f_0 = 5.80\text{ GHz}, \varepsilon_r = 3.55, h = 0.8\text{ mm}$ | $W \approx 17.15\text{ mm}, L \approx 13.08\text{ mm}$ | $\pm 0.10\text{ mm}$ |
| `TEST-IOT-01` | $C = 2500\text{ mAh}, I_s = 10\ \mu\text{A}, I_{tx} = 120\text{ mA}, t_{tx} = 200\text{ ms}, T_{cyc} = 60\text{ s}$ | $I_{\text{avg}} \approx 0.41\text{ mA}, \text{Life} \approx 0.58\text{ Yrs}$ | $\pm 5\%$ |
| `TEST-PIN-01` | ESP32-WROOM-32: Wi-Fi Active + ADC peripheral mapped to GPIO25 (ADC2_CH8) | Conflict flagged: `ADC2_WIFI_CONFLICT` | Exact match |
| `TEST-PIN-02` | ESP32: Output PWM assigned to GPIO34 | Conflict flagged: `INPUT_ONLY_VIOLATION` | Exact match |
| `TEST-PIN-03` | MPU6050 (`0x68`) + DS3231 (`0x68`) both on `Wire0` | Conflict flagged: `I2C_ADDRESS_COLLISION` | Exact match |

---

## 12. Implementation Plan & Execution Phases

```
+───────────────────────────────────────────────────────────────────────────────+
|                          PHASED IMPLEMENTATION TIMELINE                       |
+───────────────────────────────────────────────────────────────────────────────+
| Phase 1: Environment, Tailwind & Layout Shell (Navbar, Footer, AdSlot)        |
| Phase 2: Mathematical Core Libraries & Factual Datasets (lib/ + data/)        |
| Phase 3: Interactive Visualizers (PowerWaveformSvg, PatchBlueprintSvg, MCU)  |
| Phase 4: Full Split-Pane Workbench Controllers & Dynamic Dual Inputs          |
| Phase 5: Programmatic SEO Engine (30+ dynamic presets, worked guides, schema) |
| Phase 6: Compliance Pages, AdSense DART Notices & Static Build Verification   |
+───────────────────────────────────────────────────────────────────────────────+
```

### Phase 1: Environment, Tailwind & Layout Shell
- Scaffold Next.js App Router project in `d:/TraceAndNode`.
- Install dependencies: `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`.
- Configure `src/app/globals.css` with dark Oscilloscope design tokens and clean scrollbar behavior.
- Build `Navbar.tsx` (sticky, tool switcher, responsive mobile drawer).
- Build `Footer.tsx` (clean-room trademark disclaimer, sitemap links, compliance links).
- Build `AdSlot.tsx` (rigid zero-CLS reserved container).

### Phase 2: Mathematical Core Libraries & Datasets
- Implement `src/lib/iot-battery-math.ts`.
- Implement `src/lib/patch-antenna-math.ts`.
- Implement `src/lib/pinout-conflict-engine.ts`.
- Implement factual datasets: `mcu-profiles.ts`, `rf-substrates.ts`, `sensor-radio-profiles.ts`, and `pseo-presets.ts`.

### Phase 3: Parametric SVG Visualizers
- Implement `PowerWaveformSvg.tsx` with logarithmic current axes and interactive charge hover cards.
- Implement `PatchBlueprintSvg.tsx` with dimension leader lines and inset notch geometry.
- Implement `McuPackageSvg.tsx` with dynamic pin assignment pills and red conflict pulse rings.

### Phase 4: Workbench Controllers
- Assemble `IotBatteryWorkbench.tsx` with dual-synchronized sliders and KPI metric cards.
- Assemble `PatchAntennaWorkbench.tsx` with substrate dropdown, CST VBScript export, and SVG download.
- Assemble `PinoutCheckerWorkbench.tsx` with peripheral adder, bus config, and C++ header generator.
- Implement `MobileTelemetryDock.tsx` across all workbenches.

### Phase 5: Programmatic SEO & Dynamic Preset Routes
- Build `WorkedExampleSection.tsx` with dynamic formula proofs and trade-off tables.
- Build `JsonLdSchema.tsx` injecting `SoftwareApplication` and `FAQPage` microdata.
- Implement `[preset]/page.tsx` for each of the 3 calculators with `generateStaticParams()` and `generateMetadata()`.
- Implement dynamic `sitemap.ts` and `robots.ts`.

### Phase 6: Compliance Pages & Production Build Verification
- Implement `/about`, `/privacy-policy`, `/terms`, and `/contact`.
- Run `npm run build` to verify static generation of all 30+ static routes.
- Execute validation checklist to confirm zero hydration warnings, `< 0.05` CLS, and valid mathematical results.

---

## 13. Prioritized Implementation Checklist & Acceptance Criteria

- [ ] **Next.js & Tailwind Scaffold:** Strict TypeScript configuration, `globals.css` theme variables.
- [ ] **Math Core Verification:** Unit test sanity checks passing for 2.4 GHz patch ($W \approx 38.04\text{ mm}$, $L \approx 29.44\text{ mm}$).
- [ ] **Parametric SVG Scalability:** Visualizers scale seamlessly across mobile (320px) to ultra-wide desktop (1440px).
- [ ] **Dual-Synchronized Inputs:** Typing in numeric box updates slider immediately; dragging slider updates numeric box.
- [ ] **Zero-CLS Ad Containers:** Fixed heights reserved before script hydration (`min-h-[90px]`, `min-h-[280px]`).
- [ ] **pSEO Routes SSG:** All 30+ presets render to static HTML with distinct meta titles and descriptions.
- [ ] **C++ & CAD Exports:** CST macro and `pin_config.h` clipboard actions function reliably.
- [ ] **Legal Disclaimers:** Trademark disclaimer rendered prominently in page footer.
- [ ] **Full Static Export Pass:** `npm run build` completes with 0 errors and 0 missing static params.
