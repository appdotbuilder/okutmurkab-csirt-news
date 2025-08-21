<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display the about page.
     */
    public function index()
    {
        return Inertia::render('about');
    }
}