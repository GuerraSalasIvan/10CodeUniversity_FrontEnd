'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import DarkTitle from '@/app/ui/titles/DarkTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export default function EventCreate() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(1);
    const [valueDate, setValueDate] = useState([new Date(), new Date()]);
    const [disabledDates, setDisabledDates] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/ubications');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        if (selectedLocation) {
        axios
            .get(`http://localhost:8000/api/ubications/${selectedLocation}`)
            .then((response) => {
            const { disabledDates } = response.data;
            setDisabledDates(disabledDates);
            })
            .catch((error) => console.error('Error fetching disabled dates:', error));
        }
    }, [selectedLocation]);

    const tileDisabled = ({ date }) => {
        return disabledDates.some((range) => {
        const start = new Date(range.start);
        const end = new Date(range.end);
        return date >= start && date <= end;
        });
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        try {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('organizator', data.organizator);
        formData.append('capacity', data.capacity);
        formData.append('ubication_id', data.ubication_id);
        formData.append('available_at', dayjs(valueDate[0]).format('YYYY-MM-DD HH:mm:ss'));
        formData.append('finish_at', dayjs(valueDate[1]).format('YYYY-MM-DD HH:mm:ss'));

        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        }

        const response = await axios.post('http://localhost:8000/api/event', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response from server:', response.data);
        reset();
        router.push('/dashboard/events');
        } catch (error) {
        console.error('Error submitting event:', error);
        setError('Error submitting event');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
        <DarkTitle text="Crear Evento" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
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
                Location
            </label>
            <select
                id="ubication_id"
                {...register('ubication_id', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={(e) => setSelectedLocation(e.target.value)}
            >
                <option value="">Select a location</option>
                {locations.map((location) => (
                <option key={location.id} value={location.id}>
                    {location.place}
                </option>
                ))}
            </select>
            </div>

            <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Calendar
                onChange={(newValue) => {
                    setValueDate(newValue);
                    setValue('available_at', newValue[0]);
                    setValue('finish_at', newValue[1]);
                }}
                value={valueDate}
                selectRange={true}
                tileDisabled={tileDisabled}
                />
            </LocalizationProvider>
            <p>Selected range: {valueDate[0].toDateString()} - {valueDate[1].toDateString()}</p>
            </div>

            <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
            </label>
            <input
                id="image"
                type="file"
                {...register('image')}
                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            </div>

            <div>
            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create Event'}
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