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
            'department' => 'required|string',
            'location' => 'required|string',
            'salary' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'specifications' => 'nullable|array',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('careers', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $job = CareerListing::create($validated);
        return response()->json($job);
    }

    public function update(Request $request, CareerListing $careerListing)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string',
            'location' => 'required|string',
            'salary' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'specifications' => 'nullable|array',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            if ($careerListing->image_url) {
                $oldPath = str_replace('/storage/', '', $careerListing->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('careers', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $careerListing->update($validated);
        return response()->json($careerListing);
    }

    public function destroy(CareerListing $careerListing)
    {
        if ($careerListing->image_url) {
            $oldPath = str_replace('/storage/', '', $careerListing->image_url);
            Storage::disk('public')->delete($oldPath);
        }
        $careerListing->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
