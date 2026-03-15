import type { Metadata } from 'next';
import { SessionProvider } from '@/components/SessionProvider';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import './globals.css';

const mangaFont = M_PLUS_Rounded_1c({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-manga',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sayuri Games',
  description: 'Joue, gagne des Sayucoins et monte dans le classement !',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`scroll-smooth ${mangaFont.variable}`}>
      <body className="min-h-screen bg-manga bg-manga-overlay font-manga antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
