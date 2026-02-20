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
            'progress' => 'nullable|integer|min:0|max:100',
            'subtitle' => 'nullable|string',
            'badge' => 'nullable|string',
            'is_featured' => 'boolean',
            'order_index' => 'integer'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image_url'] = Storage::disk('public')->url($path);
        }
        unset($validated['image']);

        $project = Project::create($validated);
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        // Debugging: Log the request
        \Illuminate\Support\Facades\Log::info('Project Update Request', $request->all());

        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'location' => 'nullable|string',
                'image' => 'nullable|image|max:10240', // Increased limit to 10MB
                'description' => 'nullable|string',
                'type' => 'required|string',
                'status' => 'required|string',
                'progress' => 'nullable|integer|min:0|max:100',
                'subtitle' => 'nullable|string',
                'badge' => 'nullable|string',
                'is_featured' => 'boolean',
                'order_index' => 'integer'
            ]);

            if ($request->hasFile('image')) {
                // Delete old image if it exists and is local
                if ($project->image_url && str_contains($project->image_url, '/storage/')) {
                    $oldPath = str_replace(Storage::disk('public')->url(''), '', $project->image_url);
                    $oldPath = ltrim($oldPath, '/');
                    // Fallback cleanup
                    if (str_contains($oldPath, 'storage/')) {
                       $oldPath = str_replace('storage/', '', $oldPath);
                    }
                    Storage::disk('public')->delete($oldPath);
                }

                $path = $request->file('image')->store('projects', 'public');
                $validated['image_url'] = Storage::disk('public')->url($path);
            }
            unset($validated['image']);

            $project->fill($validated);
            $project->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Project updated successfully',
                'data' => $project,
                'received' => $request->except(['image']),
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors(),
                'inputs' => $request->all()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating the project.',
                'error' => $e->getMessage()
            ], 500);
        }
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
