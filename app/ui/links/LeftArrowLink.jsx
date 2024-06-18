import LeftArrow from '@/public/img/Arrow-LeftCircle.png';
import Image from 'next/image';
import Link from 'next/link';

export default function LeftArrowLink({href}){
    return (
        <Link href={href} className='inline-block'>
            <div className='flex m-2'>
                <Image src={LeftArrow} alt="RightArrow" width={20} height={12} className='m-1'/>
                <h2 className='text-secondary-400 underline m-0.5'>Volver</h2>
            </div>
        </Link>
    );
}