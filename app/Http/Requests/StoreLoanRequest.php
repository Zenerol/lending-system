<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLoanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'borrower_id' => ['required', 'exists:borrowers,id'],
            'principal_amount' => ['required', 'numeric', 'min:1'],
            'interest_rate' => ['required', 'numeric', 'min:0'],
            'loan_term' => ['required', 'integer', 'min:1'],
            'term_type' => ['required', 'in:months,days'],
            'start_date' => ['required', 'date'],
        ];
    }
}