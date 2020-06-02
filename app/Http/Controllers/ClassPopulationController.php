<?php

namespace App\Http\Controllers;
use App\Classes;
use App\ClassPopulation;
use App\User;
use App\Faculty;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ClassPopulationController extends Controller
{

    public function getUsersClasses(){
     
        $class = ClassPopulation::where('student_id',auth()->user()->id)->get();
        
        $array = [];
        $array2 = [];
        $i = 0;
        foreach($class as $cls){      
            $var = Classes::where('id',$cls->class_id)->with('faculty')->first();
            $array[$i] = $var;
            $i++;
        }
      
        return response()->json(['classes'=>$array]);
    }

    public function classPopulation($id){
        $classPop = ClassPopulation::where('class_id',$id)->with('user')->get();
        $class = Classes::where('id',$id)->get();
        return response()->json(['classPop'=>$classPop,'class'=>$class]);
    }


}