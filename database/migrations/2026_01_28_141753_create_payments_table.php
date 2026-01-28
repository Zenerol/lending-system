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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            // Link to loans table
            $table->foreignId('loan_id')->constrained()->onDelete('cascade');
            
            $table->decimal('amount', 15, 2);
            $table->date('payment_date');
            $table->string('method'); // 'cash', 'gcash', 'bank'
            $table->string('reference_number')->nullable(); // For GCash ref no.
            
            // Track who collected the payment (Admin ID)
            $table->foreignId('collected_by')->constrained('users');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
