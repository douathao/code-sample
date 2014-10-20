<?php

class UserController extends BaseController {
  public function __construct() {
    $this->beforeFilter('auth');
  }

  public function photos($nickname) {
    $this->doSomething();

    return "something";
  }

  private function doSomething() { /* Any business logic */
  }
} 