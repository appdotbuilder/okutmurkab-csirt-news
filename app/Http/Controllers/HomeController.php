<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Announcement;
use App\Models\Category;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with latest articles and announcements.
     */
    public function index()
    {
        $featuredArticles = Article::published()
            ->featured()
            ->with(['category', 'user'])
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        $latestArticles = Article::published()
            ->with(['category', 'user'])
            ->orderBy('published_at', 'desc')
            ->limit(6)
            ->get();

        $urgentAnnouncements = Announcement::active()
            ->notExpired()
            ->where('priority', 'urgent')
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        $categories = Category::active()
            ->withCount(['articles' => function ($query) {
                $query->published();
            }])
            ->orderBy('name')
            ->get();

        return Inertia::render('welcome', [
            'featuredArticles' => $featuredArticles,
            'latestArticles' => $latestArticles,
            'urgentAnnouncements' => $urgentAnnouncements,
            'categories' => $categories,
        ]);
    }
}