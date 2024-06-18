import LeftArrowLink from '@/app/ui/links/LeftArrowLink';
import DetailTitel from '@/app/ui/titles/DetailTitle';
import InscribeEventButton from '@/app/ui/buttons/InscribeEventButton';

import { format } from "date-fns";

import DateIcon from '@/public/img/date_icono.png';
import TimeIcon from '@/public/img/hora_icono.png';
import OrganizatorIcon from '@/public/img/organizator_icono.png';
import CapIcon from '@/public/img/cap_icono.png';
import PlaceIcon from '@/public/img/ubi_icono.png';
import MockImage from '@/public/img/unknown.jpg';

import Image from 'next/image';



export default function EventDetail({eventData}){
    return (
        <>
            <LeftArrowLink href={'/home/events'}/>

            <DetailTitel text={eventData.title}/>

            <Image src={eventData.imageURL || MockImage} alt="alt" width={'0'} height={'0'} sizes='100vw' className="w-full h-full object-cover"/>

            <div className='mb-4'>
                <div className="flex flex-wrap justify-between mx-3 my-4">
                    <div className="flex items-center mb-2">
                        <Image src={DateIcon} alt="alt" width={35} height={35} />
                        <p className="mb-0">
                            {format(eventData.available_at, "dd/MM/yyyy")} -{" "}
                            {format(eventData.finish_at, "dd/MM/yyyy")}
                        </p>
                    </div>

                    <div className="flex items-center mb-2">
                        <Image src={TimeIcon} alt="alt" width={35} height={35} />
                        <p className="mb-0">
                            {format(eventData.available_at, "hh:mm")} -{" "}
                            {format(eventData.finish_at, "hh:mm a")}
                        </p>
                    </div>

                    <div></div>
                    <div></div>

                    <div className="flex items-center mb-2">
                        <div
                            style={{
                                display: "inline-block",
                                backgroundColor:
                                    eventData.available_at <= new Date() &&
                                    eventData.finish_at >= new Date()
                                        ? "orange"
                                        : eventData.finish_at > new Date()
                                            ? "#20FF51"
                                            : "red",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                marginRight: "8px",
                            }}
                        ></div>
                        <p className="mb-0">
                            {eventData.available_at <= new Date() &&
                            eventData.finish_at >= new Date()
                                ? "Evento en curso"
                                : eventData.finish_at > new Date()
                                    ? "Abierto plazo de inscripción"
                                    : "Cerrado plazo de inscripción"}
                        </p>
                    </div>
                </div>

                <div className="flex mx-3 my-4">
                    <Image src={PlaceIcon} alt="alt" width={35} height={35} />
                    <p className="">{eventData.ubications.place}, {eventData.ubications.address}</p>
                </div>

                <div className="flex mx-3 my-4">
                    <Image src={CapIcon} alt="alt" width={35} height={35} />
                    <p className="">Max. {eventData.capacity} personas</p>
                </div>

                <div className="flex mx-3 my-4">
                    <Image src={OrganizatorIcon} alt="alt" width={35} height={35} />
                    <p className="">Organiza: {eventData.organizator}</p>
                </div>
            </div>

            <div className='mx-3 my-8'>
                <p>{eventData.description}</p>
            </div>

            <div className='flex justify-center my-8'>
                <InscribeEventButton />
            </div>

        </>
    );
}

