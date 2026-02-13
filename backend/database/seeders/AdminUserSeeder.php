<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@inymart.in'],
            [
                'name' => 'Admin',
                'password' => Hash::make('Arsen#SECURE!2026_@Admin_99'),
            ]
        );
    }
}
