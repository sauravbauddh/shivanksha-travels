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

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Shivanksha Travels',
              url: 'https://shivankshatravels.in',
              logo: 'https://shivankshatravels.in/logo.png',
              description:
                'Discover unforgettable travel experiences with Shivanksha Travels. We offer customized tour packages, destination guides, and expert travel planning services.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
              },
              sameAs: [
                'https://facebook.com/shivankshatravels',
                'https://instagram.com/shivankshatravels',
                'https://twitter.com/shivankshatravels',
              ],
            }),
          }}
        />
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
