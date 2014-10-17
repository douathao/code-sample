<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function(){
    return "All cats";
});

Route::get('cats/{id}', function($id){
    return "Cat #$id";
})->where('id', '[0-9]+'); // id is number only