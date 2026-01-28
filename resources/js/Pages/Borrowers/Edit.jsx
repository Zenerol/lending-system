import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, borrower }) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: borrower.full_name || '',
        contact_number: borrower.contact_number || '',
        address: borrower.address || '',
        notes: borrower.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('borrowers.update', borrower.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">Edit Profile</h2>}
        >
            <Head title="Edit Borrower" />

            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* 1. Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Update Borrower</h1>
                        <p className="text-sm text-slate-500 mt-1">Modifying information for <span className="font-bold text-slate-800">{borrower.full_name}</span></p>
                    </div>
                    <Link
                        href={route('borrowers.index')}
                        className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to List
                    </Link>
                </div>

                {/* 2. Form Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                    
                    <form onSubmit={submit}>
                        <div className="p-8 space-y-8">
                            
                            {/* Personal Info */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    </span>
                                    Identity Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-3 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                        />
                                        {errors.full_name && <p className="text-sm text-red-500 font-medium">{errors.full_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Contact Number</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-3 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                                            value={data.contact_number}
                                            onChange={(e) => setData('contact_number', e.target.value)}
                                        />
                                        {errors.contact_number && <p className="text-sm text-red-500 font-medium">{errors.contact_number}</p>}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Address & Notes */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    </span>
                                    Location & Metadata
                                </h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Address</label>
                                        <textarea
                                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-3 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                                            rows="3"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                        />
                                        {errors.address && <p className="text-sm text-red-500 font-medium">{errors.address}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Notes</label>
                                        <textarea
                                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-3 text-sm font-medium focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                                            rows="2"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action Bar */}
                        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex items-center justify-end gap-4">
                            <Link
                                href={route('borrowers.index')}
                                className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                Cancel Changes
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] disabled:opacity-70"
                            >
                                {processing ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}