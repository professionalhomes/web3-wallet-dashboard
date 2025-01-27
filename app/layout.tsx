import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import BackgroundDesign from '@/components/BackgroundDesign';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web3 Wallet Dashboard',
  description: 'Manage your cryptocurrencies and interact with DApps',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <BackgroundDesign />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
