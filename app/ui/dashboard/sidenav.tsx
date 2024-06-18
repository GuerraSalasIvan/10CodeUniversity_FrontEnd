import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-2 py-4 md:px-2 bg-primary-600">

      <div className="flex grow flex-row justify-between space-x-4 md:flex-col md:space-x-0 md:space-y-2 mt-12">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-white p-3 text-sm font-medium  hover:bg-sidebar-hover-200 hover:bg-opacity-30 hover:font-bold md:flex-none md:justify-start md:p-2 md:px-3">
            <Cog6ToothIcon className="w-5" />
            <div className="hidden md:block ">CONFIGURACION</div>
          </button>
        </form>
      </div>
    </div>
  );
}
