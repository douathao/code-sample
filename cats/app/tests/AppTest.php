<?php

/**
 * Created by IntelliJ IDEA.
 * User: douathao
 * Date: 10/20/14
 * Time: 1:12 PM
 */
class AppTest extends TestCase {

  public function setUp() {
    parent::setUp();

    // Laravel does not apply filters on routes when they are called from within the testing environment
    // so we need to enable it here
    Route::enableFilters();

    //    Artisan::call('migrate');
    //    $this->seed();
  }

  public function testHomePageRedirection() {
    $this->call('GET', '/');
    $this->assertRedirectedTo('cats');
  }

  public function testVisitorIsRedirected() {

    $this->call('GET', '/cats/create');
    $this->assertRedirectedTo('login');
  }

  public function testLoggedInUserCanCreateCat() {
    // summary: Impersonating users with $this->be()

    $user = new User(array('name' => 'John Doe', 'is_admin' => false));
    $this->be($user);

    $this->call('GET', '/cats/create');
    $this->assertResponseOk();
  }

  /**
   * Testing with a database
   * TODO: check why this isn't working
   * - Do I need to clear the database on tear down and set it up again in set up ?
   */
  //  public function testOwnerCanDeleteCat() {
  //    $user = new User(array('id' => 1, 'name' => 'User #1', 'is_
  //   admin' => false));
  //    $this->be($user);
  //    $this->call('DELETE', '/cats/1');
  //    $this->assertRedirectedTo('/cats');
  //    $this->assertSessionHas('message');
  //  }
  //
  //  public function testNonAdminCannotEditCat() {
  //    $user = new User(array('id' => 2, 'name' => 'User #2', 'is_
  //   admin' => false));
  //    $this->be($user);
  //    $this->call('DELETE', '/cats/1');
  //    $this->assertRedirectedTo('/cats/1');
  //    $this->assertSessionHas('error');
  //  }

  // FIXME: error - Illuminate\Session\TokenMismatchException
  // Might be because of csrf
  //  public function testAdminCanEditCat() {
  //    $user = new User(array('id' => 3, 'name' => 'Admin', 'is_admin' => true));
  //    $this->be($user);
  //    $new_name = 'Berlioz';
  //    $this->call('PUT', '/cats/1', array('name' => $new_name));
  //    $crawler = $this->client->request('GET', '/cats/1');
  //    $this->assertCount(1, $crawler
  //      ->filter('h2:contains("' . $new_name . '")'));
  //  }

} 