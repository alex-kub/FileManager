@extends('layout')
@section('content')

<div id="content">
  <input id="send" type="button" value="send"/>

  <div id="ws_data" style="border: 1px solid black">

  </div>
</div>
<script type="text/javascript">
    window.onload = function() {

        var sock = new WebSocket('ws://127.0.0.1:8080');

        sock.onopen = function() {
        	console.log('Подключились!');
        }

        var send = document.getElementById('send');
        send.addEventListener('click', function() {
            alert('send');
        });
    }
</script>
@endsection