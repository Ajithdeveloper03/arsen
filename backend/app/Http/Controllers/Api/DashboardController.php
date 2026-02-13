<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Project;
use App\Models\CareerListing;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $recentProjects = Project::orderBy('updated_at', 'desc')->limit(10)->get()->map(function($p) {
            return [
                'id' => 'proj_' . $p->id,
                'type' => 'Project',
                'title' => $p->title,
                'action' => $p->created_at == $p->updated_at ? 'created' : 'updated',
                'description' => "Project '{$p->title}' was " . ($p->created_at == $p->updated_at ? 'added to your portfolio' : 'modified'),
                'time' => $p->updated_at,
                'image_url' => $p->image_url
            ];
        });

        $recentBanners = Banner::orderBy('updated_at', 'desc')->limit(5)->get()->map(function($b) {
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

        $recentJobs = CareerListing::orderBy('updated_at', 'desc')->limit(5)->get()->map(function($j) {
            return [
                'id' => 'job_' . $j->id,
                'type' => 'Career',
                'title' => $j->title,
                'action' => $j->created_at == $j->updated_at ? 'created' : 'updated',
                'description' => "Job listing for '{$j->title}' was " . ($j->created_at == $j->updated_at ? 'posted' : 'updated'),
                'time' => $j->updated_at,
                'image_url' => $j->image_url
            ];
        });

        $activities = $recentProjects->concat($recentBanners)->concat($recentJobs)
            ->sortByDesc('time')
            ->values()
            ->take(10);

        return response()->json([
            'banners_count' => Banner::count(),
            'projects_count' => Project::count(),
            'active_jobs_count' => CareerListing::where('is_active', true)->count(),
            'activities' => $activities
        ]);
    }
}
