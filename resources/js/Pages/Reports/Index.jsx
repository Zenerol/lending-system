import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, month, stats, overdue_loans }) {
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">Financial Intelligence</h2>}
        >
            <Head title="Reports" />

            {/* PRINT STYLES: Optimized for paper (removes colors/gradients) */}
            <style>{`
                @media print {
                    aside, header, button, .no-print { display: none !important; }
                    main { padding: 0 !important; margin: 0 !important; }
                    body { background: white !important; font-family: serif !important; color: black !important; }
                    .print-header { display: block !important; margin-bottom: 30px; text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; }
                    .gradient-card { background: white !important; color: black !important; border: 1px solid #ccc !important; box-shadow: none !important; }
                    .gradient-text { color: black !important; }
                    .text-white { color: black !important; }
                    .text-slate-100 { color: #666 !important; }
                    .bg-white { box-shadow: none !important; border: 1px solid #ddd !important; }
                }
                .print-header { display: none; }
            `}</style>

            <div className="space-y-10">
                
                {/* 1. Header with Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Monthly Performance</h1>
                        <p className="text-sm text-slate-500 mt-1">Financial summary for <span className="font-bold text-slate-800">{month}</span></p>
                    </div>
                    <button 
                        onClick={handlePrint}
                        className="inline-flex items-center px-5 py-2.5 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-lg hover:bg-slate-700 hover:-translate-y-0.5 transition-all group"
                    >
                        <svg className="w-5 h-5 mr-2 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        Print Report
                    </button>
                </div>

                {/* HIDDEN PRINT HEADER */}
                <div className="print-header">
                    <h1 className="text-3xl font-bold uppercase tracking-widest">Lending System Report</h1>
                    <p className="text-sm mt-2">Generated on: {new Date().toLocaleDateString()}</p>
                    <p className="text-sm">Period: {month}</p>
                </div>

                {/* 2. METRIC CARDS (Gradient Style) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Collected */}
                    <div className="gradient-card relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded text-white">Cash In</span>
                            </div>
                            <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Total Collected</p>
                            <h2 className="text-3xl font-extrabold tracking-tight">{formatCurrency(stats.collected)}</h2>
                        </div>
                    </div>

                    {/* Released */}
                    <div className="gradient-card relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded text-white">Cash Out</span>
                            </div>
                            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Total Released</p>
                            <h2 className="text-3xl font-extrabold tracking-tight">{formatCurrency(stats.released)}</h2>
                        </div>
                    </div>

                    {/* Overdue */}
                    <div className="gradient-card relative overflow-hidden bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-rose-200">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded text-white">Warning</span>
                            </div>
                            <p className="text-rose-100 text-xs font-bold uppercase tracking-widest mb-1">Overdue Accounts</p>
                            <h2 className="text-3xl font-extrabold tracking-tight">{stats.overdue_count}</h2>
                        </div>
                    </div>

                </div>

                {/* 3. OVERDUE ACCOUNTS TABLE */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${overdue_loans.length > 0 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                            <h3 className="font-bold text-lg text-slate-800">Critical Attention List</h3>
                        </div>
                        {overdue_loans.length === 0 && (
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">All Clear</span>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Borrower</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Amount Due</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {overdue_loans.length > 0 ? (
                                    overdue_loans.map((loan) => (
                                        <tr key={loan.id} className="hover:bg-rose-50 transition-colors group">
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <div className="font-bold text-slate-800 group-hover:text-rose-700">{loan.borrower.full_name}</div>
                                                <div className="text-xs text-slate-400">Ref: {loan.loan_reference_id}</div>
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-600">
                                                {loan.borrower.contact_number}
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-700">
                                                    {loan.due_date}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap text-right font-extrabold text-slate-800">
                                                {formatCurrency(loan.total_payable)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State for Reports */
                                    <tr>
                                        <td colSpan="4" className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-800">Excellent Work!</h3>
                                                <p className="text-slate-500 max-w-sm mt-1">There are no overdue accounts for this period.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}