<?php
/**
 * ARSEN INTERIOR - DATABASE REFRESH & SEED SCRIPT
 * Usage: https://arseninterior.in/db_fix.php?secret=arsen_fix_2026
 */

$secret = $_GET['secret'] ?? '';
if ($secret !== 'arsen_fix_2026') {
    die("Unauthorized access. Access restricted to authorized developers only.");
}

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('max_execution_time', 300); // 5 mins

// 1. BOOTSTRAP LARAVEL
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

echo "<h1>Arsen Interior - System Maintenance</h1>";
echo "<pre>";

function runArtisan($command, $kernel) {
    echo "\n> Running artisan $command...\n";
    $status = $kernel->call($command);
    echo $kernel->output();
    return $status;
}

try {
    // 2. Clear Caches
    runArtisan('config:clear', $kernel);
    runArtisan('cache:clear', $kernel);
    
    // 3. Migrate
    echo "\n> Migrating database...\n";
    runArtisan('migrate --force', $kernel);
    
    // 4. Seed Admin
    echo "\n> Seeding Admin User...\n";
    runArtisan('db:seed --class=AdminUserSeeder --force', $kernel);
    
    // 5. Seed CMS Data (The new comprehensive one)
    echo "\n> Seeding CMS Data (Banners, Projects, Careers, Contacts)...\n";
    runArtisan('db:seed --class=CmsDataSeeder --force', $kernel);
    
    echo "\n\n✅ SUCCESS: Database has been refreshed and seeded with real data!";
    echo "\nAdmin Account Verified: admin@inymart.in / Arsen#SECURE!2026_@Admin_99";
    echo "\n\n⚠️ IMPORTANT: Delete this file (db_fix.php) from your server immediately for security.";
    
} catch (Exception $e) {
    echo "\n❌ CRITICAL ERROR: " . $e->getMessage();
}

echo "</pre>";
