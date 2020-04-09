<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classes', function (Blueprint $table) {
          $table->id();
          $table->string('name')->unique();
          $table->string('room_code')->unique();
          $table->string('faculty');
          $table->string('cover_image')->nullable();
          $table->integer('population')->default(0);
          $table->string('status')->default('open');  
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
        Schema::dropIfExists('classes');
    }
}
