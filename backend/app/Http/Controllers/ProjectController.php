<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();
        
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->orderBy('order_index')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'nullable|string',
            'image' => 'required|image|max:5120',
            'description' => 'nullable|string',
            'type' => 'required|string', // residential, commercial, pmc
            'status' => 'required|string', // ongoing, completed
            'is_featured' => 'boolean',
            'order_index' => 'integer'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $project = Project::create($validated);
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'description' => 'nullable|string',
            'type' => 'required|string',
            'status' => 'required|string',
            'is_featured' => 'boolean',
            'order_index' => 'integer'
        ]);

        if ($request->hasFile('image')) {
            if ($project->image_url) {
                $oldPath = str_replace('/storage/', '', $project->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('projects', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $project->update($validated);
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        if ($project->image_url) {
            $oldPath = str_replace('/storage/', '', $project->image_url);
            Storage::disk('public')->delete($oldPath);
        }
        $project->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
