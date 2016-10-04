(function(){
$(function(){

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

/*
  var conn = new ab.Session('ws://localhost:8080',
    function() {
      conn.subscribe('', function(topic, data) {
        // This is where you would add the new article to the DOM (beyond the scope of this tutorial)
        console.log('New article published to category "' + topic + '" : ' + data.title);
      });
    },
    function() {
      console.warn('WebSocket connection closed');
    },
    {'skipSubprotocolCheck': true}
  );
*/

  var conn = ab.connect(
    'ws://localhost:8080',
    function(session) {
      session.subscribe('onNewData', function(topic, data) {
        console.log('New data: topic_id:' + topic);
        console.log(data.data);
      });
    },
    function(code, reason, detail) {
      //console.warn('Websocket connection closed: code=' + code +
      //              ' ;reason='+reason+' ;detail='+detail);
      //
    },
    {
      'maxRetries': 60,
      'retryDelay': 4000,
      'skipSubprotocolCheck': true
    }
  );

})
}(jQuery));