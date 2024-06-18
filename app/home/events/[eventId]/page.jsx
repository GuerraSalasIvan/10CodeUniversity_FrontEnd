
import EventDetail from '@/app/ui/sections/event/EventDetail';

export default async function Page({params}) {
    const { eventId } = params;

    const eventData = await getData(eventId);

    return (
        <>
            <EventDetail eventData={eventData}/>
        </>
    );
}

async function getData(eventId) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/event/" + eventId, {cache:'no-store'});
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

