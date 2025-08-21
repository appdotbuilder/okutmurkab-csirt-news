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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Article title');
            $table->string('slug')->unique()->comment('URL-friendly article identifier');
            $table->text('excerpt')->nullable()->comment('Short article summary');
            $table->longText('content')->comment('Full article content');
            $table->string('featured_image')->nullable()->comment('Article featured image URL');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('is_featured')->default(false)->comment('Featured article flag');
            $table->boolean('is_published')->default(false)->comment('Publication status');
            $table->timestamp('published_at')->nullable()->comment('Publication date');
            $table->integer('views_count')->default(0)->comment('Article view count');
            $table->timestamps();
            
            $table->index('slug');
            $table->index('category_id');
            $table->index('user_id');
            $table->index('is_featured');
            $table->index('is_published');
            $table->index('published_at');
            $table->index(['is_published', 'published_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};