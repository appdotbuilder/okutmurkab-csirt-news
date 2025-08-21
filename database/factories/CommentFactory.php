<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isGuest = $this->faker->boolean(40); // 40% chance of being a guest comment
        
        return [
            'article_id' => Article::factory(),
            'user_id' => $isGuest ? null : User::factory(),
            'author_name' => $isGuest ? $this->faker->name() : null,
            'author_email' => $isGuest ? $this->faker->safeEmail() : null,
            'content' => $this->faker->paragraph(random_int(2, 4)),
            'is_approved' => $this->faker->boolean(80), // 80% chance of being approved
            'approved_at' => $this->faker->boolean(80) ? $this->faker->dateTimeBetween('-1 month', 'now') : null,
        ];
    }

    /**
     * Indicate that the comment is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_approved' => true,
            'approved_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the comment is from a guest.
     */
    public function guest(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => null,
            'author_name' => $this->faker->name(),
            'author_email' => $this->faker->safeEmail(),
        ]);
    }
}