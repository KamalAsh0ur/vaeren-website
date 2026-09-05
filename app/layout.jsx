import { Cormorant_Garamond, Jost } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

// Display font for collection titles, hero statements, major navigation
const fontDisplay = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
});

// Text/System font for functional UI
const fontSystem = Jost({
  subsets: ['latin'],
  variable: '--font-system',
  weight: ['300', '400', '500'],
});

export const metadata = {
  metadataBase: new URL('https://vaeren.vercel.app'),
  title: 'Vaeren Studios | Luxury Egyptian Streetwear & Architectural Fashion',
  description: 'Designed in Cairo. Less noise. More identity. Vaeren Studios explores the space between structure and instinct through limited-quantity, architectural streetwear.',
  keywords: ['Vaeren Studios', 'Egyptian Streetwear', 'Cairo Fashion', 'Luxury Streetwear', 'Architectural Fashion', 'Minimalist Clothing'],
  openGraph: {
    title: 'Vaeren Studios | Architectural Fashion',
    description: 'Less noise. More identity. Explore the latest drop designed in Cairo.',
    url: 'https://vaeren.vercel.app',
    siteName: 'Vaeren Studios',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Vaeren Studios — Creative Partners for Streetwear Brands',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaeren Studios',
    description: 'BEYOND THE CODE. LESS NOISE. MORE IDENTITY.',
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontSystem.variable} antialiased scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[var(--color-vaeren-void)] text-[var(--color-vaeren-bone)] selection:bg-[var(--color-vaeren-concrete)] selection:text-[var(--color-vaeren-void)] cursor-none">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
