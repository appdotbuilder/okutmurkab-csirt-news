<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display the contact form.
     */
    public function index()
    {
        return Inertia::render('contact');
    }

    /**
     * Handle the contact form submission.
     */
    public function store(ContactRequest $request)
    {
        // Here you would typically send an email or store the message
        // For now, we'll just return a success message
        
        return redirect()->back()->with('success', 'Thank you for your message. We will get back to you soon!');
    }
}