<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\FormSubmissionMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PopupController extends Controller
{
   public function send(Request $request)
{
    $validated = $request->validate([
        'name'    => 'required|string|max:100',
        'email'   => 'required|email',
        'phone'   => 'required|string|max:20',
        
        'description' => 'required|string|max:2000',
    ]);

    try {
        $recipients = ['sales@arseninterior.in', 'admin@inymart.in'];
        Mail::to($recipients)
            ->send(new \App\Mail\FormSubmissionMail('Popup Enquiry', $validated));

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully'
        ]);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Popup Enquiry Mail Error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Failed to send message. Please try again later.'
        ], 500);
    }
}

}
