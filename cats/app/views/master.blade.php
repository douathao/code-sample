<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Cats DB</title>

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

  <!-- TODO: check to see why this doesn't load bootstrap -->
  <!-- <link rel="stylesheet" href="{{asset('bootstrap-3.0.0.min.css')}}"> -->
</head>
<body>
	<div class="container">
		<div class="page-header">
			@yield('header')
		</div>
		@if(Session::has('message'))
		<div class="alert alert-success">
			{{Session::get('message')}}
		</div>
		@endif @yield('content')
	</div>
</body>
</html>