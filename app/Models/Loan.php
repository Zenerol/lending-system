<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'borrower_id',
        'loan_reference_id',
        'principal_amount',
        'interest_rate',
        'loan_term',
        'term_type',
        'interest_type',
        'total_interest',
        'total_payable',
        'start_date',
        'due_date',
        'status', // 'active', 'completed', 'overdue'
    ];

    // Relationship: A loan belongs to one borrower
    public function borrower()
    {
        return $this->belongsTo(Borrower::class);
    }

    // Relationship: A loan has many payments
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}