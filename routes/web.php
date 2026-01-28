<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BorrowerController;
use App\Http\Controllers\LoanController; // <--- IMPORTANT: Import this
use App\Http\Controllers\PaymentController; // <--- IMPORTANT: Import this
use App\Http\Controllers\ReportController;
use App\Models\Borrower; // <--- Import these at the top if missing
use App\Models\Loan;     // <--- Import these at the top if missing
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirect Homepage to Login
Route::get('/', function () {
    return redirect()->route('login');
});

// Dashboard
Route::get('/dashboard', function () {
    // Get dates for the current month
    $startOfMonth = Carbon::now()->startOfMonth();
    $endOfMonth = Carbon::now()->endOfMonth();

    return Inertia::render('Dashboard', [
        'stats' => [
            // Existing Counts
            'borrowers' => Borrower::count(),
            'active_loans' => Loan::where('status', 'active')->count(),
            'overdue' => Loan::where('status', 'active')
                             ->where('due_date', '<', Carbon::now())
                             ->count(),

            // NEW: Financials (Money Logic)
            'released_month' => Loan::whereBetween('start_date', [$startOfMonth, $endOfMonth])
                                    ->sum('principal_amount'),
            
            'collected_month' => Payment::whereBetween('payment_date', [$startOfMonth, $endOfMonth])
                                        ->sum('amount'),
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Auth Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- BORROWER ROUTES ---
    Route::resource('borrowers', BorrowerController::class);

    // --- LOAN ROUTES (This is what was missing!) ---
    Route::get('/borrowers/{borrower}/loans/create', [LoanController::class, 'create'])->name('loans.create');
    Route::post('/loans', [LoanController::class, 'store'])->name('loans.store');

    // Page to list ALL loans
    Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');

    // Show Loan Details
    Route::get('/loans/{loan}', [LoanController::class, 'show'])->name('loans.show');
    
    // Store Payment
    Route::post('/loans/{loan}/payments', [PaymentController::class, 'store'])->name('payments.store');

    // Reports Page
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
});

require __DIR__.'/auth.php';