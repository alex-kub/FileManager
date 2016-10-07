var app = app || {};

app.views = {};

app.views.File = Backbone.View.extend({
   'tagName':'li',
   events: {
     'change .select_file' : 'select_file',
     'sync': 'the_all'
   },
   initialize: function() {
      this.template = _.template($('#files_tpl').html());
      // Удаляет из DOM. 
      // Определена в библиотеке.
      // view.remove() 
      this.listenTo(this.model, 'destroy', this.remove); // Удаляет из DOM
      this.listenTo(this.model, 'sync', this.render);
   },
  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  },
   select_file: function() {
      //this.model.save('checked', !this.model.get('checked'));
      this.model.save( {'checked' : !this.model.get('checked') }, {patch: true});
   }
});

app.views.Files = Backbone.View.extend({
   initialize: function() {
   //this.listenTo(this.collection, 'sync', this.render);
   this.listenTo(this.collection, 'add', this.addOne);
   // Перерисовывает весь View (-)
   // Т.е. как только в Коллекции удалили Модель, то перерисовали весь Вид
   // this.listenTo(this.collection, 'destroy', this.render);
  },

   render: function() {
      this.$el.html('');
      this.collection.each(this.addOne, this);
   },

   addOne: function(model) {
      var view = new app.views.File( {model:model} );
      this.$el.append(view.render().el);
   }
});