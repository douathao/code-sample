Laravel
==============

Getting Started with Laravel 4
--------------

*This is a learning hand-on experience*

##Artisan
###Keeping up with the latest changes

	php artisan changes
	php artisan --version

###Inspecting and interacting with your application

	php artisan routes

###Fiddling with the internals

This will start a Read-Eval-Print Loop (REPL) similar to what you get when running the php -a command, which starts an interactive shell. In this REPL, you can enter PHP commands in the context of the application and immediately see their output:

	php artisan tinker

###Turning the engine off and on

This will put your application into maintenance mode. Edit the App:down handler inside app/global/start.php to add a custom message, render a view, or redirect the user.

	php artisan down
	php artisan up

###Fine-tuning your application

	php artisan optimize

###Generating migrations

	php artisan generate:migration create_cats_table --fields="name:string, date_of_birth:date:nullable"

###Generating HTML forms

	php artisan generate:form user

###Creating the command

	php artisan command:make ExportCatsCommand

This will generate a class inside app/commands/, which you then need to register inside app/start/artisan.php by adding the following line to it: -- see documentation for more information

	Artisan::add(new ExportCatsCommand);
