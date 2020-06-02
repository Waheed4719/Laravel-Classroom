<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassPosts extends Model
{
    protected $table = "class_posts";

    protected $fillable = [
        'user_type','post','user_id','class_id'
    ];
    

    public function faculty(){
        return $this->belongsto('App\User','user_id');
    }

    public function user(){
        return $this->belongsto('App\User','user_id');
    }
    public function class(){
        return $this->belongsto('App\Classes','class_id');
    }
    public function comments(){
        return $this->hasMany('App\ClassComments','post_id');
    }

}
