<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    protected $fillable = [
        'name','room_code','cover_image','faculty','population','status'
    ];
    

    public function faculty(){
        return $this->belongsto('App\User','faculty');
    }
    public function posts(){
        return $this->hasMany('App\ClassPosts','id');
    }

}
