
import DirectAccess from '@/app/ui/sections/dashboard/main/DirectAccess';
import Matriculation from '@/app/ui/sections/dashboard/main/Matriculation';
import ActiveProcedure from '@/app/ui/sections/dashboard/main/ActiveProcedure';
import Calendar from '@/app/ui/sections/dashboard/main/Calendar';
import NextEvent from '@/app/ui/sections/dashboard/main/NextEvent';

export default function Page() {
    return (
      <div className='grid grid-cols-3'>

        <div className='col-span-2'>
          <DirectAccess/>
          <Matriculation/>
          <ActiveProcedure/>

        </div>

        <div className=''>
          <Calendar/>
          <NextEvent/>
        </div>

      </div>
    );
  }