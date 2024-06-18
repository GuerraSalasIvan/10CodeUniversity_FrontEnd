'use client';

import React, { useEffect } from 'react';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { useForm } from 'react-hook-form';
import DarkTitle from '@/app/ui/titles/DarkTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';


export default function EventEdit({ eventId }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [availableAt, setAvailableAt] = React.useState(null);
    const [finishAt, setFinishAt] = React.useState(null);
    const router = useRouter();


    useEffect(() => {
        async function fetchEventData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/event/${eventId}`, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();

                setValue('title', eventData.title);
                setValue('description', eventData.description);
                setValue('organizator', eventData.organizator);
                setValue('capacity', eventData.capacity);
                setValue('ubication_id', eventData.ubication_id);

                const availableAtDate = dayjs(eventData.available_at);
                const finishAtDate = dayjs(eventData.finish_at);

                setAvailableAt(availableAtDate);
                setFinishAt(finishAtDate);

                setValue('available_at', availableAtDate);
                setValue('finish_at', finishAtDate);
            } catch (error) {
                console.error('Error fetching event data:', error);
                setError('Error fetching event data');
            }
        }
        fetchEventData();
    }, [eventId, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            // Convert date objects to ISO strings before sending
            data.available_at = availableAt.toISOString();
            data.finish_at = finishAt.toISOString();

            if (data.image[0]) {
                const file = data.image[0];
                const base64Image = await convertToBase64(file);
                data.image = base64Image;
            } else {
                data.image = null;
            }

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(`http://127.0.0.1:8000/api/event/${eventId}/edit`, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to update event');
            }

            console.log('Response from server:', await response.json());
            reset();
            router.push('/dashboard/events');

        } catch (error) {
            console.error('Error submitting event:', error);
            setError('Error submitting event');
        } finally {
            setLoading(false);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="container mx-auto p-4">
            <DarkTitle text="Editar Evento" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register('title', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register('description', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="organizator" className="block text-sm font-medium text-gray-700">
                        Organizator
                    </label>
                    <input
                        id="organizator"
                        type="text"
                        {...register('organizator', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                        Capacity
                    </label>
                    <input
                        id="capacity"
                        type="number"
                        {...register('capacity', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="ubication_id" className="block text-sm font-medium text-gray-700">
                        Ubication ID
                    </label>
                    <input
                        id="ubication_id"
                        type="number"
                        {...register('ubication_id', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex space-x-4">
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Inicio"
                                value={availableAt}
                                onChange={(value) => {
                                    setAvailableAt(value);
                                    setValue('available_at', value);
                                }}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                            />
                        </LocalizationProvider>
                    </div>

                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Fin"
                                value={finishAt}
                                onChange={(value) => {
                                    setFinishAt(value);
                                    setValue('finish_at', value);
                                }}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        {...register('image')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Event'}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 text-red-500">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}
