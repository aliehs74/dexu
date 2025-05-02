import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: 'Dexu Crypto Chart',
  description: 'Performance dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
