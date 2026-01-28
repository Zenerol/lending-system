import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
    };

    // THIS IS THE NEW BIG HEADER
    const DashboardHeader = (
        <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Welcome back, <span className="text-blue-600">{auth.user.name.split(' ')[0]}</span> 👋
            </h2>
            <p className="text-slate-500 font-medium text-base mt-2">
                Here's what's happening with your lending business today.
            </p>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={DashboardHeader} // Passing the big header only here!
        >
            <Head title="Dashboard" />

            <div className="space-y-10 mt-6">
                
                {/* 1. FINANCIAL HERO SECTION */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-700 tracking-tight uppercase">Financial Performance</h3>
                        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">THIS MONTH</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Money Released */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 transition-transform hover:scale-[1.01] duration-300">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-blue-100 font-medium text-sm uppercase tracking-wider mb-1">Total Released</p>
                                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{formatCurrency(stats.released_month)}</h2>
                                </div>
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Money Collected */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-500 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200 transition-transform hover:scale-[1.01] duration-300">
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-emerald-100 font-medium text-sm uppercase tracking-wider mb-1">Total Collected</p>
                                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{formatCurrency(stats.collected_month)}</h2>
                                </div>
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. OPERATIONAL STATUS */}
                <div>
                    <h3 className="text-lg font-bold text-slate-700 mb-6 tracking-tight uppercase">Operational Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Borrowers */}
                        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-6 group hover:border-blue-500/30 transition-all duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                            <div>
                                <p className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Total Borrowers</p>
                                <h3 className="text-3xl font-bold text-slate-800">{stats.borrowers}</h3>
                            </div>
                        </div>
                        {/* Active Loans */}
                        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-6 group hover:border-emerald-500/30 transition-all duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <p className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Active Loans</p>
                                <h3 className="text-3xl font-bold text-slate-800">{stats.active_loans}</h3>
                            </div>
                        </div>
                        {/* Overdue */}
                        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-6 group hover:border-rose-500/30 transition-all duration-300">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${stats.overdue > 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <p className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Overdue Count</p>
                                <h3 className={`text-3xl font-bold ${stats.overdue > 0 ? 'text-rose-600' : 'text-slate-800'}`}>{stats.overdue}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. QUICK ACTIONS */}
                <div>
                    <h3 className="text-lg font-bold text-slate-700 mb-6 tracking-tight uppercase">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href={route('borrowers.index')} className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="w-20 h-20 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Manage Borrowers</h4>
                            <p className="text-sm text-slate-500">Add profiles or update contact details.</p>
                        </Link>
                        
                        <Link href={route('borrowers.index')} className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="w-20 h-20 mx-auto bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Create New Loan</h4>
                            <p className="text-sm text-slate-500">Draft a new contract & calculate terms.</p>
                        </Link>

                        <Link href={route('loans.index')} className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="w-20 h-20 mx-auto bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Record Payment</h4>
                            <p className="text-sm text-slate-500">Log daily collections via Cash or GCash.</p>
                        </Link>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}