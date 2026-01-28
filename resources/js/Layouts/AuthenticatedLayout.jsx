import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const { url } = usePage();
    const isActive = (route) => url.startsWith(route);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-[Plus_Jakarta_Sans]">
            
            {/* --- SIDEBAR --- */}
            <aside className="w-72 bg-[#0F172A] text-white flex flex-col fixed h-full z-30 shadow-2xl transition-all duration-300">
                {/* Brand */}
                <div className="h-24 flex items-center px-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <span className="text-white font-extrabold text-xl">₱</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white leading-none">LEND<span className="text-blue-500">SYS</span></h1>
                            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-1">Admin Console</p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Main Menu</p>
                    <SidebarLink href={route('dashboard')} active={isActive('/dashboard')} icon="dashboard">Dashboard</SidebarLink>
                    <SidebarLink href={route('borrowers.index')} active={isActive('/borrowers')} icon="users">Manage Borrowers</SidebarLink>
                    <SidebarLink href={route('loans.index')} active={isActive('/loans')} icon="cash">Manage Loans</SidebarLink>
                    
                    <p className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-8 mb-4">Analytics</p>
                    <SidebarLink href={route('reports.index')} active={isActive('/reports')} icon="chart">Financial Reports</SidebarLink>
                </nav>

                {/* Profile */}
                <div className="p-4 border-t border-slate-800/50">
                    <div className="bg-slate-800/40 rounded-2xl p-4 backdrop-blur-sm border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {user.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
                                <p className="text-xs text-slate-400 truncate">Administrator</p>
                            </div>
                        </div>
                        <Link href={route('logout')} method="post" as="button" className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-700/50 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all duration-200 group">
                            Sign Out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 ml-72 flex flex-col min-h-screen transition-all duration-300">
                
                {/* TOP HEADER - UPDATED: Now dynamic based on the page */}
                <header className="h-24 flex items-center justify-between px-10 sticky top-0 z-20 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-transparent transition-all">
                    
                    {/* LEFT SIDE: This renders whatever the page sends (e.g., Big Welcome OR Page Title) */}
                    <div className="flex-1">
                        {header}
                    </div>

                    {/* RIGHT SIDE: Notification Bell */}
                    <div className="flex items-center gap-4 pl-6">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative bg-white rounded-full shadow-sm hover:shadow-md border border-slate-100">
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </button>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="px-10 pb-10 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

// Sidebar Link Component (Kept same for consistency)
function SidebarLink({ href, active, children, icon }) {
    const icons = {
        dashboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
        users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
        cash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
        chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
    };

    return (
        <Link
            href={href}
            className={`relative flex items-center px-4 py-3.5 mx-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                active ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
        >
            {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>}
            <svg className={`w-5 h-5 mr-3 transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[icon]}</svg>
            <span className="tracking-wide">{children}</span>
        </Link>
    );
}