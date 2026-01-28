<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Borrower extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'address',
        'contact_number',
        'notes',
        'status', // 'active' or 'fully_paid'
    ];

    // Relationship: A borrower can have many loans
    public function loans()
    {
        return $this->hasMany(Loan::class);
    }
}
