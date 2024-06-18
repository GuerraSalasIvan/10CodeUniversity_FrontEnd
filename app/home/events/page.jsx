'use client';

import { useState, useEffect } from 'react';
import ListSectionEvent from '@/app/ui/sections/event/ListSectionEvent';
import Pagination from '@/app/ui/sections/event/Pagination';

export default function Page() {
    const [eventData, setEventData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(currentPage);
            if (data && data.data) {
                setEventData(data.data);
                setTotalPages(data.last_page);
            }
        };

        fetchData();
    }, [currentPage]);

    console.log('aqui', eventData);

    return (
        <>
            <ListSectionEvent eventData={eventData} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </>
    );
}

async function getData(page = 1) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/event/list?page=${page}`, { cache: 'no-store' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { data: [], last_page: 1 };
    }
}
