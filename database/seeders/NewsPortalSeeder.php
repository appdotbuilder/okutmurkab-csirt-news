<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsPortalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin CSIRT',
            'email' => 'admin@okutimurkab-csirt.go.id',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);

        // Create additional users
        $users = User::factory(8)->create();
        $allUsers = collect([$admin])->merge($users);

        // Create categories
        $categories = [
            [
                'name' => 'Keamanan Siber',
                'slug' => 'keamanan-siber',
                'description' => 'Berita dan informasi terkait keamanan siber dan ancaman digital',
                'color' => '#DC2626'
            ],
            [
                'name' => 'Berita Daerah',
                'slug' => 'berita-daerah',
                'description' => 'Berita terkini seputar pemerintahan daerah OKU Timur',
                'color' => '#2563EB'
            ],
            [
                'name' => 'Kebijakan IT',
                'slug' => 'kebijakan-it',
                'description' => 'Kebijakan dan regulasi teknologi informasi',
                'color' => '#059669'
            ],
            [
                'name' => 'Edukasi Digital',
                'slug' => 'edukasi-digital',
                'description' => 'Tips, panduan, dan edukasi literasi digital',
                'color' => '#7C2D12'
            ],
            [
                'name' => 'Pengumuman Resmi',
                'slug' => 'pengumuman-resmi',
                'description' => 'Pengumuman resmi dari OKUTIMURKAB-CSIRT',
                'color' => '#7C3AED'
            ]
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        $createdCategories = Category::all();

        // Create sample articles with realistic cybersecurity content
        $sampleArticles = [
            [
                'title' => 'Peningkatan Serangan Ransomware di Indonesia: Langkah Preventif untuk Pemerintah Daerah',
                'content' => '<p>Dalam beberapa bulan terakhir, Indonesia mengalami peningkatan signifikan dalam serangan ransomware yang menargetkan institusi pemerintahan dan swasta. Tim OKUTIMURKAB-CSIRT mengimbau seluruh instansi pemerintah daerah untuk meningkatkan kewaspadaan dan menerapkan langkah-langkah preventif.</p>

<p>Ransomware adalah jenis malware yang mengenkripsi file-file penting pada sistem komputer dan meminta tebusan untuk mendapatkan kunci dekripsi. Serangan ini dapat melumpuhkan operasional instansi dan menyebabkan kerugian finansial yang besar.</p>

<h3>Langkah Preventif yang Direkomendasikan:</h3>
<ul>
<li>Melakukan backup data secara rutin dan menyimpannya di lokasi terpisah</li>
<li>Memperbarui sistem operasi dan software secara berkala</li>
<li>Menggunakan antivirus dan firewall yang terpercaya</li>
<li>Memberikan training awareness keamanan siber kepada pegawai</li>
<li>Menerapkan segmentasi jaringan untuk membatasi penyebaran malware</li>
</ul>

<p>OKUTIMURKAB-CSIRT siap memberikan dukungan teknis dan konsultasi kepada instansi yang memerlukan bantuan dalam meningkatkan postur keamanan siber. Untuk informasi lebih lanjut, silakan menghubungi hotline darurat kami.</p>',
                'category' => 'Keamanan Siber',
                'is_featured' => true
            ],
            [
                'title' => 'Implementasi Sistem Informasi Terintegrasi Pemerintah Daerah OKU Timur',
                'content' => '<p>Pemerintah Kabupaten Ogan Komering Ulu Timur meluncurkan sistem informasi terintegrasi yang bertujuan meningkatkan efisiensi pelayanan publik dan tata kelola pemerintahan. Sistem ini dikembangkan dengan standar keamanan tinggi dan dukungan penuh dari Tim OKUTIMURKAB-CSIRT.</p>

<p>Sistem informasi terintegrasi ini mencakup berbagai layanan seperti administrasi kependudukan, perizinan, keuangan daerah, dan layanan publik lainnya. Seluruh data akan tersentralisasi dengan tetap memperhatikan aspek keamanan dan privasi.</p>

<p>Fitur-fitur utama sistem meliputi:</p>
<ul>
<li>Dashboard analitik untuk monitoring kinerja instansi</li>
<li>Sistem workflow otomatis untuk proses persetujuan</li>
<li>Integrasi dengan sistem pembayaran digital</li>
<li>Keamanan berlapis dengan enkripsi end-to-end</li>
<li>Audit trail untuk pelacakan aktivitas pengguna</li>
</ul>

<p>Implementasi sistem ini diharapkan dapat meningkatkan transparansi, akuntabilitas, dan kualitas layanan publik di Kabupaten OKU Timur.</p>',
                'category' => 'Berita Daerah',
                'is_featured' => true
            ],
            [
                'title' => 'Panduan Keamanan Work From Home untuk Pegawai Pemerintah',
                'content' => '<p>Dengan semakin banyaknya aktivitas kerja yang dilakukan dari rumah, penting bagi pegawai pemerintah untuk memahami praktik keamanan siber yang tepat. Tim OKUTIMURKAB-CSIRT menyusun panduan komprehensif untuk memastikan data dan informasi pemerintah tetap aman.</p>

<p>Work From Home (WFH) memiliki risiko keamanan yang berbeda dibandingkan bekerja di kantor. Jaringan rumah umumnya tidak memiliki perlindungan sekuat jaringan kantor, sehingga diperlukan langkah-langkah tambahan.</p>

<h3>Checklist Keamanan WFH:</h3>
<ul>
<li>Gunakan VPN resmi instansi untuk mengakses sistem internal</li>
<li>Pastikan WiFi rumah menggunakan enkripsi WPA3</li>
<li>Jangan menggunakan komputer pribadi untuk data rahasia</li>
<li>Aktifkan automatic lock screen dan two-factor authentication</li>
<li>Hindari meeting video di tempat yang dapat terlihat orang lain</li>
<li>Laporkan segera jika terjadi insiden keamanan</li>
</ul>

<p>Selalu ingat bahwa keamanan informasi adalah tanggung jawab bersama. Setiap pegawai memiliki peran penting dalam menjaga kerahasiaan dan integritas data pemerintah.</p>',
                'category' => 'Edukasi Digital',
                'is_featured' => true
            ]
        ];

        foreach ($sampleArticles as $articleData) {
            $category = $createdCategories->where('name', $articleData['category'])->first();
            
            Article::create([
                'title' => $articleData['title'],
                'slug' => Str::slug($articleData['title']) . '-' . Str::random(5),
                'excerpt' => Str::limit(strip_tags($articleData['content']), 200),
                'content' => $articleData['content'],
                'category_id' => $category->id,
                'user_id' => $allUsers->random()->id,
                'is_featured' => $articleData['is_featured'],
                'is_published' => true,
                'published_at' => now()->subDays(random_int(1, 30)),
                'views_count' => random_int(50, 500),
            ]);
        }

        // Create additional random articles
        Article::factory(15)->create([
            'category_id' => fn() => $createdCategories->random()->id,
            'user_id' => fn() => $allUsers->random()->id,
        ]);

        // Create sample announcements
        $sampleAnnouncements = [
            [
                'title' => 'Peringatan Keamanan: Aktivitas Phishing Meningkat',
                'content' => 'Kami mendeteksi peningkatan aktivitas phishing yang menargetkan email pegawai pemerintah daerah. Harap berhati-hati dengan email yang meminta informasi login atau data pribadi. Jangan klik link mencurigakan dan laporkan email phishing ke tim IT.',
                'priority' => 'urgent'
            ],
            [
                'title' => 'Pemeliharaan Sistem Terjadwal',
                'content' => 'Sistem informasi akan menjalani pemeliharaan rutin pada hari Minggu, 15 Oktober 2023, pukul 02:00 - 06:00 WIB. Selama periode ini, akses ke beberapa layanan mungkin terbatas. Mohon maaf atas ketidaknyamanan ini.',
                'priority' => 'medium'
            ],
            [
                'title' => 'Workshop Keamanan Siber untuk Pegawai',
                'content' => 'Tim OKUTIMURKAB-CSIRT akan mengadakan workshop keamanan siber pada tanggal 20-22 Oktober 2023. Workshop ini wajib diikuti oleh seluruh pegawai yang menangani sistem informasi. Pendaftaran dibuka hingga 18 Oktober 2023.',
                'priority' => 'high'
            ]
        ];

        foreach ($sampleAnnouncements as $announcementData) {
            Announcement::create([
                'title' => $announcementData['title'],
                'content' => $announcementData['content'],
                'priority' => $announcementData['priority'],
                'is_active' => true,
                'expires_at' => now()->addMonths(1),
                'user_id' => $admin->id,
            ]);
        }

        // Create additional random announcements
        Announcement::factory(5)->create([
            'user_id' => fn() => $allUsers->random()->id,
        ]);

        // Create comments for articles
        $articles = Article::published()->get();
        foreach ($articles as $article) {
            // Create 0-8 comments per article
            Comment::factory(random_int(0, 8))->create([
                'article_id' => $article->id,
                'user_id' => fn() => random_int(0, 1) ? $allUsers->random()->id : null,
                'is_approved' => true,
                'approved_at' => now(),
            ]);
        }
    }
}