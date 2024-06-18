import RightArrow from '@/public/img/Arrow-RightCircle.png';
import Image from 'next/image';
import Link from 'next/link';

export default function RightArrowLink({href}){
    return (
        <Link href={href} className='inline-block'>
            <div className='flex m-2'>
                <h2 className='text-secondary-400 underline m-0.5'>Ver todo</h2>
                <Image src={RightArrow} alt="RightArrow" width={20} height={12} className='m-1'/>
            </div>
        </Link>
    );
}