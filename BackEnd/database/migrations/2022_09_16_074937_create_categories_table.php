<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_code')->unique();
            $table->string('name')->nullable();
            $table->integer('parent_id')->nullable();
            $table->integer('group_category_id')->nullable();
            $table->text('description')->nullable();
            $table->string('image', 255)->nullable();
            $table->tinyInteger('type')->default(0);
            // 0 - thư mục sản phẩm, 1 - thư mục bài đăng.
            $table->integer('created_by')->nullable();
            $table->integer('status')->nullable()->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
