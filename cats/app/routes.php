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



Route::get('/', function () {
  return Redirect::to('cats');
});

Route::get('/cats', function () {
  $cats = Cat::all();
  return View::make('cats.index')
    ->with('cats', $cats);
});

// pass in model cat so you don't have to do Cat::find($id)
Route::model('cat', 'Cat');

Route::get('cats/create', function() {
  $cat = new Cat;
  return View::make('cats.edit')
    ->with('cat', $cat)
    ->with('method', 'post');
});

Route::get('cats/{cat}', function (Cat $cat) {
  return View::make('cats.single')
    ->with('cat', $cat);
})->where('id', '[0-9]+'); // id is number only



Route::get('cats/{cat}/edit', function(Cat $cat) {
  return View::make('cats.edit')
    ->with('cat', $cat)
    ->with('method', 'put');
});

Route::get('cats/{cat}/delete', function(Cat $cat) {
  return View::make('cats.edit')
    ->with('cat', $cat)
    ->with('method', 'delete');
});

/**
 * Create a cat
 */
Route::post('cats', function(){
  $cat = Cat::create(Input::all());
  return Redirect::to('cats/' . $cat->id)
    ->with('message', 'Successfully created page!');
});

/**
 * Update a cat
 */
Route::put('cats/{cat}', function(Cat $cat) {
  $cat->update(Input::all());
  return Redirect::to('cats/' . $cat->id)
    ->with('message', 'Successfully updated page!');
});

/**
 * Delete a cat
 */
Route::delete('cats/{cat}', function(Cat $cat) {
  $cat->delete();
  return Redirect::to('cats')
    ->with('message', 'Successfully deleted page!');
});

Route::get('cats/breeds/{name}', function ($name) {
  $breed = Breed::whereName($name)->with('cats')->first();
  return View::make('cats.index')
    ->with('breed', $breed)
    ->with('cats', $breed->cats);
});

Route::get('about', function () {
  return View::make('about')->with('number_of_cats', 9000);
});

// bind a variable to a specfic view each time
View::composer('cats.edit', function($view)
{
  $breeds = Breed::all();
  if(count($breeds) > 0){
    $breed_options = array_combine($breeds->lists('id'),
      $breeds->lists('name'));
  } else {
    $breed_options = array(null, 'Unspecified');
  }
  $view->with('breed_options', $breed_options);
});