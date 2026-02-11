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
        return response()->json([
            'banners_count' => Banner::count(),
            'projects_count' => Project::count(),
            'active_jobs_count' => CareerListing::where('is_active', true)->count(),
            'recent_projects' => Project::orderBy('created_at', 'desc')->limit(5)->get()
        ]);
    }
}
