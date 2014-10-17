<?php

class Breed extends Eloquent {
    // By default, Laravel expects a created_at and updated_at timestamp field in the database table.
    // set $timestamps to false to disable it
    public $timestamps = false;

    public function cats () {
        return $this->hasMany('Cat');
    }
}