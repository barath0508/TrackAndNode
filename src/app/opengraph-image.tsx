// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const alt = 'TraceAndNode — High-Precision Hardware Engineering Utilities';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#020617', // slate-950
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Oscilloscope Icon Emblem */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                border: '2px solid rgba(6, 182, 212, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22d3ee',
                fontSize: '28px',
                fontWeight: 'bold',
              }}
            >
              ~
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.5px',
                }}
              >
                Trace<span style={{ color: '#06b6d4' }}>And</span>Node
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                traceandnode.com
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid #334155',
              padding: '8px 18px',
              borderRadius: '9999px',
              color: '#38bdf8',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'monospace',
            }}
          >
            ZERO-LATENCY B2B HARDWARE SUITE
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1000px',
          }}
        >
          <div
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: '#f8fafc',
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
            }}
          >
            Zero-Latency Hardware &amp; RF Engineering Calculators
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              marginTop: '16px',
              lineHeight: 1.4,
              maxWidth: '850px',
            }}
          >
            100% Client-Side Physics • Balanis RF Transmission Line Synthesis • Deterministic Silicon Pinout Matrix
          </div>
        </div>

        {/* 3 Tool Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            width: '100%',
          }}
        >
          {/* Badge 1: IoT */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              padding: '14px 22px',
              borderRadius: '16px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#f1f5f9' }}>
                IoT Battery Life Profiler
              </span>
              <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                Duty-Cycle • LDO Iq • Self-Discharge
              </span>
            </div>
          </div>

          {/* Badge 2: RF */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              padding: '14px 22px',
              borderRadius: '16px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#06b6d4',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#f1f5f9' }}>
                Patch Antenna &amp; PCB Trace
              </span>
              <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                Hammerstad-Jensen • Inset y0 • CST CAD
              </span>
            </div>
          </div>

          {/* Badge 3: MCU */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              padding: '14px 22px',
              borderRadius: '16px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#f59e0b',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#f1f5f9' }}>
                MCU Pinout Conflict Solver
              </span>
              <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                ADC2 Wi-Fi • I2C Clashes • C++ pin_config.h
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
