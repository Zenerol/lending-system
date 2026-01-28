import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        contact_number: '',
        address: '',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('borrowers.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">New Borrower Profile</h2>}
        >
            <Head title="Add Borrower" />

            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* 1. Header & Back Link */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Add Borrower</h1>
                        <p className="text-sm text-slate-500 mt-1">Create a new profile to start tracking loans.</p>
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
                            
                            {/* Section: Identity */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </span>
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-3 text-sm font-medium focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                                            placeholder="e.g. Juan Dela Cruz"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                        />
                                        {errors.full_name && <p className="text-sm text-red-500 font-medium">{errors.full_name}</p>}
                                    </div>

                                    {/* Contact Number */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Contact Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-3 text-sm font-medium focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                                            placeholder="e.g. 0912 345 6789"
                                            value={data.contact_number}
                                            onChange={(e) => setData('contact_number', e.target.value)}
                                        />
                                        {errors.contact_number && <p className="text-sm text-red-500 font-medium">{errors.contact_number}</p>}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section: Location & Notes */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </span>
                                    Location Details
                                </h3>
                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Complete Address <span className="text-red-500">*</span></label>
                                        <textarea
                                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-3 text-sm font-medium focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                                            rows="3"
                                            placeholder="House No., Street, Barangay, City/Municipality"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                        />
                                        {errors.address && <p className="text-sm text-red-500 font-medium">{errors.address}</p>}
                                    </div>

                                    {/* Notes */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Additional Notes (Optional)</label>
                                        <textarea
                                            className="w-full rounded-xl border-slate-200 bg-slate-50/50 p-3 text-sm font-medium focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                                            rows="2"
                                            placeholder="Landmarks, character reference, or specific instructions..."
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
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Saving...
                                    </>
                                ) : (
                                    'Create Profile'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}