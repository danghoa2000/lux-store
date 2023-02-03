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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("product_code")->unique()->nullable();
            $table->string("name")->nullable();
            $table->text("description")->nullable();
            $table->integer("country_id")->nullable();
            $table->longText('price')->nullable();
            $table->integer("category_id")->nullable();
            $table->integer("group_category_id")->nullable();
            $table->integer("manufacturer_id")->nullable();
            $table->string("image")->nullable();
            $table->integer("status")->nullable()->default(1);
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
        Schema::dropIfExists('products');
    }
};
