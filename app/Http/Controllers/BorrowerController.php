<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBorrowerRequest;
use App\Models\Borrower;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BorrowerController extends Controller
{
    public function index()
    {
        // Fetch borrowers (latest first)
        $borrowers = Borrower::latest()->get();

        return Inertia::render('Borrowers/Index', [
            'borrowers' => $borrowers
        ]);
    }

    public function create()
    {
        // This tells Laravel to show the React file we just made
        return Inertia::render('Borrowers/Create');
    }

    public function store(StoreBorrowerRequest $request)
    {
        // This saves the data to the database
        Borrower::create($request->validated());

        // This sends you back to the list after saving
        return redirect()->route('borrowers.index');
    }

    // Show the Edit Form
    public function edit(Borrower $borrower)
    {
        return Inertia::render('Borrowers/Edit', [
            'borrower' => $borrower
        ]);
    }

    // Handle the Update Logic
    public function update(Request $request, Borrower $borrower)
    {
        // Simple validation directly here for speed
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'contact_number' => ['required', 'string', 'max:20'],
            'address' => ['required', 'string', 'max:500'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $borrower->update($validated);

        return redirect()->route('borrowers.index');
    }
}