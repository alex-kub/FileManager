@extends('layout')
@section('content')

<input id="all_check" type="button" value="all check">
<input id="not_all_check" type="button" value="not all check">
<input id="remove" type="button" value="remove">
<input id="check" type="button" value="check">
<input id="field" type="text" size="5">

<div id="files" style="margin: 30px; font-size: 14pt">
    <ul id="data" style="padding: 10px; padding-left: 30px">
    </ul>
</div>
<br/>

<div id="upload-area"></div>

<ul id="upload-scales">
</ul>


<div id="progress-bar"></div>

<script id="files_tpl" type="text/template">
    <input class="select_file" type="checkbox" <%= (checked)? 'checked':'' %>>
    <span class="nameFileDir" contenteditable="true"><%= name%></span>
</script>

<script id="scale_tpl" type="text/template">
    <ul>
      <li class="upload-item-info"><i>Файл</i>:<b> <%= name%></b></li>
      <li class="upload-item-info" ><b><%= mess%></b></li>
    </ul>
</script>


@endsection