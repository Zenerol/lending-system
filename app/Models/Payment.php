<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_id',
        'amount',
        'payment_date',
        'method',
        'reference_number',
        'collected_by',
    ];

    // Relationship: A payment belongs to a specific loan
    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }

    // Relationship: A payment was collected by a system User (Admin)
    public function collector()
    {
        return $this->belongsTo(User::class, 'collected_by');
    }
}