import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Create({ auth, borrower }) {
    const { data, setData, post, processing, errors } = useForm({
        borrower_id: borrower.id,
        principal_amount: '',
        interest_rate: '',
        loan_term: '',
        term_type: 'months',
        start_date: new Date().toISOString().split('T')[0],
    });

    const [calculation, setCalculation] = useState({ interest: 0, total: 0 });

    useEffect(() => {
        const principal = parseFloat(data.principal_amount) || 0;
        const rate = parseFloat(data.interest_rate) || 0;
        const term = parseFloat(data.loan_term) || 0;

        const interest = principal * (rate / 100) * term;
        const total = principal + interest;

        setCalculation({ interest, total });
    }, [data.principal_amount, data.interest_rate, data.loan_term]);

    const submit = (e) => {
        e.preventDefault();
        post(route('loans.store'));
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">New Loan Contract</h2>}
        >
            <Head title="Create Loan" />

            <div className="max-w-6xl mx-auto">
                
                {/* Header / Breadcrumb */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Draft Contract</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Creating loan for <span className="font-bold text-slate-800">{borrower.full_name}</span>
                        </p>
                    </div>
                    <Link
                        href={route('borrowers.index')}
                        className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Cancel Draft
                    </Link>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* LEFT COLUMN: INPUT FORM */}
                    <div className="lg:col-span-2 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8">
                        
                        <div className="flex items-center gap-4 mb-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                                {borrower.full_name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">{borrower.full_name}</h3>
                                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Borrower ID: #{String(borrower.id).padStart(4, '0')}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            
                            {/* Principal Input (Large) */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Principal Amount</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-slate-400 font-bold text-xl">₱</span>
                                    </div>
                                    <input
                                        type="number"
                                        className="block w-full pl-10 pr-4 py-4 text-3xl font-bold text-slate-800 bg-slate-50 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-0 transition-all placeholder:text-slate-300"
                                        placeholder="0.00"
                                        value={data.principal_amount}
                                        onChange={(e) => setData('principal_amount', e.target.value)}
                                    />
                                </div>
                                {errors.principal_amount && <p className="text-sm text-red-500 font-medium mt-1">{errors.principal_amount}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Interest Rate */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Interest Rate (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="block w-full px-4 py-3 font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="e.g. 5"
                                            value={data.interest_rate}
                                            onChange={(e) => setData('interest_rate', e.target.value)}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <span className="text-slate-400 font-bold">%</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1.5 ml-1">Flat rate applied to the total term.</p>
                                </div>

                                {/* Loan Term */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Duration</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            className="block w-full px-4 py-3 font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="1"
                                            value={data.loan_term}
                                            onChange={(e) => setData('loan_term', e.target.value)}
                                        />
                                        <select
                                            className="w-1/3 px-2 py-3 font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            value={data.term_type}
                                            onChange={(e) => setData('term_type', e.target.value)}
                                        >
                                            <option value="months">Months</option>
                                            <option value="days">Days</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Start Date</label>
                                <input
                                    type="date"
                                    className="block w-full px-4 py-3 font-medium text-slate-700 bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: LIVE SIMULATION (Dark Card) */}
                    <div className="lg:col-span-1 sticky top-8">
                        <div className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            {/* Decorative Blur */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20"></div>

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 3.666V14m-1.294.706L9 14m0-4h6m0-3.666V7m0 6a2 2 0 100 4 2 2 0 000-4z" /></svg>
                                    Loan Simulator
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm text-slate-400">
                                        <span>Principal</span>
                                        <span className="font-medium text-white">{formatCurrency(parseFloat(data.principal_amount) || 0)}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center text-sm text-slate-400">
                                        <span>Interest ({data.interest_rate || 0}%)</span>
                                        <span className="font-medium text-emerald-400">+ {formatCurrency(calculation.interest)}</span>
                                    </div>

                                    <div className="h-px bg-slate-700 my-4"></div>

                                    <div>
                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Total Payable Amount</span>
                                        <div className="text-3xl font-extrabold text-white mt-1">
                                            {formatCurrency(calculation.total)}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {processing ? 'Processing...' : (
                                            <>
                                                <span>Confirm Contract</span>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[10px] text-slate-500 text-center mt-3">
                                        By clicking confirm, this loan becomes active immediately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}