import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, borrowers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">Borrower Management</h2>}
        >
            <Head title="Manage Borrowers" />

            <div className="space-y-6">
                
                {/* 1. ACTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">All Borrowers</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage profiles, track status, and issue new loans.</p>
                    </div>
                    
                    <Link
                        href={route('borrowers.create')}
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    >
                        <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add New Borrower
                    </Link>
                </div>

                {/* 2. DATA TABLE CARD */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Borrower Identity</th>
                                    <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                                    <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {borrowers.length > 0 ? (
                                    borrowers.map((borrower) => (
                                        <tr key={borrower.id} className="hover:bg-slate-50/80 transition-colors duration-150 group">
                                            
                                            {/* Name & Avatar */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform duration-200">
                                                        {borrower.full_name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-slate-900">{borrower.full_name}</div>
                                                        <div className="text-xs text-slate-400">ID: #{String(borrower.id).padStart(4, '0')}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact & Address */}
                                            <td className="px-6 py-5">
                                                <div className="text-sm text-slate-600 font-medium flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                    {borrower.contact_number}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2 truncate max-w-[200px]">
                                                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    {borrower.address}
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                                    borrower.status === 'active' 
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                    : 'bg-slate-50 text-slate-600 border-slate-200'
                                                }`}>
                                                    <span className={`w-2 h-2 mr-2 rounded-full ${borrower.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                                    {borrower.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    
                                                    {/* Loan Action */}
                                                    <Link 
                                                        href={route('loans.create', borrower.id)} 
                                                        className="group/btn relative inline-flex items-center justify-center p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors tooltip-container"
                                                        title="Create Loan"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                                        <span className="hidden lg:inline ml-2 text-xs font-bold">Loan</span>
                                                    </Link>

                                                    {/* Edit Action */}
                                                    <Link 
                                                        href={route('borrowers.edit', borrower.id)} 
                                                        className="group/btn relative inline-flex items-center justify-center p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all"
                                                        title="Edit Profile"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </Link>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State */
                                    <tr>
                                        <td colSpan="4" className="px-6 py-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900">No borrowers found</h3>
                                                <p className="text-slate-500 max-w-sm mt-1 mb-6">Your list is currently empty. Start by adding a new borrower profile to the system.</p>
                                                <Link
                                                    href={route('borrowers.create')}
                                                    className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                    Add First Borrower
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Optional Footer for Pagination (Static for now) */}
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Showing {borrowers.length} results</span>
                        {/* Placeholder pagination buttons if needed later */}
                        <div className="flex gap-2">
                            <button className="px-3 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}