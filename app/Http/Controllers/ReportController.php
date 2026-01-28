<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // 1. Get current month dates
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // 2. Calculate Monthly Stats
        $monthlyReleases = Loan::whereBetween('start_date', [$startOfMonth, $endOfMonth])
            ->sum('principal_amount');

        $monthlyCollections = Payment::whereBetween('payment_date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        // 3. Get Overdue Loans (Active loans past due date)
        $overdueLoans = Loan::with('borrower')
            ->where('status', 'active')
            ->where('due_date', '<', Carbon::now())
            ->get();

        return Inertia::render('Reports/Index', [
            'month' => Carbon::now()->format('F Y'),
            'stats' => [
                'released' => $monthlyReleases,
                'collected' => $monthlyCollections,
                'overdue_count' => $overdueLoans->count(),
            ],
            'overdue_loans' => $overdueLoans
        ]);
    }
}