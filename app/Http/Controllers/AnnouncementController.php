<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of announcements.
     */
    public function index()
    {
        $announcements = Announcement::active()
            ->notExpired()
            ->with('user')
            ->orderByRaw("FIELD(priority, 'urgent', 'high', 'medium', 'low')")
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('announcements/index', [
            'announcements' => $announcements
        ]);
    }

    /**
     * Display the specified announcement.
     */
    public function show(Announcement $announcement)
    {
        if (!$announcement->is_active || ($announcement->expires_at && $announcement->expires_at->isPast())) {
            abort(404);
        }

        $announcement->load('user');

        return Inertia::render('announcements/show', [
            'announcement' => $announcement
        ]);
    }
}