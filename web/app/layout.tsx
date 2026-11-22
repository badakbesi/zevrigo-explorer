import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProviders } from './providers';
import { ExplorerShell } from '@/components/explorer/header';

export const metadata: Metadata = {
  title: 'Zevrigo Coin (ZVRG) Block Explorer',
  description:
    'Block explorer Zevrigo Coin (ZVRG): blok, transaksi, alamat, pasokan dibanding jadwal, alokasi pencipta, dan mempool.',
  referrer: 'no-referrer',
};

// Q182 (layar HP): viewport-fit=cover agar env(safe-area-inset-*) terisi di aplikasi Android explorer (jendela sampai tepi
// layar). Header, footer, dan sisi kiri-kanan memberi jarak sebesar itu (header.tsx, globals.css); di peramban biasa nilainya 0.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-teal-500/20 selection:text-teal-700 dark:selection:text-teal-300">
        <AppProviders>
          <ExplorerShell>{children}</ExplorerShell>
        </AppProviders>
      </body>
    </html>
  );
}
