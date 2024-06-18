

import Nav from '@/app/ui/interface-element/Nav';
import Menu from '@/app/ui/interface-element/Menu';
import Footer from '@/app/ui/interface-element/Footer';
import { open_Sans } from '@/app/ui/fonts';

export default function RootLayout({children}) {
  return (
    <>
      <Nav />
      <Menu />
      <div className={`${open_Sans.className} antialiased py-4 px-7`}>{children}</div>
      <Footer />
    </>
  );
}
