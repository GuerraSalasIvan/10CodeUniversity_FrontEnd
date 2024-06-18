'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, Whisper, Popover } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/event');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    function renderCell(date) {
        const currentDate = new Date();
        const eventsOnDate = events.filter(event => {
            const eventDate = new Date(event.available_at);
            const endDate = new Date(event.finish_at);
            return (
                (eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()) ||
                (endDate.getDate() === date.getDate() &&
                endDate.getMonth() === date.getMonth() &&
                endDate.getFullYear() === date.getFullYear())
            );
        });

        if (eventsOnDate.length > 0) {
            const popoverContent = (
                <Popover>
                    <ul>
                        {eventsOnDate.map(event => (
                            <li key={event.id}>
                                {event.title}
                            </li>
                        ))}
                    </ul>
                </Popover>
            );

            if (eventsOnDate.some(event => {
                const eventDate = new Date(event.available_at);
                return (
                    eventDate.getDate() === date.getDate() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                );
            })) {
                return (
                    <Whisper placement="top" trigger="click" speaker={popoverContent}>
                        <span style={{ color: 'red', cursor: 'pointer' }}>●</span>
                    </Whisper>
                );
            } else {
                return (
                    <Whisper placement="top" trigger="click" speaker={popoverContent}>
                        <span style={{ color: 'blue', cursor: 'pointer' }}>●</span>
                    </Whisper>
                );
            }
        }

        return null;
    }

    return <Calendar bordered compact renderCell={renderCell} />;
};

export default CalendarComponent;
