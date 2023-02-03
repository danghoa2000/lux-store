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
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->integer("customer_id")->nullable();
            $table->integer("shipping_id")->nullable();
            $table->integer("status")->nullable();
            $table->string("order_code")->nullable();
            $table->float("price")->nullable();
            $table->float("price_discount")->nullable();
            $table->text("address")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order');
    }
};
