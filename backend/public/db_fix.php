<?php
/**
 * DYNAMIC PATH VERSION - Database Fix Script for Arsen Interior
 * This version automatically detects the Laravel root folder.
 */

$secret = "arsen_fix_2026";
if (!isset($_GET['secret']) || $_GET['secret'] !== $secret) {
    die("Unauthorized access.");
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Arsen Interior - Dynamic DB Fix</h1>";

// --- DYNAMIC PATH DETECTION ---
$script_dir = __DIR__;
$possible_roots = [
    $script_dir . '/..',                // If script is in laravel_api/public/
    $script_dir . '/../laravel_api',    // If script is in public_html/
    $script_dir . '/../../laravel_api', // If script is in public_html/api/
    $script_dir                         // Current dir
];

$laravel_root = null;
foreach ($possible_roots as $path) {
    $check_path = realpath($path);
    if ($check_path && file_exists($check_path . '/bootstrap/app.php') && file_exists($check_path . '/vendor/autoload.php')) {
        $laravel_root = $check_path;
        break;
    }
}

if (!$laravel_root) {
    echo "<h2><span style='color:red'>ERROR:</span> Could not find Laravel Root!</h2>";
    echo "Current Location: " . $script_dir . "<br>";
    echo "Files detected in current folder:<br><pre>";
    print_r(scandir($script_dir));
    echo "</pre>";
    echo "<p>Please ensure <b>vendor.zip</b> is extracted into the <b>laravel_api</b> folder.</p>";
    die();
}

echo "<p style='color:green'>Found Laravel Root at: $laravel_root</p>";

// --- CACHE CLEANING (Fixes "Class not found" errors) ---
echo "<h2>0. Cleaning Bootstrap Cache...</h2>";
$cache_files = [
    $laravel_root . '/bootstrap/cache/packages.php',
    $laravel_root . '/bootstrap/cache/services.php',
    $laravel_root . '/bootstrap/cache/config.php',
    $laravel_root . '/bootstrap/cache/routes-v7.php'
];

foreach ($cache_files as $file) {
    if (file_exists($file)) {
        if (unlink($file)) {
            echo "Deleted: " . basename($file) . "<br>";
        } else {
            echo "<span style='color:red'>Failed to delete: " . basename($file) . "</span><br>";
        }
    }
}

$vendor_path = $laravel_root . '/vendor/autoload.php';
$app_path = $laravel_root . '/bootstrap/app.php';

// Define Laravel constants
define('LARAVEL_START', microtime(true));

try {
    echo "<h2>1. Bootstrapping Laravel...</h2>";
    require $vendor_path;
    $app = require_once $app_path;

    // We need to use full namespaces since we haven't loaded them globally yet
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
    
    // Import Facades after bootstrap
    require_once $laravel_root . '/vendor/autoload.php'; // Ensure autoload is ready for classes
    
    // --- FORCE REFRESH CONFIG FROM NEW CREDENTIALS ---
    echo "<h2>1.5 Refreshing Config with New Credentials...</h2>";
    
    // We will use the credentials you provided directly to ensure success
    $db_val = 'u508480125_arsen_db';
    $user_val = 'u508480125_arsen_db';
    $pass_val = '*4yJ:TS5L7u$';

    config([
        'database.connections.mysql.database' => $db_val,
        'database.connections.mysql.username' => $user_val,
        'database.connections.mysql.password' => $pass_val,
        'database.connections.mysql.host'     => 'localhost',
    ]);
    
    echo "Using Database: <span style='color:blue; font-weight:bold;'>$db_val</span><br>";
    echo "Using Username: <span style='color:blue; font-weight:bold;'>$user_val</span><br>";
    echo "<p style='color:orange'>Note: I am using the new credentials you gave me to bypass the old ones in your server's .env file.</p>";
    
    echo "<p style='color:green'>Bootstrap & Configuration READY!</p>";

    echo "<h2>2. Running Database Tasks...</h2>";
    
    // Test Connection
    \Illuminate\Support\Facades\DB::purge('mysql'); // Clear any existing connection
    \Illuminate\Support\Facades\DB::connection()->getPdo();
    echo "DB Connection: <span style='color:green'>OK</span><br>";

    // Run Migrations
    echo "Running Migrations (Fresh Install) (Step 2/4)...<br>";
    $exitCode = \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--force' => true]);
    echo "<pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";

    // Run Seeders
    echo "Seeding CMS Data (Step 3/4)...<br>";
    $exitCodeSeed = \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
    echo "<pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";

    // Fix Admin User
    echo "Repairing Admin Account (Step 4/4)...<br>";
    $adminEmail = 'admin@inymart.in';
    \App\Models\User::updateOrCreate(
        ['email' => $adminEmail],
        [
            'name' => 'Admin',
            'password' => \Illuminate\Support\Facades\Hash::make('Arsen#SECURE!2026_@Admin_99'),
        ]
    );
    echo "<p style='color:green'>Admin account restored!</p>";
    
    // CLEAR CONFIG CACHE AT THE END
    \Illuminate\Support\Facades\Artisan::call('config:clear');

    echo "<h2>SUCCESS: System Refreshed!</h2>";
    echo "<p>You should now be able to log in to your dashboard.</p>";

} catch (\Throwable $e) {
    echo "<div style='background:#fee; padding:15px; border:2px solid red; border-radius:10px;'>";
    echo "<h3 style='color:red'>CRITICAL ERROR CAUGHT:</h3>";
    echo "<b>Message:</b> " . $e->getMessage() . "<br>";
    echo "<b>File:</b> " . $e->getFile() . "<br>";
    echo "<b>Line:</b> " . $e->getLine() . "<br>";
    echo "<h4>Stack Trace:</h4>";
    echo "<pre style='font-size:11px;'>" . $e->getTraceAsString() . "</pre>";
    echo "</div>";
    
    echo "<h3>Possible Fixes:</h3>";
    echo "<ul>";
    echo "<li>Check your <b>.env</b> file database credentials.</li>";
    echo "<li>Ensure you uploaded the <b>vendor</b> folder correctly.</li>";
    echo "<li>PHP Version on Hostinger should be <b>8.1 or 8.2</b>.</li>";
    echo "</ul>";
}
