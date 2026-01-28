<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLoanRequest;
use App\Models\Borrower;
use App\Models\Loan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LoanController extends Controller
{
    public function create(Borrower $borrower)
    {
        // We pass the borrower data so we know who the loan is for
        return Inertia::render('Loans/Create', [
            'borrower' => $borrower
        ]);
    }

public function store(StoreLoanRequest $request)
    {
        $data = $request->validated();

        // FIX: Force numbers to be actual numbers (integers/floats)
        $principal = (float) $data['principal_amount'];
        $rate      = (float) $data['interest_rate'];
        $term      = (int) $data['loan_term']; // <--- This (int) fixes the error

        // 1. Calculate Interest
        // Formula: Principal * (Rate / 100) * Term
        $totalInterest = $principal * ($rate / 100) * $term;
        $totalPayable = $principal + $totalInterest;

        // 2. Calculate Due Date
        $startDate = Carbon::parse($data['start_date']);
        
        $dueDate = $data['term_type'] === 'months' 
            ? $startDate->copy()->addMonths($term) 
            : $startDate->copy()->addDays($term);

        // 3. Generate Reference ID
        $referenceId = 'LN-' . now()->format('Ymd') . '-' . strtoupper(Str::random(3));

        // 4. Create the Loan
        Loan::create([
            'borrower_id'       => $data['borrower_id'],
            'loan_reference_id' => $referenceId,
            'principal_amount'  => $principal,
            'interest_rate'     => $rate,
            'loan_term'         => $term,
            'term_type'         => $data['term_type'],
            'interest_type'     => 'flat',
            'total_interest'    => $totalInterest,
            'total_payable'     => $totalPayable,
            'start_date'        => $startDate,
            'due_date'          => $dueDate,
            'status'            => 'active'
        ]);

        return redirect()->route('loans.index')->with('success', 'Loan created successfully!');
    }

    public function index()
    {
        // Fetch loans with their associated borrower
        $loans = Loan::with('borrower')
            ->latest()
            ->get();

        return Inertia::render('Loans/Index', [
            'loans' => $loans
        ]);
    }

    public function show(Loan $loan)
    {
        // Load the borrower and payments (latest payments first)
        $loan->load(['borrower', 'payments' => function($query) {
            $query->latest('payment_date');
        }]);

        // Calculate stats on the fly
        $totalPaid = $loan->payments->sum('amount');
        $remainingBalance = $loan->total_payable - $totalPaid;
        $progress = ($totalPaid / $loan->total_payable) * 100;

        return Inertia::render('Loans/Show', [
            'loan' => $loan,
            'stats' => [
                'total_paid' => $totalPaid,
                'remaining_balance' => max(0, $remainingBalance), // Prevent negative display
                'progress' => round($progress, 2)
            ]
        ]);
    }
}