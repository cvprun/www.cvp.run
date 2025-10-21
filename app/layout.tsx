import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import type {ReactNode} from 'react';
import {ThemeProvider} from '@/components/theme-provider';
import {TopBar} from '@/components/top-bar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CVP',
  description: 'Computer Vision Player',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <TopBar></TopBar>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
