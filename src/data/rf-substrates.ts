export interface RfSubstrate {
  id: string;
  name: string;
  dielectricConstant: number; // eps_r
  lossTangent: number;        // tan delta
  standardHeightMm: number;   // typical thickness (mm)
  description: string;
  colorHex: string;
  application: string;
}

export const RF_SUBSTRATES: RfSubstrate[] = [
  {
    id: 'fr4-standard',
    name: 'FR-4 Standard Glass Epoxy',
    dielectricConstant: 4.4,
    lossTangent: 0.02,
    standardHeightMm: 1.6,
    description: 'Everyday standard PCB laminate. Cost-effective for Sub-3 GHz designs.',
    colorHex: '#064E3B', // Soldermask Green
    application: '2.4 GHz Wi-Fi, Bluetooth, Zigbee, Sub-GHz IoT',
  },
  {
    id: 'rogers-ro4003c',
    name: 'Rogers RO4003C Hydrocarbon Ceramic',
    dielectricConstant: 3.55,
    lossTangent: 0.0027,
    standardHeightMm: 0.813,
    description: 'High-frequency laminate offering tight dielectric tolerance and low dissipation.',
    colorHex: '#E2E8F0', // Rogers Ivory/White
    application: '5.8 GHz ISM, Automotive Radar, Cellular 5G NR',
  },
  {
    id: 'rogers-ro4350b',
    name: 'Rogers RO4350B Hydrocarbon Ceramic',
    dielectricConstant: 3.66,
    lossTangent: 0.0037,
    standardHeightMm: 0.762,
    description: 'Flame-retardant high-frequency material with stable electrical properties.',
    colorHex: '#CBD5E1',
    application: 'FPV Video Transmitters, Point-to-Point Microwave Links',
  },
  {
    id: 'rt-duroid-5880',
    name: 'Rogers RT/duroid 5880 Glass Microfiber PTFE',
    dielectricConstant: 2.2,
    lossTangent: 0.0009,
    standardHeightMm: 0.787,
    description: 'Ultra-low dielectric constant and minimum loss for millimeter-wave circuits.',
    colorHex: '#F1F5F9',
    application: '10 GHz Amateur, 24 GHz K-Band Radar, Aerospace RF',
  },
  {
    id: 'alumina-96',
    name: 'Alumina Ceramic 96% (Al2O3)',
    dielectricConstant: 9.8,
    lossTangent: 0.0002,
    standardHeightMm: 0.635,
    description: 'High-permittivity ceramic for ultra-compact patch footprints and GPS antennas.',
    colorHex: '#F8FAFC',
    application: 'Compact GPS L1/L2, Ceramic Patch Antennas',
  },
  {
    id: 'ptfe-teflon',
    name: 'Pure PTFE / Teflon Substrate',
    dielectricConstant: 2.1,
    lossTangent: 0.0002,
    standardHeightMm: 1.0,
    description: 'Low-loss flexible fluoropolymer with stable dielectric constant over temperature.',
    colorHex: '#FFFFFF',
    application: 'Microwave feeds, high-efficiency lab prototypes',
  },
];
