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

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function store(Request $request)
    {
        // Enhanced validation with better error messages
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'location'    => 'nullable|string|max:500',
            'image'       => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
            'image2'      => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
            'image3'      => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
            'image4'      => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
            'description' => 'nullable|string|max:2000',
            'type'        => 'required|string|in:Residential,Commercial,Hospitality,Industrial,Luxe Detail',
            'status'      => 'required|string|in:ongoing,completed',
            'progress'    => 'nullable|integer|min:0|max:100',
            'subtitle'    => 'nullable|string|max:500',
            'badge'       => 'nullable|string|max:100',
            'is_featured' => 'nullable|boolean',
            'order_index' => 'nullable|integer|min:0',
        ], [
            'title.required' => 'Project title is required.',
            'title.max' => 'Project title must not exceed 255 characters.',
            'type.required' => 'Project type is required.',
            'type.in' => 'Invalid project type selected.',
            'status.required' => 'Project status is required.',
            'status.in' => 'Invalid project status selected.',
            'image.mimes' => 'Image must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
            'image.max' => 'Image size must not exceed 15MB.',
            'image2.mimes' => 'Image 2 must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
            'image2.max' => 'Image 2 size must not exceed 15MB.',
            'image3.mimes' => 'Image 3 must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
            'image3.max' => 'Image 3 size must not exceed 15MB.',
            'image4.mimes' => 'Image 4 must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
            'image4.max' => 'Image 4 size must not exceed 15MB.',
            'progress.min' => 'Progress must be at least 0%.',
            'progress.max' => 'Progress must not exceed 100%.',
        ]);

        foreach (['image' => 'image_url', 'image2' => 'image_url_2', 'image3' => 'image_url_3', 'image4' => 'image_url_4'] as $field => $column) {
            if ($request->hasFile($field)) {
                $path = $request->file($field)->store('projects', 'public');
                $validated[$column] = Storage::disk('public')->url($path);
            }
            unset($validated[$field]);
        }

        $validated['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);
        $validated['progress'] = $validated['progress'] ?? 0;

        $project = Project::create($validated);
        return response()->json(['status' => 'success', 'data' => $project]);
    }

    public function update(Request $request, Project $project)
    {
        \Illuminate\Support\Facades\Log::info('Project Update Request fields:', $request->except(['image','image2','image3','image4']));

        try {
            $validated = $request->validate([
                'title'       => 'required|string|max:255',
                'location'    => 'nullable|string|max:500',
                'image'       => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
                'image2'      => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
                'image3'      => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
                'image4'      => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
                'description' => 'nullable|string|max:2000',
                'type'        => 'required|string|in:Residential,Commercial,Hospitality,Industrial,Luxe Detail',
                'status'      => 'required|string|in:ongoing,completed',
                'progress'    => 'nullable|integer|min:0|max:100',
                'subtitle'    => 'nullable|string|max:500',
                'badge'       => 'nullable|string|max:100',
                'is_featured' => 'nullable|boolean',
                'order_index' => 'nullable|integer|min:0',
            ], [
                'title.required' => 'Project title is required.',
                'title.max' => 'Project title must not exceed 255 characters.',
                'type.required' => 'Project type is required.',
                'type.in' => 'Invalid project type selected.',
                'status.required' => 'Project status is required.',
                'status.in' => 'Invalid project status selected.',
                'image.mimes' => 'Image must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
                'image.max' => 'Image size must not exceed 15MB.',
                'image2.mimes' => 'Image 2 must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
                'image2.max' => 'Image 2 size must not exceed 15MB.',
                'image3.mimes' => 'Image 3 must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
                'image3.max' => 'Image 3 size must not exceed 15MB.',
                'image4.mimes' => 'Image 4 must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
                'image4.max' => 'Image 4 size must not exceed 15MB.',
                'progress.min' => 'Progress must be at least 0%.',
                'progress.max' => 'Progress must not exceed 100%.',
            ]);

            // Handle up to 4 project images
            foreach (['image' => 'image_url', 'image2' => 'image_url_2', 'image3' => 'image_url_3', 'image4' => 'image_url_4'] as $field => $column) {
                if ($request->hasFile($field)) {
                    // Delete old image if local
                    if ($project->$column && str_contains($project->$column, '/storage/')) {
                        $oldPath = ltrim(str_replace(Storage::disk('public')->url(''), '', $project->$column), '/');
                        Storage::disk('public')->delete($oldPath);
                    }
                    $path = $request->file($field)->store('projects', 'public');
                    $validated[$column] = Storage::disk('public')->url($path);
                }
                unset($validated[$field]);
            }

            // Handle explicit image removal requests
            foreach (['remove_image2', 'remove_image3', 'remove_image4'] as $removeField) {
                if ($request->input($removeField) === '1') {
                    $col = str_replace('remove_', '', $removeField) . '_url';
                    // Map remove_image2 → image_url_2
                    $colMap = ['remove_image2' => 'image_url_2', 'remove_image3' => 'image_url_3', 'remove_image4' => 'image_url_4'];
                    $col = $colMap[$removeField];
                    if ($project->$col && str_contains($project->$col, '/storage/')) {
                        $oldPath = ltrim(str_replace(Storage::disk('public')->url(''), '', $project->$col), '/');
                        Storage::disk('public')->delete($oldPath);
                    }
                    $validated[$col] = null;
                }
            }

            $validated['is_featured'] = filter_var($request->input('is_featured', $project->is_featured), FILTER_VALIDATE_BOOLEAN);

            $project->fill($validated);
            $project->save();

            return response()->json([
                'status'  => 'success',
                'message' => 'Project updated successfully',
                'data'    => $project->fresh(),
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'An error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Project $project)
    {
        foreach (['image_url', 'image_url_2', 'image_url_3', 'image_url_4'] as $col) {
            if ($project->$col && str_contains($project->$col, '/storage/')) {
                $oldPath = ltrim(str_replace(Storage::disk('public')->url(''), '', $project->$col), '/');
                Storage::disk('public')->delete($oldPath);
            }
        }
        $project->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
