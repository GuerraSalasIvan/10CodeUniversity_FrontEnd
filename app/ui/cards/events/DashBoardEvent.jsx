import { format } from "date-fns";
import {EllipsisVerticalIcon} from '@heroicons/react/24/outline';

export default async function DashBoardEvent(){
    const eventData = await getData()

    return(
        <>
        {eventData.map((eventData, index) => (
            <div key={index} className="m-2 bg-secondary-400 bg-opacity-10 border border-secondary-400 rounded-md px-5 py-2">
                <div className="flex justify-between">
                    <h1 className="text-base text-title-dark-700 font-bold pb-2">{eventData.title}</h1>
                    <EllipsisVerticalIcon className="h-6 w-9 -mr-3 text-gray-500" />
                </div>

                <div className="flex justify-between">
                    <p className="text-subtitle-event-800">{format(new Date(eventData.available_at), "d/M/yyyy")}</p>
                    <p className="text-subtitle-event-800">{format(new Date(eventData.available_at), "HH:mm")}</p>
                </div>
            </div>
        ))}
        </>
    );
}

async function getData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/dashboard");
        const data = await response.json();
        return data.data;

    } catch (error) {
        return [];
    }
}