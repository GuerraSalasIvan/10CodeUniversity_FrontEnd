'use client'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DarkTitle from '@/app/ui/titles/DarkTitle';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function EventCreateEdit({ eventId }) {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(!!eventId);

    const [availableAt, setAvailableAt] = useState(null);
    const [finishAt, setFinishAt] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            async function fetchEventData() {
                try {
                    const response = await axios.get(`http://localhost:8000/api/event/${eventId}`, { cache: 'no-store' });
                    const eventData = response.data;

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
        }
    }, [eventId, isEditMode, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            let formData = new FormData();

            data.available_at = dayjs(data.available_at).format('YYYY-MM-DD HH:mm:ss');
            data.finish_at = dayjs(data.finish_at).format('YYYY-MM-DD HH:mm:ss');

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === 'image' && data[key][0]) {
                        formData.append(key, data[key][0]);
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            }
            console.log(data)

            if (isEditMode) {
                const response = await axios.put(`http://localhost:8000/api/event/${eventId}/edit`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });

                console.log('Response from server:', response.data);
            } else {
                const response = await axios.post('http://localhost:8000/api/event', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Response from server:', response.data);
            }
            reset();

        } catch (error) {
            console.error('Error submitting event:', error);
            setError('Error submitting event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <DarkTitle text={isEditMode ? 'Editar Evento' : 'Crear Evento'} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType='multipart/form-data'>
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

                <div className='w-full'>
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

                <div className='flex space-x-4'>
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
                        {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Event' : 'Create Event')}
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
