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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('author_name')->nullable()->comment('Guest author name');
            $table->string('author_email')->nullable()->comment('Guest author email');
            $table->text('content')->comment('Comment content');
            $table->boolean('is_approved')->default(false)->comment('Comment approval status');
            $table->timestamp('approved_at')->nullable()->comment('Comment approval date');
            $table->timestamps();
            
            $table->index('article_id');
            $table->index('user_id');
            $table->index('is_approved');
            $table->index(['article_id', 'is_approved']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};