'use client'

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import DarkTitle from '@/app/ui/titles/DarkTitle';
import { useRouter } from 'next/navigation';

export default function Create() {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('place', data.place);
            formData.append('place_description', data.place_description);
            formData.append('address', data.address);
            formData.append('capacity', data.capacity);
            formData.append('opens_at', data.opens_at);
            formData.append('closes_at', data.closes_at);
            formData.append('image', data.image[0]);

            const response = await axios.post('http://localhost:8000/api/ubications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            reset();
            router.push('/dashboard/ubications');

        } catch (error) {
            console.error('Error creating location:', error);
            setError('Error creating location');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <DarkTitle text={'Crear Ubicación'}/>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                        Place
                    </label>
                    <input
                        id="place"
                        type="text"
                        {...register('place', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="place_description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="place_description"
                        {...register('place_description', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        {...register('address', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
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
                    <label htmlFor="opens_at" className="block text-sm font-medium text-gray-700">
                        Opens At
                    </label>
                    <input
                        id="opens_at"
                        type="time"
                        {...register('opens_at', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="closes_at" className="block text-sm font-medium text-gray-700">
                        Closes At
                    </label>
                    <input
                        id="closes_at"
                        type="time"
                        {...register('closes_at', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        {...register('image', { required: true })}
                        className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Location'}
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
