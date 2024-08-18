import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import '@/styles/globals.css';
import { Provider } from '@/context/Provider';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: 'PetJournal',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`min-h-screen ${quicksand.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
