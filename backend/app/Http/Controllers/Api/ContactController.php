<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\FormSubmissionMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
   public function send(Request $request)
{
    $validated = $request->validate([
        'name'    => 'required|string|max:100',
        'email'   => 'required|email',
        'phone'   => 'nullable|string|max:20',
        'subject' => 'required|string|max:150',
        'message' => 'required|string|max:2000',
    ]);

    try {
        $recipients = ['sales@arseninterior.in', 'admin@inymart.in'];
        Mail::to($recipients)
            ->send(new \App\Mail\FormSubmissionMail('Contact Form Submission', $validated));

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully'
        ]);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Contact Form Mail Error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Failed to send message. Please try again later.'
        ], 500);
    }
}

}
