<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Article;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Store a comment for the article.
     */
    public function store(StoreCommentRequest $request, Article $article)
    {
        $comment = new Comment($request->validated());
        $comment->article_id = $article->id;
        
        if (auth()->check()) {
            $comment->user_id = auth()->id();
        }
        
        $comment->save();

        return redirect()->back()->with('success', 'Comment submitted successfully. It will be reviewed before publication.');
    }
}