<?php
   
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
  
class imageUpload extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function imageUpload()
    {
        return response()->json(['msg'=>'successfully uploaded image']);
    }
  
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function imageUploadPost(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg,mp4,pdf|max:10048',
        ]);
  
        $imageName = time().'.'.$request->image->getClientOriginalName();  
   
        $request->image->move(public_path('images'), $imageName);
   
        return response()->json(['success'=>'You have successfully upload image.',
                                 'image'=>$imageName]);
         
   
    }
}