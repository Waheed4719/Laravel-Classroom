<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;


class Faculty extends Authenticatable implements JWTSubject
{
    protected $fillable = [
        'email','password','name'
    ];


    protected $hidden = [
        'password', 'remember_token',
    ];


    public function classes(){
        return $this->hasMany('App\Classes','faculty');
    }
    public function posts(){
        return $this->hasMany('App\ClassPosts','id');
    }


    
    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){

        
    return [
        'name' => $this->name,
        'email' => $this->email,
    ];

    

    }


}
