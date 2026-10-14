import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://trackandnode.dev'),
  title: {
    default: 'TrackAndNode — High-Speed Hardware Engineering & RF Calculation Platform',
    template: '%s | TrackAndNode',
  },
  description:
    'Free, high-speed, zero-latency engineering utility platform featuring an IoT Battery Life Profiler, Microstrip Patch Antenna CAD Calculator, and Microcontroller Pinout Conflict Solver.',
  keywords: [
    'IoT battery life calculator',
    'microstrip patch antenna calculator',
    'PCB trace impedance',
    'ESP32 pinout conflict checker',
    'Hammerstad Jensen patch antenna',
    'duty cycle power profiler',
    'RF engineering tools',
    'CST studio macro generator',
  ],
  authors: [{ name: 'TrackAndNode Engineering Team' }],
  creator: 'TrackAndNode',
  publisher: 'TrackAndNode',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trackandnode.dev',
    siteName: 'TrackAndNode',
    title: 'TrackAndNode — Hardware Engineering & RF Calculation Suite',
    description:
      'Zero-latency, client-side engineering tools: IoT duty-cycle battery estimation, Balanis microstrip patch antenna synthesis, and MCU bus conflict solver.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrackAndNode — Hardware Engineering & RF Calculation Suite',
    description:
      'High-speed engineering utilities: IoT battery life profiler, microstrip patch antenna CAD calculator, and MCU pinout conflict checker.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#090D16] text-[#F8FAFC] font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
