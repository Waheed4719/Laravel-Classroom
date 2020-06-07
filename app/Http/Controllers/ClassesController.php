<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes;
use App\ClassPosts;
use App\User;
use App\Faculty;
use App\ClassPopulation;
use Illuminate\Support\Str;
$guardfunc = app('App\http\Controllers\AuthController')->guard();


class ClassesController extends Controller
{
    public function index(){
        $id = auth('user')->user()->id;
        $classes = Classes::orWhere('faculty',$id)->get();
        if($classes !== null){

            return response()->json(['obj'=>$classes]); 
        }
        else{
            return 404;
        }
    }

    public function store(Request $request){
        $faculty = auth('faculty')->user()->id;
        $class = new Classes;
        $class->name = $request->input('name');
        $class->faculty=$faculty;
        $class->room_code=Str::random(10);
        $class->save();
        $idlen= strlen($class->id);
        $room_code = Str::random(6- $idlen);
        $class->update(['room_code'=>$room_code.$class->id]);
        

        return response()->json(['obj'=>$class]);
        
    }
    public function join(Request $request){
        $code = $request->code;
        $class = Classes::where('room_code',$code)->first();
        $count = ClassPopulation::where('class_id',$class->id)->where('student_id',auth()->user()->id)->get()->count();

        //Checking to see if the user is already enrolled to the class or not
        if($count==1){
            return response()->json(['msg'=>'you have already enrolled in this class']);
        }

        //Student is being enrolled to the new Class
        $classPop = new ClassPopulation;
        $classPop->student_id = auth('user')->user()->id;
        $classPop->class_id = $class->id;
        $classPop->save();

        //Incrementing the number of class students/population by 1
        $newCount = ClassPopulation::where('class_id',$class->id)->where('student_id',auth()->user()->id)->get()->count();

        $class->update(['population'=> $newCount]);

        
        return response()->json(['class'=>$class]);

    }

    public function show($id){
        return response()->json(['obj'=> Classes::where('id',$id)->with('faculty')->with('posts')->first()]);
    }
    public function update(Request $request, $id){
        $class = Classes::findOrFail($id);
        $class-> update($request->all());
        return $class;
    }
    public function delete($id){
        $class = Classes::findOrFail($id);
        if(auth('user')->user()->id == $class->faculty){
            $class->delete($class);
            return 204;
        }
        else{
            return 400;
        }
       
    }


    public function makePost(Request $request){
       

        $post = $request->post;
        $newPost = new ClassPosts;
        $newPost->post = $post;
        $newPost->user_id=auth()->user()->id;
        $newPost->class_id=$request->class_id;
        // $newPost->user_type= guardfunc();

        if(auth()->guard('user')->check()){
            $newPost->user_type="user";
        }
      
        $newPost->save();
    
        return response()->json(['savedPost'=>$post]);
    }

    public function allPosts($id){
        $query = ClassPosts::where('class_id',$id)->with('class')->with('comments');
        $posts = $query->get();

        foreach ($posts as $post ) {
            
                return $query->with("user")->get();
            
        }
    
            
    } 

    public function getSinglePost($id){
        $query = ClassPosts::where('id',$id)->with("comments")->first();
        return $query;
    }


}

