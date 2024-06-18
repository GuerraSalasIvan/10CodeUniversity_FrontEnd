
'use client'

import { format } from "date-fns";
import Image from 'next/image';

import MockImage from '@/public/img/unknown.jpg';

import EventButtonDetail from '@/app/ui/buttons/EventButtonDetail';


export default function MediumCard({eventData}) {

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="flex-col items-center">
                <div className="h-1/2 ">
                    <Image
                        src={eventData.imageURL || MockImage}
                        alt="Event Image"
                        width={'0'} height={'0'} sizes='50vw' className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <div className="mb-4">
                        <span className="fecha_event text-sm font-bold text-primary-600">
                            {format(new Date(eventData.available_at), "d MMM yyyy")}
                        </span>
                    </div>
                    <h5 className="text-lg font-bold">{eventData.title}</h5>
                    <p className="text-sm mb-4">
                        {eventData.description && eventData.description.length > 100
                            ? eventData.description.slice(0, 180) + "..."
                            : eventData.description}
                    </p>
                    <EventButtonDetail eventData={eventData}/>
                </div>
            </div>
        </div>
    );

}