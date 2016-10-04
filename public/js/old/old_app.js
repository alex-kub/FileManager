var ImageModel = Backbone.Model.extend({
  //url: '/list_image/data'
});

var ImageCollection = Backbone.Collection.extend({
  //model: ImageModel,
  //url: document.location.pathname
  url: document.location.pathname.replace(/(page)/, 'data')
});

var ImageView = Backbone.View.extend({
  tagName: 'tr',
  events: {
    "click .test_click" : "click",
    'change .select_image': 'select_image'
  },
  initialize: function() {
    this.template = _.template($('#image_tpl').html());
    //this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'sync', this.xsync);
  },
  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  },
  click: function () {
    console.log(this.model.toJSON());
  },
  select_image: function() {
    //console.log('get=' +this.model.get('checked'));
    this.model.set('checked', !this.model.get('checked')*1);
    //console.log('set='+this.model.get('checked'));
    this.model.save();
  }
});

var ImageViewList = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    this.$el.html('');
    this.collection.each(this.addOne, this);
  },

  addOne: function(model) {
    var view = new ImageView({model: model});
    this.$el.append(view.render().el);
  }
});

var image_collection = new ImageCollection();
var image_view_list = new ImageViewList({
  el: $("#data"),
  collection: image_collection
});


//*
 image_collection.fetch({
 type:'post',
 success: function() {
 console.log('<>fetch<>');
 }
 });

 setInterval(function() {
 image_collection.fetch({
 type:'post',
 success: function() {
 console.log('<>fetch<>');
 }
 });
 }, 3000);

