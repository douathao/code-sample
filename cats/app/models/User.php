<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

  use UserTrait, RemindableTrait;

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'users';

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = array('password', 'remember_token');

  // Laravel provide by default a protection against mass assignment security issues.
  // That's why you have to manually define which fields could be "mass assigned"
  // * need this for testLoggedInUserCanCreateCat
  protected $fillable = array('username', 'password', 'is_admin');

  public function getAuthIdentifier() {
    return $this->getKey();
  }

  public function getAuthPassword() {
    return $this->password;
  }

  public function cats() {
    return $this->hasMany('Cat');
  }

  public function owns(Cat $cat) {
    return $this->id == $cat->owner;
  }

  public function canEdit(Cat $cat) {
    return $this->is_admin or $this->owns($cat);
  }

}
