import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mehr Calculator — MehrWise',
  description:
    'Calculate your Mehr with our AI-powered wizard. Answer 5 simple steps and receive a personalized recommendation grounded in Hanafi fiqh.',
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
