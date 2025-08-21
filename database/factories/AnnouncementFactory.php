<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $priorities = ['low', 'medium', 'high', 'urgent'];
        $expiresAt = $this->faker->boolean(60) ? $this->faker->dateTimeBetween('now', '+3 months') : null;
        
        return [
            'title' => $this->faker->sentence(random_int(4, 8)),
            'content' => $this->generateAnnouncementContent(),
            'priority' => $this->faker->randomElement($priorities),
            'is_active' => true,
            'expires_at' => $expiresAt,
            'user_id' => User::factory(),
        ];
    }

    /**
     * Generate realistic announcement content.
     */
    public function generateAnnouncementContent(): string
    {
        $templates = [
            "Kepada seluruh stakeholder dan masyarakat, kami informasikan bahwa:\n\n" . 
            $this->faker->paragraph(3) . "\n\n" .
            "Langkah-langkah yang perlu dilakukan:\n" .
            "1. " . $this->faker->sentence() . "\n" .
            "2. " . $this->faker->sentence() . "\n" .
            "3. " . $this->faker->sentence() . "\n\n" .
            "Untuk informasi lebih lanjut, silakan hubungi tim OKUTIMURKAB-CSIRT.\n\n" .
            "Terima kasih atas perhatian dan kerjasamanya.",
            
            "PENGUMUMAN PENTING\n\n" .
            $this->faker->paragraph(4) . "\n\n" .
            "Hal ini bertujuan untuk:\n" .
            "• " . $this->faker->sentence() . "\n" .
            "• " . $this->faker->sentence() . "\n" .
            "• " . $this->faker->sentence() . "\n\n" .
            "Kami harap semua pihak dapat mengikuti arahan ini dengan baik.",
            
            $this->faker->paragraph(2) . "\n\n" .
            $this->faker->paragraph(3) . "\n\n" .
            "Jika ada pertanyaan atau memerlukan bantuan, jangan ragu untuk menghubungi kami melalui kanal komunikasi resmi.\n\n" .
            "Salam keamanan siber!"
        ];
        
        return $this->faker->randomElement($templates);
    }

    /**
     * Indicate that the announcement is urgent.
     */
    public function urgent(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'urgent',
        ]);
    }

    /**
     * Indicate that the announcement is expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'expires_at' => $this->faker->dateTimeBetween('-2 months', '-1 day'),
        ]);
    }
}