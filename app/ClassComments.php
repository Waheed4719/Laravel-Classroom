<?php

namespace App;

use Illuminate\Database\Eloquent\Model;



Class ClassComments extends Model{

    protected $table = "comments";
    protected $fillable = [
        'user_id','comment','class_id','post_id'
    ];


    public function class(){
        return $this->belongsTo('App\Classes','class_id');
    }

    public function user(){
        return $this->belongsTo('App\User','user_id');
    }

    public function classPosts(){
        return $this->belongsTo('App\ClassPosts','post_id');
    }
    

}


?>