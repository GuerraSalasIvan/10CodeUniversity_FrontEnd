
import { inter } from '@/app/ui/fonts';
import { nunito } from '@/app/ui/fonts';
import { lusitana } from '@/app/ui/fonts';
import '@/app/global.css';

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}
