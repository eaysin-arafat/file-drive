import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import ConvexClientProvider from './ConvexClientProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'File Drive',
  description: 'The easiest way to upload and share files with your company.'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <body className={'overflow-hidden'}>
        <NextTopLoader showSpinner={false} />
        <ConvexClientProvider>
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
