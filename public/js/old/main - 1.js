(function(){
$(function(){

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  var image_model = new ImageModel();

  ws.onopen = function(){
    //image_model.fetch();

    image_model.isNew();

    setTimeout( function() {
      image_model.save({
        id: 1,
        xattr: 12345
      });
    }, 3000);

    setTimeout( function() {
      image_model.save({
        id: 2,
        xattr: 67890
      });
    }, 6000);

    setTimeout( function() {
      image_model.destroy();
    }, 9000);
  };




/*
  console.log("DOM ready");
  var conn = new WebSocket('ws://localhost:8080');
  conn.onopen = function() {
    console.log('Подключились!!!');
  };

  conn.onmessage = function(mess) {
    console.log('Данные:' + mess.data);
  };

  $('#send_mess').on('click', function() {
    var data = Math.random();
    conn.send( data );
  });
*/

  })
}(jQuery));