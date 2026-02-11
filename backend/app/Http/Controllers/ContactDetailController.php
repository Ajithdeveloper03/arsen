<?php

namespace App\Http\Controllers;

use App\Models\ContactDetail;
use Illuminate\Http\Request;

class ContactDetailController extends Controller
{
    public function index()
    {
        return response()->json(ContactDetail::orderBy('order_index')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'label' => 'required|string',
            'value' => 'required|string',
            'order_index' => 'integer'
        ]);

        $detail = ContactDetail::create($validated);
        return response()->json($detail);
    }

    public function update(Request $request, ContactDetail $contactDetail)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'label' => 'required|string',
            'value' => 'required|string',
            'order_index' => 'integer'
        ]);

        $contactDetail->update($validated);
        return response()->json($contactDetail);
    }

    public function destroy(ContactDetail $contactDetail)
    {
        $contactDetail->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
