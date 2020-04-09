<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;
use JWTAuth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller {


protected $user;

public function __construct(){
    $this->middleware("auth:user",['except'=>['login','register','refreshToken','logout','guard']]);
    $this->user = new User;

}

public function register(Request $request)
{
    $validator = Validator::make($request->all(),
    [
        'name' => 'required|string',
        'email' => 'required|string',
        'password' => 'required|string|min:6',
    ]);

    if($validator->fails())
    {
        return response()->json([
            "success"=>false,
            "message"=>$validator->messages(),
        ],400);
    }

    $check_email = $this->user->where("email", $request->email)->count();
    if($check_email>0)
    {
        return response()->json([
            'success'=>false,
            'message'=>'this email already exists, please try another email'
        ],200);
    }

    $registerComplete = $this->user::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'password'=>Hash::make($request->password),
    ]);

        if($registerComplete){
            // return $this->login($request);
        return response()->json([
            'msg' => "User Successfully registered!"
        ]);
        }

}

public function login (Request $request)
{
    $validator = Validator::make($request->only('email','password')
    ,[
        'email' => 'required|string',
        'password' => 'required|string|min:6',
    ]);

    if($validator->fails())
    {
        return response()->json([
            "success"=>false,
            "message"=>$validator->messages()->toArray(),
        ],400);
    }
    $jwt_token = null;
    $input = $request->only("email","password");
    JWTAuth::factory()->setTTL(30);
    if(!$jwt_token = auth('user')->attempt($input))
    {
        return response()->json([
            'success'=>false,
            'message'=>'invalid email or password'
        ]);
    }
    $user = auth('user')->user();
    
    
    

   return $this->respondWithToken($jwt_token);
}

protected function respondWithToken($token)
{
    return response()->json([
        'success'=> true,
        'token' => $token,
        'token_type' => 'bearer',
        'expires_in' => Auth::factory()->getTTL() * 100000,
    ], 200);
}

public function refreshToken()
{
    try
     {
        return $this->respondWithToken(Auth::guard('user')->refresh());
    }
     catch (TokenExpiredException $e)
     {
        $responseMessage = "Token has expired and can no longer be refreshed";
        return $this->tokenExpirationException($responseMessage);
    } 
}

public function getAuthenticatedUser()
{
        try {

                if (! $user = JWTAuth::parseToken()->authenticate()) {
                        return response()->json(['user_not_found'], 404);
                }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

                return response()->json(['token_absent'], $e->getStatusCode());

        }

        return response()->json(compact('user'));


    
        
}

    public function logout()
    {
        try{
            $user = JWTAuth::parseToken()->authenticate();

            auth()->guard('user')->logout();

            return response()->json(['message' => 'Successfully logged out']);
        }
        catch(Tymon\JWTAuth\Exceptions\TokenExpiredException $e){
            return response()->json(['token_expired'], $e->getStatusCode());

        }
      
    }

    public function guard()
    {
        $guard = auth()->guard()->check();

        foreach(array_keys(config('auth.guards')) as $guard){

        if(auth()->guard($guard)->check()) return $guard;

    }
    return null;
        return response()->json(['msg'=>$guard]);
    }


}