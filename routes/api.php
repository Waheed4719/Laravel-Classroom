<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;



// Users
Route::get('Users', 'userController@index');

// Classes
Route::get('classes','ClassesController@index');
Route::get('classes/{id}','ClassesController@show');
Route::put('classes/{id}','ClassesController@update');
Route::delete('classes/{id}','ClassesController@delete');
Route::post('classes','ClassesController@store')->middleware("auth:user");
Route::post('classes/joinClass','ClassesController@join')->middleware("auth:user");


// Class actions
Route::post('class/makePost','ClassesController@makePost')->middleware(["auth:user"]);
Route::get('class/allPosts/{id}', 'ClassesController@allPosts');
Route::get('class/post/{id}','ClassesController@getSinglePost');


//Population
Route::get('classes/{id}/getPeople','ClassPopulationController@classPopulation');

//Auth Controller
Route::post('login','AuthController@login');
Route::post('register','AuthController@register');
Route::get('getUser','AuthController@getAuthenticatedUser');
Route::get('logout','AuthController@logout');
Route::get('guard','AuthController@guard');
Route::get('/refreshToken','AuthController@refreshToken');


//Comment Controller
Route::post('postComment','CommentController@postComment')->middleware("auth:user");
Route::get('getComments','CommentController@getComments');






Route::get('image-upload', 'imageUpload@imageUpload')->name('image.upload');
Route::post('image-upload', 'imageUpload@imageUploadPost')->name('image.upload.post');


//ClassPopulation
Route::get('myClasses','ClassPopulationController@getUsersClasses');
Route::get('classPopulation/{id}','ClassPopulationController@classPopulation');

