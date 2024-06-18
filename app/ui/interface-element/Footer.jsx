
import Image from 'next/image';
import white_logo from '@/public/img/logo-blanco.png';
import IconGroup from '@/app/ui/interface-element/IconGroup';


export default function Footer() {
    return (
        <footer className="bg-secondary-400 py-0 text-white px-2 sm:px-6 lg:px-8 pb-5">
            <div className="container mx-auto">
                <div className="flex flex-wrap px-6 md:px-0">

                        {/* Columna 1 */}
                        <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 py-6">
                            <Image src={white_logo} alt="alt" width={250} height={69} className='mr-2'/>
                            <p id="texto-footer" className="text-white">
                                Lorem ipsum dolor sit amet, consectetur adipisci elit. Donec ultricies mi in ipsum vehicula lacinia. Iner porttitor ac libero
                            </p>
                        </div>

                        {/* Columna 2 */}
                        <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 py-6 flex flex-col items-center">
                            <ul className="list-none ">
                            <li>Home</li>
                            <li>La universidad</li>
                            <li>Qué estudiar</li>
                            <li>Contacto</li>
                            </ul>
                        </div>

                        {/* Columna 3 */}
                        <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 py-6 flex flex-col items-center">
                            <ul className="list-none">
                            <li>Eventos</li>
                            <li>Profesorado</li>
                            <li>Comunidad 10Code</li>
                            <li>Empresas</li>
                            </ul>
                        </div>

                        {/* Columna 4 */}
                        <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 py-6 flex flex-col items-center">
                                <p className='font-bold mb-3'>Siguenos en: </p>

                            <IconGroup />

                        </div>
                    </div>

                <div className="w-full text-center mt-3">
                    <p>© 2024 10Code University, Dos Hermanas (Sevilla)</p>
                </div>
            </div>
        </footer>
    );
}