import React from 'react'
import UbicationDetail from '@/app/ui/sections/ubications/UbicationDetail';

export default async function page({ params }) {

    const { ubicationId } = params;
    const ubicationData = await getData(ubicationId);

    return (
        <div>
            <UbicationDetail ubicationData={ubicationData}/>
        </div>
    )
}
async function getData(ubicationId) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/ubications/" + ubicationId, {cache:'no-store'});
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}


