
import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    const fetchUser = async () => {
        return axios
            .get('/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;
                router.push('/verify-email');
            });
    };

    const { data: user, error, mutate } = useSWR('/user', fetchUser);

    const register = async ({ setErrors, ...props }) => {
        setErrors([]);

        try {
            const response = await axios.post('/register', props);
            const { access_token, user } = response.data;
            localStorage.setItem('token', access_token);
            mutate(user);
        } catch (error) {
            if (error.response.status !== 422) throw error;
            setErrors(error.response.data.errors);
        }
    };

    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors([]);
        setStatus(null);

        try {
            const response = await axios.post('/login', props);
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            mutate(user);
        } catch (error) {
            if (error.response.status !== 422) throw error;
            setErrors(error.response.data.errors);
        }
    };

    const logout = async () => {
        try {
            await axios.get('/logout');
            localStorage.removeItem('token');
            mutate(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
        }
        if (window.location.pathname === '/verify-email' && user?.email_verified_at) {
            router.push(redirectIfAuthenticated);
        }
        if (middleware === 'auth' && error) logout();
    }, [user, error]);

    return {
        user,
        register,
        login,
        logout,
    };
};
