import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    // UPDATED: Using 'username' instead of 'email'
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
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
        <div className="min-h-screen flex font-[Plus_Jakarta_Sans]">
            <Head title="Log in" />

            {/* LEFT COLUMN: BRANDING & VISUALS */}
            <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative overflow-hidden items-center justify-center p-12">
                {/* Abstract Glow Effects */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                <div className="relative z-10 max-w-lg text-center">
                    <div className="inline-flex items-center gap-3 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                            <span className="text-white font-extrabold text-3xl">₱</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white">LEND<span className="text-blue-500">SYS</span></h1>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
                        Professional Lending <br/> Management System.
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Securely manage borrowers, track loan lifecycles, and analyze financial performance in one unified dashboard.
                    </p>
                    
                    {/* Trust/Status Badge */}
                    <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 backdrop-blur-sm">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-300">System Operational & Secure</span>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: LOGIN FORM */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 md:p-12">
                <div className="w-full max-w-md space-y-8">
                    
                    {/* Mobile Logo (Visible only on small screens) */}
                    <div className="lg:hidden flex justify-center mb-6">
                        <div className="flex items-center gap-2">
                             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">₱</span>
                            </div>
                            <span className="text-2xl font-bold text-slate-900">LENDSYS</span>
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                        <p className="text-slate-500 mt-2">Please enter your details to access the admin console.</p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600 p-3 bg-green-50 rounded-lg">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        
                        {/* USERNAME INPUT (Updated) */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    {/* User Icon */}
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-slate-900 font-medium transition-all placeholder:text-slate-400"
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            {/* Check for both 'username' and 'email' errors just in case backend sends either */}
                            <InputError message={errors.username || errors.email} className="mt-2" />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-slate-900 font-medium transition-all placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-slate-600 font-medium">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Signing in...' : 'Sign in to Dashboard'}
                        </button>

                        <div className="text-center mt-6">
                            <p className="text-sm text-slate-400">
                                © 2026 LENDSYS. Secure Admin Portal.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}