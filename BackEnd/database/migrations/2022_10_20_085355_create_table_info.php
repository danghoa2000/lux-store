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
        Schema::create('info', function (Blueprint $table) {
            $table->id();
            $table->string("full_name")->nullable();
            $table->string("email")->unique()->nullable();
            $table->string('password')->nullable();
            $table->string("telephone")->unique()->nullable();
            $table->date("birthday")->nullable();
            $table->integer("province_id")->nullable();
            $table->integer("district_id")->nullable();
            $table->integer("commune_id")->nullable();
            $table->string("address")->nullable();
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
        Schema::dropIfExists('info');
    }
};
