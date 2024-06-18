import face_icon from '@/public/img/facebook_icon.png';
import insta_icon from '@/public/img/instagram_icon.png';
import yt_icon from '@/public/img/youtube_icon.png';
import x_icon from '@/public/img/x_icon.png';
import linkedin_icon from '@/public/img/linkedin_icon.png';


import Image from 'next/image';

export default function IconGroup() {
    return (
        <div className='flex'>
            <Image src={insta_icon} alt="alt" width={20} height={20} className='mr-2'/>
            <Image src={face_icon} alt="alt" width={20} height={20} className='mx-2'/>
            <Image src={yt_icon} alt="alt" width={22} height={20} className='mx-2'/>
            <Image src={x_icon} alt="alt" width={20} height={20} className='mx-2'/>
            <Image src={linkedin_icon} alt="alt" width={20} height={20} className='mx-2'/>
        </div>
    );
}