import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import TanstackProvider from '@/components/common/TanStackProvider';
import ToasterProvider from '@/components/common/ToasterProvider';
import Header from '@/components/common/Header/Header';

export const metadata: Metadata = {
  title: 'RentalCar',
  description: 'Application for renting cars',
};

const inter = Inter({
  weight: ['400', '500', '600'],
  variable: '--inter-font',
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  variable: '--manrope-font',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <TanstackProvider>
          <ToasterProvider />
          <Header />
          <main>{children}</main>
        </TanstackProvider>
      </body>
    </html>
  );
}
