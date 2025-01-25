import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

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
      <body className={`${inter.className} bg-background text-text`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
