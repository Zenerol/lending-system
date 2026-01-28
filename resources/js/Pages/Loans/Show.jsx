import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Show({ auth, loan, stats }) {
    
    // Form for adding new payments
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        method: 'cash',
        reference_number: '',
    });

    const submitPayment = (e) => {
        e.preventDefault();
        post(route('payments.store', loan.id), {
            onSuccess: () => reset('amount', 'reference_number'),
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">Loan Contract Details</h2>}
        >
            <Head title={`Loan ${loan.loan_reference_id}`} />

            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* 1. Navigation & Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link 
                            href={route('loans.index')}
                            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{loan.loan_reference_id}</h1>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                    loan.status === 'active' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                                    loan.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                }`}>
                                    {loan.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-0.5">Contract active since <span className="font-medium text-slate-700">{loan.start_date}</span></p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* LEFT COLUMN: Details & History */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 2. Borrower & Terms Card */}
                        <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>

                            <div className="relative z-10 flex items-start gap-6 mb-8">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-sm">
                                    {loan.borrower.full_name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">{loan.borrower.full_name}</h3>
                                    <p className="text-sm text-slate-500 mb-2">{loan.borrower.contact_number}</p>
                                    <p className="text-xs text-slate-400 max-w-sm flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {loan.borrower.address}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Principal</div>
                                    <div className="text-lg font-bold text-slate-800">{formatCurrency(loan.principal_amount)}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Interest</div>
                                    <div className="text-lg font-bold text-emerald-600">+{formatCurrency(loan.total_interest)}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Payable</div>
                                    <div className="text-lg font-bold text-blue-600">{formatCurrency(loan.total_payable)}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Due Date</div>
                                    <div className="text-lg font-bold text-rose-600">{loan.due_date}</div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment History Table */}
                        <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-800">Transaction History</h3>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-full">
                                    {loan.payments.length} Payments
                                </span>
                            </div>
                            
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                        <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Method</th>
                                        <th className="px-8 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Amount Paid</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {loan.payments.length > 0 ? (
                                        loan.payments.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-slate-700">{payment.payment_date}</td>
                                                <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-500">
                                                    <div className="flex items-center gap-2">
                                                        <span className="capitalize font-medium">{payment.method}</span>
                                                        {payment.reference_number && (
                                                            <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded font-mono">
                                                                #{payment.reference_number}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4 whitespace-nowrap text-right text-sm font-bold text-emerald-600">
                                                    + {formatCurrency(payment.amount)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-12 text-center text-slate-400">
                                                No payment records found for this loan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Balance & Actions */}
                    <div className="space-y-6">
                        
                        {/* 4. Balance Card (Dark Mode) */}
                        <div className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                            {/* Glow Effects */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-[50px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full blur-[50px] opacity-20"></div>

                            <div className="relative z-10">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Remaining Balance</p>
                                <h2 className="text-4xl font-extrabold tracking-tight mb-6">{formatCurrency(stats.remaining_balance)}</h2>
                                
                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium text-slate-400">
                                        <span>Progress</span>
                                        <span className="text-white">{stats.progress}% Paid</span>
                                    </div>
                                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                                            style={{ width: `${stats.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                        <span>Paid: {formatCurrency(stats.total_paid)}</span>
                                        <span>Target: {formatCurrency(loan.total_payable)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Payment Form */}
                        {loan.status !== 'completed' && (
                            <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    Record Payment
                                </h3>
                                
                                <form onSubmit={submitPayment} className="space-y-4">
                                    
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Amount</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-slate-400 font-bold">₱</span>
                                            </div>
                                            <input
                                                type="number"
                                                className="block w-full pl-8 pr-4 py-2.5 text-lg font-bold text-slate-800 bg-slate-50 border-transparent rounded-xl focus:border-blue-500 focus:bg-white focus:ring-0 transition-all placeholder:text-slate-300"
                                                placeholder="0.00"
                                                value={data.amount}
                                                onChange={(e) => setData('amount', e.target.value)}
                                            />
                                        </div>
                                        {errors.amount && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.amount}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</label>
                                            <input
                                                type="date"
                                                className="block w-full px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 border-transparent rounded-xl focus:border-blue-500 focus:bg-white focus:ring-0 transition-all"
                                                value={data.payment_date}
                                                onChange={(e) => setData('payment_date', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Method</label>
                                            <select
                                                className="block w-full px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 border-transparent rounded-xl focus:border-blue-500 focus:bg-white focus:ring-0 transition-all"
                                                value={data.method}
                                                onChange={(e) => setData('method', e.target.value)}
                                            >
                                                <option value="cash">Cash</option>
                                                <option value="gcash">GCash</option>
                                                <option value="bank">Bank</option>
                                            </select>
                                        </div>
                                    </div>

                                    {data.method !== 'cash' && (
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Reference No.</label>
                                            <input
                                                type="text"
                                                className="block w-full px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 border-transparent rounded-xl focus:border-blue-500 focus:bg-white focus:ring-0 transition-all placeholder:text-slate-300"
                                                placeholder="Ref #"
                                                value={data.reference_number}
                                                onChange={(e) => setData('reference_number', e.target.value)}
                                            />
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-green-500/30 text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all hover:scale-[1.02]"
                                    >
                                        {processing ? 'Processing...' : 'Confirm Payment'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}