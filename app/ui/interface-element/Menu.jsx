
import Image from 'next/image';
import Logo from '@/public/img/10code_logo.jpg'

export default function Menu() {
    return (
        <div className=''>
            <div className="bg-white-50 border flex items-center justify-between mx-auto px-2 sm:px-6 lg:px-8 h-16">
                <Image src={Logo} alt="alt" width={186} height={49} />
                <div className='flex text-gray-500 text-base'>

                    <p className='mr-5 hover:underline hover:text-secondary-400'>INICIO</p>
                    <p className='mx-5 hover:underline hover:text-secondary-400'>LA UNIVERSIDAD</p>
                    <p className='mx-5 hover:underline hover:text-secondary-400'>ESTUDIAR</p>
                    <p className='mx-5 hover:underline hover:text-secondary-400'>INVESTIGAR</p>
                    <p className='mx-5 hover:underline hover:text-secondary-400'>INTERNACIONAL</p>
                    <p className='mx-5 hover:underline hover:text-secondary-400'>COLABORACIÓN</p>
                    <p className='ml-5 hover:underline hover:text-secondary-400'>EMPRESAS</p>

                </div>
            </div>
        </div>
    );
}