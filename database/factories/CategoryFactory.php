<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Keamanan Siber', 'color' => '#DC2626'],
            ['name' => 'Berita Daerah', 'color' => '#2563EB'],
            ['name' => 'Kebijakan IT', 'color' => '#059669'],
            ['name' => 'Edukasi', 'color' => '#7C2D12'],
            ['name' => 'Pengumuman', 'color' => '#7C3AED'],
        ];
        
        $category = $this->faker->randomElement($categories);
        
        return [
            'name' => $category['name'],
            'slug' => Str::slug($category['name']),
            'description' => $this->faker->sentence(10),
            'color' => $category['color'],
            'is_active' => true,
        ];
    }
}