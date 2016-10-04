/*
var wsocket = new WebSocket('ws://localhost:8080');

Backbone.sync = function(method, model, options){
  wsocket.send(JSON.stringify({
    "method": method,
    "model": model.url,
    "data": model.attributes
  }));

  wsocket.onmessage = function(message){
    var ret = JSON.parse(message.data);
    options.success(ret);
  };
};
*/