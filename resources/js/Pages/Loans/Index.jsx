import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, loans }) {
    
    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    // Helper to style status badges
    const getStatusStyle = (status, dueDate) => {
        const isOverdue = status === 'active' && new Date(dueDate) < new Date();
        
        if (status === 'completed') {
            return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        }
        if (isOverdue) {
            return 'bg-rose-50 text-rose-700 border-rose-100';
        }
        return 'bg-blue-50 text-blue-700 border-blue-100';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">Loan Management</h2>}
        >
            <Head title="All Loans" />

            <div className="space-y-6">
                
                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Master Loan List</h1>
                        <p className="text-sm text-slate-500 mt-1">Track active contracts, monitor due dates, and view payment history.</p>
                    </div>
                    {/* Optional: Quick Link to create loan (via Borrowers) */}
                    <Link
                        href={route('borrowers.index')}
                        className="inline-flex items-center px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-sm hover:text-blue-600 hover:border-blue-200 transition-all"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        New Loan Contract
                    </Link>
                </div>

                {/* 2. Data Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Ref ID</th>
                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Borrower</th>
                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Principal</th>
                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Total Payable</th>
                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {loans.length > 0 ? (
                                    loans.map((loan) => (
                                        <tr key={loan.id} className="hover:bg-slate-50/80 transition-colors duration-150 group">
                                            
                                            {/* Reference ID */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                                    {loan.loan_reference_id}
                                                </span>
                                            </td>

                                            {/* Borrower Info */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs mr-3">
                                                        {loan.borrower.full_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-800">{loan.borrower.full_name}</div>
                                                        <div className="text-xs text-slate-400">Due: <span className="font-medium text-slate-500">{loan.due_date}</span></div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Principal */}
                                            <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-600">
                                                {formatCurrency(loan.principal_amount)}
                                            </td>

                                            {/* Payable (Highlighted) */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="text-sm font-extrabold text-slate-800">
                                                    {formatCurrency(loan.total_payable)}
                                                </div>
                                                <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                                                    + {formatCurrency(loan.total_interest)} Interest
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusStyle(loan.status, loan.due_date)}`}>
                                                    {/* Dot Indicator */}
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                        loan.status === 'completed' ? 'bg-emerald-500' : 
                                                        (loan.status === 'active' && new Date(loan.due_date) < new Date()) ? 'bg-rose-500' : 'bg-blue-500'
                                                    }`}></span>
                                                    
                                                    {/* Text Logic: Check for Overdue */}
                                                    {loan.status === 'active' && new Date(loan.due_date) < new Date() 
                                                        ? 'OVERDUE' 
                                                        : loan.status}
                                                </span>
                                            </td>

                                            {/* Action Button */}
                                            <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                <Link 
                                                    href={route('loans.show', loan.id)} 
                                                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all group/btn"
                                                >
                                                    Details
                                                    <svg className="w-4 h-4 ml-2 text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-blue-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State */
                                    <tr>
                                        <td colSpan="6" className="px-6 py-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900">No active loans</h3>
                                                <p className="text-slate-500 max-w-sm mt-1">There are no loan records in the system yet.</p>
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