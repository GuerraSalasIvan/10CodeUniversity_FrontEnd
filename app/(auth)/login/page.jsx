'use client';

import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import Image from "next/image";
import Link from 'next/link';

const Login = () => {
    const router = useRouter();

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (router.reset?.length > 0 && Object.keys(errors).length === 0) {
            setStatus(atob(router.reset));
        } else {
            setStatus(null);
        }
    }, [router.reset, errors]);

    const submitForm = async event => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await login({
                email,
                password,
                setErrors,
                setStatus,
            });
        } catch (error) {
            setErrors({ general: 'Email o contraseña incorrectos' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <div className="mb-6 text-center">
                    <Image
                        src="/assets/img/10code_logo.jpg"
                        alt="Logo de la empresa 10Code"
                        className="mx-auto"
                        width={244}
                        height={67}
                        style={{ width: '244px', height: '67px' }}
                    />
                </div>
                <form onSubmit={submitForm}>
                    {status && <div className="mb-4 text-green-500">{status}</div>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {errors.email && <div className="text-red-500 mt-2">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Contraseña</label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <div id="icono-toggle" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <FontAwesomeIcon icon={faEyeSlash} className="cursor-pointer" />
                            </div>
                        </div>
                        {errors.password && <div className="text-red-500 mt-2">{errors.password}</div>}
                    </div>
                    {errors.general && <div className="mb-4 text-red-500">{errors.general}</div>}
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p>¿No tienes cuenta? <Link href="/register" className="text-blue-500 hover:underline">Crear cuenta</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
