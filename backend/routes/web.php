<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return response()->json(['message' => 'Unauthenticated.'], 401);
})->name('login');

Route::get('/clear-config', function() {
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    return "Config, Cache, and View cleared!";
});

Route::get('/debug-storage', function() {
    $target = storage_path('app/public');
    $link = $_SERVER['DOCUMENT_ROOT'] . '/storage';
    
    echo "<h1>Storage Debugger</h1>";
    echo "<b>Target (Real Path):</b> " . $target . "<br>";
    echo "<b>Link (Public Path):</b> " . $link . "<br><br>";

    if (!file_exists($target)) {
        echo "❌ Target directory does not exist! Creating it...<br>";
        mkdir($target, 0775, true);
        echo "✅ Target directory created.<br>";
    } else {
        echo "✅ Target directory exists.<br>";
    }

    if (file_exists($link)) {
        echo "⚠️ Link path already exists.<br>";
        if (is_link($link)) {
            echo "ℹ️ It is a symlink pointing to: " . readlink($link) . "<br>";
        } else {
            echo "❌ It is a REAL DIRECTORY/FILE, not a symlink. You must delete this folder via File Manager for the link to work.<br>";
        }
    } else {
        echo "ℹ️ Link path is free.<br>";
        try {
            symlink($target, $link);
            echo "✅ Symlink created successfully!<br>";
        } catch (\Exception $e) {
            echo "❌ Failed to create symlink: " . $e->getMessage() . "<br>";
            echo "💡 Try running this command in SSH or Cron Job:<br>";
            echo "<code>ln -s $target $link</code>";
        }
    }

    return "<br><br>Done.";
});
