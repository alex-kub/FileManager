<!DOCTYPE html>
<html>
<head>
	<title>FileManager</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
	@foreach (['jquery-1.11.3.js',
	            'jquery-ui.js',
	            'underscore.js',
				'backbone.js',
                'backbone.localStorage.js'
				] as $lib)
        {!! Html::script('js/lib/'.$lib, ['type'=>'text/javascript']) !!}
	@endforeach
{{--{!! Html::script('js/app.js', ['type'=>'text/javascript']) !!}--}}
{!! Html::script('js/app.models.js', ['type'=>'text/javascript']) !!}
{!! Html::script('js/app.views.js', ['type'=>'text/javascript']) !!}
{!! Html::script('js/main.js', ['type'=>'text/javascript']) !!}
{{--{!! Html::script('js/upload.js', ['type'=>'text/javascript']) !!}--}}
{!! Html::style('css/reset.css') !!}
{!! Html::style('css/layout.css') !!}
{!! Html::style('css/list.css') !!}
{!! Html::style('css/upload.css') !!}
{!! Html::style('css/lib/jquery-ui.css') !!}
