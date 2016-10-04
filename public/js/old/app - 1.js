var ws = new WebSocket('ws://localhost:8080');

Backbone.sync = function(method, model, options){
  ws.send(JSON.stringify({
    "method": method,
    "model": model.url,
    "data": model.attributes
  }));

  ws.onmessage = function(message){
    var ret = JSON.parse(message.data);
    options.success(ret);
  };
};

var ImageModel = Backbone.Model.extend({
  url: 'list_image',
  default: {
    id: 1,
    data: "test_data"
  }
});


