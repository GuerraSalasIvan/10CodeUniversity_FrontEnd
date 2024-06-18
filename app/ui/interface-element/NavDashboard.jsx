
import IconGroup from '@/app/ui/interface-element/IconGroup';
import lupa_icon from '@/public/img/lupa_icon.png';
import perfil_icon from '@/public/img/perfil_icon.png';
import message_icon from '@/public/img/message_icon.png';
import notificication_icon from '@/public/img/notificication_icon.png';

import white_logo from '@/public/img/logo-blanco.png';

import Image from 'next/image';

export default function NavDashboard() {
    return(
        <div className="mx-auto px-1 sm:px-3 lg:px-5 bg-primary-600 text-white absolute w-full">
            <div className="relative flex h-14 items-center justify-between">

                <Image src={white_logo} alt="alt" width={176} height={48} />

                <div className="flex items-center bg-white rounded-xl">
                    <span className="px-1 mx-1">
                        <Image src={lupa_icon} alt="alt" width={20} height={20} className="mx-1" />
                    </span>

                    <input type="text" className="block w-full py-1 pl-5 pr-20 leading-tight bg-white border-0 rounded-e-xl focus:outline-none focus:border-grey-300 focus:ring-grey-300 text-black" placeholder="Buscar" />
                </div>

                <div className='flex'>
                    <Image src={message_icon} alt="alt" width={30} height={30} className='mx-2 '/>
                    <Image src={notificication_icon} alt="alt" width={30} height={30} className='mx-2'/>
                    <div className='flex'>
                        <Image src={perfil_icon} alt="alt" width={12} height={16} className='mx-2 my-2'/>
                        <p className='underline mr-6 pt-1'>Acceso Personalizado</p>
                    </div>
                    <p className='pt-1'>ES | EN</p>
                </div>
            </div>
        </div>
    );
}