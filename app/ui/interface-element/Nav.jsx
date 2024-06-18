
import IconGroup from '@/app/ui/interface-element/IconGroup';
import lupa_icon from '@/public/img/lupa_icon.png';
import perfil_icon from '@/public/img/perfil_icon.png';
import Link from 'next/link';

import Image from 'next/image';

export default function Nav() {
    return(
        <div className="mx-auto px-2 sm:px-6 lg:px-8 bg-primary-600 text-white">
            <div className="relative flex h-14 items-center justify-between">

                <IconGroup />

                <div className="flex items-center bg-white rounded-xl">
                    <span className="px-1 mx-1">
                        <Image src={lupa_icon} alt="alt" width={20} height={20} className="mx-1" />
                    </span>

                    <input type="text" className="block w-full py-1 pl-5 pr-20 leading-tight bg-white border-0 rounded-e-xl focus:outline-none focus:border-grey-300 focus:ring-grey-300 text-black" placeholder="Buscar" />
                </div>

                <div className='flex'>
                    <p className='mr-6'>Contacto</p>
                    <p className='mr-6'>Ayuda</p>
                    <Link href={'/dashboard'}>
                        <div className='flex'>
                            <Image src={perfil_icon} alt="alt" width={12} height={16} className='mx-2 my-1'/>
                            <p className='underline mr-6'>Acceso Personalizado</p>
                        </div>
                    </Link>
                    <p >ES | EN</p>

                </div>

            </div>
        </div>

    );
}