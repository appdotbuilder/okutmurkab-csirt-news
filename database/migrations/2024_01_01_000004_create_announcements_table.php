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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Announcement title');
            $table->text('content')->comment('Announcement content');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium')->comment('Announcement priority level');
            $table->boolean('is_active')->default(true)->comment('Announcement visibility status');
            $table->timestamp('expires_at')->nullable()->comment('Announcement expiration date');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->index('priority');
            $table->index('is_active');
            $table->index('expires_at');
            $table->index(['is_active', 'priority']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};