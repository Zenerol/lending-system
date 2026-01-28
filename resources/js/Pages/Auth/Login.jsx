import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '', // Changed from email to username
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex text-gray-800 antialiased bg-white overflow-hidden">
            <Head title="Admin Login" />

            {/* LEFT SIDE: Visual Branding */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
                {/* Abstract Background Shapes (CSS-only aesthetic) */}
                <div className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-20 -left-20 animate-blob"></div>
                <div className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-40 right-10 animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10 text-center px-12">
                    <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
                        Lending Management
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Secure. Efficient. Professional.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative">
                <div className="max-w-md w-full">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4 shadow-sm">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-500">Please enter your username to access the dashboard.</p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-lg text-center">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <input
                                    id="username"
                                    type="text"
                                    className="block w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-0 transition duration-200"
                                    placeholder="Enter your username"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    autoComplete="username"
                                />
                            </div>
                            {errors.username && <p className="mt-2 text-sm text-red-500">{errors.username}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-0 transition duration-200"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                            />
                            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-600">
                                Keep me logged in
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="absolute bottom-6 text-center text-xs text-gray-400">
                    &copy; 2026 Lending Management System. All rights reserved.
                </div>
            </div>
        </div>
    );
}