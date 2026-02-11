<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\FormSubmissionMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class UniversalFormController extends Controller
{
    public function submit(Request $request)
    {
        $formType = $request->input('form_type', 'General Submission');
        $data = $request->except(['form_type']);
        $files = $request->allFiles();

        // Basic validation
        $request->validate([
            'email' => 'required|email',
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'nullable|string|max:5000',
            'details' => 'nullable|string|max:5000',
        ]);

        try {
            $mail = new FormSubmissionMail($formType, $data);

            // Attach files if any
            foreach ($files as $key => $file) {
                $mail->attach($file->getRealPath(), [
                    'as' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                ]);
            }

            Mail::to('sales@arseninterior.in')
                ->send($mail);

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Universal Form Mail Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to send message: ' . $e->getMessage()
            ], 500);
        }
    }
}
