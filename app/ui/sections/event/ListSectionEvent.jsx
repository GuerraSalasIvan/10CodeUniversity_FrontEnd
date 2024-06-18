// components/ListSectionEvent.js

import TitleBluePadding from '@/app/ui/titles/TitleBluePadding';
import BigCard from '@/app/ui/cards/events/BigCard';

export default function ListSectionEvent({ eventData }) {
    return (
        <div>
            <TitleBluePadding text={'Eventos'} />
            <div className="grid grid-cols-3 my-6">
                {eventData && eventData.length > 0 ? (
                    eventData.map((event, index) => (
                        <div key={index} className="m-3">
                            <BigCard eventData={event} />
                        </div>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
}

