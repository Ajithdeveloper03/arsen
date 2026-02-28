<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->string('link_text')->nullable()->after('image_url');
            $table->string('link_url')->nullable()->after('link_text');
            $table->dropColumn('link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->string('link')->nullable()->after('image_url');
            $table->dropColumn(['link_text', 'link_url']);
        });
    }
};
