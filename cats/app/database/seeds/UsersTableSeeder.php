<?php

class UsersTableSeeder extends Seeder {
  public function run() {
    User::create(array('username' => 'admin', 'password' => Hash::make('admin'), 'is_admin' => true));

    User::create(array('username' => 'doua', 'password' => Hash::make('doua'), 'is_admin' => false));
  }
}