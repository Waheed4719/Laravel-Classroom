<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Users
Route::get('Users', 'userController@index');

// Classes
Route::get('classes','ClassesController@index');
Route::get('classes/{id}','ClassesController@show');
Route::put('classes/{id}','ClassesController@update');
Route::delete('classes/{id}','ClassesController@delete');
Route::post('classes','ClassesController@store')->middleware("auth:faculty");
Route::post('classes/joinClass','ClassesController@join')->middleware("auth:user");


// Class actions


if(auth()->guard('faculty')->check()){
    Route::post('class/makePost','ClassesController@makePost')->middleware("auth:faculty");
    
}
else{
    Route::post('class/makePost','ClassesController@makePost')->middleware(["auth:user"]);
}

Route::get('class/allPosts/{id}', 'ClassesController@allPosts');


//Auth Controller
Route::post('login','AuthController@login');
Route::post('register','AuthController@register');
Route::get('getUser','AuthController@getAuthenticatedUser');
Route::get('logout','AuthController@logout');
Route::get('guard','AuthController@guard');
Route::get('/refreshToken','AuthController@refreshToken');


// Faculty Controller
Route::post('faculty/register','FacultyAuthController@register');
Route::post('faculty/login','FacultyAuthController@login');
Route::get('faculty/getFaculty','FacultyAuthController@getAuthenticatedUser');
Route::get('faculty/guard','FacultyAuthController@guard');
Route::get('faculty/refreshToken','FacultyAuthController@refreshToken');

Route::get('image-upload', 'imageUpload@imageUpload')->name('image.upload');
Route::post('image-upload', 'imageUpload@imageUploadPost')->name('image.upload.post');


//ClassPopulation
Route::get('myClasses','ClassPopulationController@getUsersClasses');
Route::get('classPopulation','ClassPopulationController@classPopulation');

