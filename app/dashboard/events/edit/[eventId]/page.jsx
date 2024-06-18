import EventEdit from '@/app/ui/forms/events/EventEdit';

export default function EditEvent({params}) {
    const { eventId } = params;

    return (
        <>
            <EventEdit eventId={eventId}/>
        </>
    );
}