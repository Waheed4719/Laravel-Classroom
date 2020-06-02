<?php

namespace App\Http\Controllers;
use App\Classes;
use App\ClassPopulation;
use App\ClassPosts;
use App\User;
use App\ClassComments;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class CommentController extends Controller
{

    public function postComment(Request $request){
        
    
        $commentClass = new ClassComments;
        $commentClass->comment = $request->input('comment');
        $commentClass->user_id = $request->input('user_id');
        $commentClass->class_id = $request->input('class_id');
        $commentClass->post_id = $request->input('post_id');
        $commentClass->save();

        return $commentClass;


    }

    public function getComments(){

    }





}


?>