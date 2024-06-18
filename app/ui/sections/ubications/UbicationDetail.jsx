import LeftArrowLink from '@/app/ui/links/LeftArrowLink';
import DetailTitle from '@/app/ui/titles/DetailTitle';
import Image from 'next/image';

import DarkTitle from '@/app/ui/titles/DarkTitle';
import MediumCard from '@/app/ui/cards/events/MediumCard';
import CapIcon from '@/public/img/cap_icono.png';
import PlaceIcon from '@/public/img/ubi_icono.png';
import MockImage from '@/public/img/fondo_login.jpg';

import { format } from "date-fns";

export default function UbicationDetail({ ubicationData }) {
    return (
        <>
            <LeftArrowLink href={'/home'} />
            <DetailTitle text={ubicationData.ubication.place} />

            <Image src={ubicationData.ubication.imageURL || MockImage}  alt="alt" width={'0'} height={'0'} sizes='100vw' className="w-full h-full object-cover" />

            <div className='mb-4'>
                <div className="flex flex-wrap justify-between my-4">
                <div className="flex items-center mb-2">
                    <Image src={PlaceIcon} alt="alt" width={35} height={35}/>
                    <p className="mb-0">{ubicationData.ubication.address}</p>
                </div>

                <div className="flex items-center mb-2">
                    <Image src={CapIcon} alt="alt" width={35} height={35} className='mx-2'/>
                    <p className="mb-0">Aforo max: {ubicationData.ubication.capacity}</p>
                </div>
                </div>
            </div>

            <div className='mx-3 my-8'>
                <p>{ubicationData.ubication.place_description}</p>
            </div>

            <div className="mx-3">
                {ubicationData.events && ubicationData.events.length > 0 && (
                    <>
                        <DarkTitle text={'Eventos en esta ubicación:'}/>
                        <div className='grid grid-cols-2'>
                            {ubicationData.events.map(event => (
                                <div key={event.id} className="p-4 my-4">
                                    <MediumCard eventData={event}/>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
