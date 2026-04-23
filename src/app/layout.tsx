import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { Footer } from '../components/organisms/Footer/Footer';
import { CalculatorProvider } from '../context/CalculatorContext';

export const metadata: Metadata = {
  title: 'MehrWise — AI-Powered Mehr Calculator | Hanafi Fiqh',
  description:
    'An intelligent Mehr calculator grounded in Imam Abu Hanifa\'s established fiqh. Get a personalized, fair, and blessed Mehr recommendation based on your financial profile, family precedent, and Sunnah benchmarks.',
  keywords: [
    'Mehr calculator',
    'Meher calculator',
    'Islamic marriage',
    'Nikah',
    'Hanafi fiqh',
    'Mehr Fatimi',
    'bridal gift',
    'Islamic finance',
  ],
  openGraph: {
    title: 'MehrWise — AI-Powered Mehr Calculator',
    description:
      'Get a personalized Mehr recommendation grounded in Hanafi fiqh. Compare against Sunnah benchmarks and find the right amount for your nikah.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CalculatorProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CalculatorProvider>
      </body>
    </html>
  );
}
