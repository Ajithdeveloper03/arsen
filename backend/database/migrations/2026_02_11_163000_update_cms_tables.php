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
        Schema::table('projects', function (Blueprint $table) {
            if (!Schema::hasColumn('projects', 'progress')) {
                $table->integer('progress')->default(0)->after('status');
            }
            if (!Schema::hasColumn('projects', 'subtitle')) {
                 $table->string('subtitle')->nullable()->after('title');
            }
            if (!Schema::hasColumn('projects', 'badge')) {
                 $table->string('badge')->nullable()->after('subtitle');
            }
            // Index for faster queries
            $table->index('status');
        });

        Schema::table('contact_details', function (Blueprint $table) {
            if (!Schema::hasColumn('contact_details', 'icon')) {
                $table->string('icon')->nullable()->after('label');
            }
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['progress', 'subtitle', 'badge']);
            $table->dropIndex(['status']);
        });

        Schema::table('contact_details', function (Blueprint $table) {
            $table->dropColumn('icon');
            $table->dropIndex(['type']);
        });
    }
};
