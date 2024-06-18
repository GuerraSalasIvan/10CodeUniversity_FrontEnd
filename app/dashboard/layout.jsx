import SideNav from '@/app/ui/dashboard/sidenav';
import NavDashboard from '@/app/ui/interface-element/NavDashboard';
import { open_Sans } from '@/app/ui/fonts';

export default function Layout({ children }) {
  return (
    <>
    <NavDashboard/>

    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-200">

      <div className="w-full flex-none md:w-52">
        <SideNav />
      </div>
      <div className={`${open_Sans.className} flex-grow m-4 mt-16 bg-white md:flex-col rounded-md md:overflow-y-auto md:p-3`}>{children}</div>
    </div>
    </>

  );
}