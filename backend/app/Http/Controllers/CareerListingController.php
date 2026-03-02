<?php

namespace App\Http\Controllers;

use App\Models\CareerListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CareerListingController extends Controller
{
    public function index()
    {
        return response()->json(CareerListing::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'salary' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:5000',
            'image' => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
            'specifications' => 'nullable|array',
            'skills' => 'nullable|array',
            'responsibilities' => 'nullable|array',
            'is_active' => 'boolean'
        ], [
            'title.required' => 'Job title is required.',
            'title.max' => 'Job title must not exceed 255 characters.',
            'department.required' => 'Department is required.',
            'department.max' => 'Department must not exceed 100 characters.',
            'location.required' => 'Location is required.',
            'location.max' => 'Location must not exceed 255 characters.',
            'salary.max' => 'Salary must not exceed 255 characters.',
            'description.max' => 'Description must not exceed 5000 characters.',
            'image.mimes' => 'Image must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
            'image.max' => 'Image size must not exceed 15MB.',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('careers', 'public');
            $validated['image_url'] = Storage::disk('public')->url($path);
        }
        unset($validated['image']);
        $validated['is_active'] = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $job = CareerListing::create($validated);
        return response()->json($job);
    }

    public function update(Request $request, CareerListing $career)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'salary' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:5000',
            'image' => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
            'specifications' => 'nullable|array',
            'skills' => 'nullable|array',
            'responsibilities' => 'nullable|array',
            'is_active' => 'boolean'
        ], [
            'title.required' => 'Job title is required.',
            'title.max' => 'Job title must not exceed 255 characters.',
            'department.required' => 'Department is required.',
            'department.max' => 'Department must not exceed 100 characters.',
            'location.required' => 'Location is required.',
            'location.max' => 'Location must not exceed 255 characters.',
            'salary.max' => 'Salary must not exceed 255 characters.',
            'description.max' => 'Description must not exceed 5000 characters.',
            'image.mimes' => 'Image must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
            'image.max' => 'Image size must not exceed 15MB.',
        ]);

        if ($request->hasFile('image')) {
            if ($career->image_url && str_contains($career->image_url, '/storage/')) {
                $oldPath = ltrim(str_replace(Storage::disk('public')->url(''), '', $career->image_url), '/');
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('careers', 'public');
            $validated['image_url'] = Storage::disk('public')->url($path);
        }
        unset($validated['image']);
        $validated['is_active'] = filter_var($request->input('is_active', $career->is_active), FILTER_VALIDATE_BOOLEAN);

        $career->update($validated);
        return response()->json(['status' => 'success', 'message' => 'Career updated.', 'data' => $career->fresh()]);
    }

    public function destroy(CareerListing $career)
    {
        if ($career->image_url) {
            $oldPath = str_replace('/storage/', '', $career->image_url);
            Storage::disk('public')->delete($oldPath);
        }
        $career->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
