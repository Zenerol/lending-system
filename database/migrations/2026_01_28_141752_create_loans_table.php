<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            // Link to borrowers table
            $table->foreignId('borrower_id')->constrained()->onDelete('cascade');
            
            // Loan Details
            $table->string('loan_reference_id')->unique(); // e.g., LN-2024-001
            $table->decimal('principal_amount', 15, 2);
            $table->decimal('interest_rate', 5, 2); // Stored as percentage (e.g., 5.00)
            $table->integer('loan_term'); // e.g., 30
            $table->string('term_type'); // 'months', 'days'
            $table->string('interest_type')->default('flat');
            
            // Calculated Amounts
            $table->decimal('total_interest', 15, 2);
            $table->decimal('total_payable', 15, 2);
            
            // Dates & Status
            $table->date('start_date');
            $table->date('due_date');
            // 'active', 'completed', 'overdue'
            $table->string('status')->default('active'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
