<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Project;
use App\Models\CareerListing;
use App\Models\ContactDetail;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        try {
            $recentProjects = Project::select('id', 'title', 'created_at', 'updated_at', 'image_url')
                ->orderBy('updated_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function($p) {
                    return [
                        'id' => 'proj_' . $p->id,
                        'type' => 'Project',
                        'title' => $p->title,
                        'action' => $p->created_at == $p->updated_at ? 'created' : 'updated',
                        'description' => "Project '{$p->title}' was " . ($p->created_at == $p->updated_at ? 'added' : 'updated'),
                        'time' => $p->updated_at,
                        'image_url' => $p->image_url
                    ];
                });

            $recentBanners = Banner::select('id', 'title', 'created_at', 'updated_at', 'image_url')
                ->orderBy('updated_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function($b) {
                    return [
                        'id' => 'ban_' . $b->id,
                        'type' => 'Banner',
                        'title' => $b->title,
                        'action' => $b->created_at == $b->updated_at ? 'created' : 'updated',
                        'description' => "Banner '{$b->title}' was " . ($b->created_at == $b->updated_at ? 'set live' : 'updated'),
                        'time' => $b->updated_at,
                        'image_url' => $b->image_url
                    ];
                });

            $recentJobs = CareerListing::select('id', 'title', 'created_at', 'updated_at', 'location')
                ->orderBy('updated_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function($j) {
                    return [
                        'id' => 'job_' . $j->id,
                        'type' => 'Career',
                        'title' => $j->title,
                        'action' => $j->created_at == $j->updated_at ? 'created' : 'updated',
                        'description' => "Job '{$j->title}' was " . ($j->created_at == $j->updated_at ? 'posted' : 'updated'),
                        'time' => $j->updated_at,
                        'image_url' => null
                    ];
                });

            $recentContacts = ContactDetail::select('id', 'label', 'type', 'created_at', 'updated_at')
                ->orderBy('updated_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function($c) {
                    return [
                        'id' => 'cont_' . $c->id,
                        'type' => 'Contact',
                        'title' => $c->label,
                        'action' => 'updated',
                        'description' => "Contact info '{$c->label}' was updated",
                        'time' => $c->updated_at,
                        'image_url' => null
                    ];
                });

            $activities = $recentProjects->concat($recentBanners)->concat($recentJobs)->concat($recentContacts)
                ->sortByDesc('time')
                ->values()
                ->take(10);

            return response()->json([
                'banners_count' => Banner::count(),
                'projects_count' => Project::count(),
                'contacts_count' => ContactDetail::count(),
                'active_jobs_count' => CareerListing::where('is_active', true)->count(),
                'activities' => $activities
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Dashboard Stats Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to retrieve dashboard statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
