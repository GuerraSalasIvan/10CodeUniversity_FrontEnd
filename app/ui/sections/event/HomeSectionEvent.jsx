'use client'

import TitleBluePadding from '@/app/ui/titles/TitleBluePadding';
import DarkTitle from '@/app/ui/titles/DarkTitle';
import BigCard from '@/app/ui/cards/events/BigCard';
import MediumCard from '@/app/ui/cards/events/MediumCard';

import RightArrowLink from '@/app/ui/links/RightArrowLink';

export default function HomeSectionEvent({eventData}){
    if (!eventData || eventData.length === 0) {
        return <p></p>;
        }

      // Extraer los eventos
        const firstEvent = eventData[0];
        const secondEvent = eventData[1];
        const thirdEvent = eventData[2];

    return (
        <div className='py-4 px-6'>
            <TitleBluePadding text={'Eventos'} />
            <div className='flex items-end px-2 py-4'>
                <DarkTitle text={'Próximos eventos'}/>
                <RightArrowLink href={'/home/events'}/>
            </div>

            <div className='grid grid-cols-2 mx-8'>
                <div className='mb-0 mr-5'>
                    <BigCard eventData={firstEvent}/>
                </div>

                <div className='grid grid-rows-2 ml-5'>
                    <div>
                        <MediumCard eventData={secondEvent}/>
                    </div>

                    <div className='mb-0'>
                        <MediumCard eventData={thirdEvent}/>
                    </div>
                </div>
            </div>
        </div>
    );
}