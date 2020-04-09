<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassPopulation extends Model
{
    protected $table = "class_population";
    protected $fillable = [
        'class_id','student_id'
    ];
    

    public function user(){
        return $this->belongsto('App\User','student_id');
    }
    public function Classes(){
        return $this->belongsto('App\Classes','class_id');
    }

}
