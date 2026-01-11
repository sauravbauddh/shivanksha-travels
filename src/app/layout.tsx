import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { TemporaryFooter } from '@/components/layout/TemporaryFooter';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';
import { defaultMetadata } from '@/config/seo';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
  weight: ['400', '500', '600', '700'],
});

import { getSiteContent } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteContent();
  const logoUrl = data?.logo || null;
  console.log('Debug: generateMetadata logoUrl:', logoUrl);

  return {
    ...defaultMetadata,
    icons: logoUrl
      ? {
          icon: logoUrl,
          shortcut: logoUrl,
          apple: logoUrl,
        }
      : defaultMetadata.icons,
  };
}

import { JsonLd } from '@/components/seo/JsonLd';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${jakarta.variable} ${notoSans.variable} antialiased font-display`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <TemporaryFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
