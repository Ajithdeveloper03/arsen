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
        
        // Filter out files from data array to avoid issues in the email view
        $data = array_filter($data, function($value) {
            return !($value instanceof \Illuminate\Http\UploadedFile);
        });

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
            $recipients = ['sales@arseninterior.in', 'admin@inymart.in'];
            $mail = new FormSubmissionMail($formType, $data);

            // Attach files if any
            $allFiles = \Illuminate\Support\Arr::flatten($request->allFiles());
            
            foreach ($allFiles as $file) {
                if (!$file instanceof \Illuminate\Http\UploadedFile) {
                    continue;
                }

                // Validate file type and size (max 5MB)
                if (!$file->isValid() || 
                    !in_array($file->getMimeType(), ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']) ||
                    $file->getSize() > 5 * 1024 * 1024) {
                    continue; // Skip invalid files
                }

                $mail->attach($file->getRealPath(), [
                    'as' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                ]);
            }

            $recipients = ['sales@arseninterior.in', 'admin@inymart.in'];
            Mail::to($recipients)
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
