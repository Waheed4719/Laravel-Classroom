<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exams extends Model
{
    protected $fillable =[
        'topic','info','day','time'
    ];
}
