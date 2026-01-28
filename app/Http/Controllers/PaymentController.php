<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function store(Request $request, Loan $loan)
    {
        // 1. Validate
        $data = $request->validate([
            'amount' => ['required', 'numeric', 'min:1'],
            'payment_date' => ['required', 'date'],
            'method' => ['required', 'string'], // cash, gcash, etc.
            'reference_number' => ['nullable', 'string'],
        ]);

        DB::transaction(function () use ($data, $loan) {
            // 2. Create Payment
            $loan->payments()->create([
                'amount' => $data['amount'],
                'payment_date' => $data['payment_date'],
                'method' => $data['method'],
                'reference_number' => $data['reference_number'],
                'collected_by' => auth()->id(),
            ]);

            // 3. Check if Fully Paid
            // We refresh the loan to get the latest payments including the one just created
            $totalPaid = $loan->payments()->sum('amount');
            
            // If they have paid enough (allow for tiny decimal differences)
            if ($totalPaid >= ($loan->total_payable - 1)) { 
                $loan->update(['status' => 'completed']);
            }
        });

        return redirect()->back()->with('success', 'Payment recorded!');
    }
}