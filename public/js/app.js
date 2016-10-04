//+++
var Files = Backbone.Collection.extend({
  url:'fs/sync/?actually=0'
});
//+++
var Sync = Backbone.Model.extend({
  url:'fs/sync/?actually=0'
});


var vFile = Backbone.View.extend({
  'tagName':'li',
  initialize: function() {
    this.template = _.template($('#files_tpl').html());
  },
  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  }
});

var vFiles = Backbone.View.extend({
  initialize: function() {
    //this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addOne)
  },

  render: function() {
    this.collection.each(this.addOne, this);
  },

  addOne: function(model) {
    var view = new vFile({model:model});
    this.$el.append(view.render().el);
  }
});

var myLocal = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage("SomeCollection")
});

var FilesSync = Backbone.Collection.extend({
  url:'fs/sync/?actually=0',
  sync: function(method, model, options) {
    if (method == 'read') {
      $.post(model.url, function(data) {
        model.add(JSON.parse(data).data);
        //console.log(model.toJSON());
        model.url = model.url.replace(/\?.*$/,'?actually='+JSON.parse(data).actually);
        //console.log(model.url);
        options.success();
      });
    }
  }
});


