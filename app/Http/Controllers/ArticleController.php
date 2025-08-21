<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Article;
use App\Models\Category;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index(Request $request)
    {
        $query = Article::published()->with(['category', 'user']);

        if ($request->has('category') && $request->category) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        $articles = $query->orderBy('published_at', 'desc')->paginate(12);
        $categories = Category::active()->get();

        return Inertia::render('articles/index', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search'])
        ]);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        if (!$article->is_published) {
            abort(404);
        }

        // Increment views count
        $article->increment('views_count');

        $article->load(['category', 'user', 'approvedComments.user']);

        $relatedArticles = Article::published()
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->with(['category', 'user'])
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('articles/show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }


}