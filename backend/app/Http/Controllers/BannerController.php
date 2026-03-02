<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index()
    {
        return response()->json(Banner::orderBy('order_index')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'nullable|string|max:255',
            'subtitle'    => 'nullable|string|max:500',
            'badge'       => 'nullable|string|max:100',
            'image'       => 'required|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
            'link_text'   => 'nullable|string|max:255',
            'link_url'    => 'nullable|string|max:500',
            'order_index' => 'nullable|integer|min:0',
            'is_active'   => 'nullable|boolean',
        ], [
            'image.required' => 'Banner image is required.',
            'image.mimes' => 'Image must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
            'image.max' => 'Image size must not exceed 15MB.',
            'title.max' => 'Title must not exceed 255 characters.',
            'subtitle.max' => 'Subtitle must not exceed 500 characters.',
            'badge.max' => 'Badge must not exceed 100 characters.',
            'link_text.max' => 'Link text must not exceed 255 characters.',
            'link_url.max' => 'Link URL must not exceed 500 characters.',
            'order_index.min' => 'Order index must be at least 0.',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('banners', 'public');
            $validated['image_url'] = Storage::disk('public')->url($path);
        }
        unset($validated['image']);
        $validated['is_active'] = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $banner = Banner::create($validated);
        return response()->json($banner);
    }

    public function show(Banner $banner)
    {
        return response()->json($banner);
    }

    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'title'       => 'nullable|string|max:255',
            'subtitle'    => 'nullable|string|max:500',
            'badge'       => 'nullable|string|max:100',
            'image'       => 'nullable|file|mimes:jpeg,jpg,png,gif,webp,svg,bmp,avif,heic,heif,tiff,ico|max:15360',
            'link_text'   => 'nullable|string|max:255',
            'link_url'    => 'nullable|string|max:500',
            'order_index' => 'nullable|integer|min:0',
            'is_active'   => 'nullable|boolean',
        ], [
            'image.mimes' => 'Image must be a valid format (jpg, png, webp, avif, heic, svg, etc.).',
            'image.max' => 'Image size must not exceed 15MB.',
            'title.max' => 'Title must not exceed 255 characters.',
            'subtitle.max' => 'Subtitle must not exceed 500 characters.',
            'badge.max' => 'Badge must not exceed 100 characters.',
            'link_text.max' => 'Link text must not exceed 255 characters.',
            'link_url.max' => 'Link URL must not exceed 500 characters.',
            'order_index.min' => 'Order index must be at least 0.',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if local
            if ($banner->image_url && str_contains($banner->image_url, '/storage/')) {
                $oldPath = ltrim(str_replace(Storage::disk('public')->url(''), '', $banner->image_url), '/');
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('banners', 'public');
            $validated['image_url'] = Storage::disk('public')->url($path);
        }
        unset($validated['image']);
        $validated['is_active'] = filter_var($request->input('is_active', $banner->is_active), FILTER_VALIDATE_BOOLEAN);

        $banner->update($validated);
        return response()->json(['status' => 'success', 'message' => 'Banner updated.', 'data' => $banner->fresh()]);
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image_url && str_contains($banner->image_url, '/storage/')) {
            $oldPath = ltrim(str_replace(Storage::disk('public')->url(''), '', $banner->image_url), '/');
            Storage::disk('public')->delete($oldPath);
        }
        $banner->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
