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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->integer("user_id")->nullable(); // for review product
            $table->integer("constrained_id")->nullable();
            $table->longText("content")->nullable();
            $table->integer("rate")->nullable();
            $table->integer("parent_id")->nullable();
            $table->tinyInteger('type')->default(0);
            $table->string('name', 200)->nullable(); // for review blog with dont login
            $table->string('email',200)->nullable(); // for review blog with dont login
            // 0 - đánh giá sản phẩm, 1 - bình luận tin tức
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
        Schema::dropIfExists('reviews');
    }
};
