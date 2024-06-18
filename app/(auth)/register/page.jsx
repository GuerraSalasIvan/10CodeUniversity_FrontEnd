'use client'

import fondo from '@/public/img/fondo_login.jpg';
import Logo from '@/public/img/10code_logo.jpg';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
    const router = useRouter();
    const { register } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/dashboard' });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        await register({
            name,
            email,
            password,
            setErrors,
        });

        setIsSubmitting(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Image
                src={fondo}
                alt="Logo de la empresa 10Code"
                fill={true}
                className="mx-auto -z-10"
            />
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <Link href="/home">
                    <Image
                        src={Logo}
                        alt="Logo de la empresa 10Code"
                        width={244}
                        height={67}
                        className="mx-auto mb-8"
                    />
                </Link>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                            autoFocus
                        />
                        {errors.name && <div className="mt-2 text-sm text-red-600">{errors.name}</div>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        {errors.email && <div className="mt-2 text-sm text-red-600">{errors.email}</div>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        {errors.password && <div className="mt-2 text-sm text-red-600">{errors.password}</div>}
                    </div>

                    {errors.general && (
                        <div className="mt-4 text-sm text-red-600">
                            {errors.general}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-secondary-500 rounded-md shadow-sm hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login">
                        <p className="text-indigo-600 hover:text-indigo-500">Inicia sesión aquí</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
