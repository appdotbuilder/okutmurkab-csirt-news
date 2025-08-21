<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(random_int(4, 8));
        $publishedAt = $this->faker->dateTimeBetween('-3 months', 'now');
        
        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'excerpt' => $this->faker->text(200),
            'content' => $this->generateContent(),
            'category_id' => Category::factory(),
            'user_id' => User::factory(),
            'is_featured' => $this->faker->boolean(20), // 20% chance of being featured
            'is_published' => true,
            'published_at' => $publishedAt,
            'views_count' => random_int(10, 1000),
        ];
    }

    /**
     * Generate realistic article content.
     */
    public function generateContent(): string
    {
        $paragraphs = [];
        
        // Introduction paragraph
        $paragraphs[] = '<p>' . $this->faker->paragraph(4) . '</p>';
        
        // Add 3-5 more paragraphs
        for ($i = 0; $i < random_int(3, 5); $i++) {
            $paragraphs[] = '<p>' . $this->faker->paragraph(random_int(3, 6)) . '</p>';
        }
        
        // Add a list occasionally
        if ($this->faker->boolean(30)) {
            $listItems = [];
            for ($j = 0; $j < random_int(3, 5); $j++) {
                $listItems[] = '<li>' . $this->faker->sentence() . '</li>';
            }
            $paragraphs[] = '<ul>' . implode('', $listItems) . '</ul>';
        }
        
        // Conclusion paragraph
        $paragraphs[] = '<p>' . $this->faker->paragraph(3) . '</p>';
        
        return implode('', $paragraphs);
    }

    /**
     * Indicate that the article is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the article is unpublished.
     */
    public function unpublished(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => false,
            'published_at' => null,
        ]);
    }
}