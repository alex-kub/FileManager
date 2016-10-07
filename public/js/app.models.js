var app = app || {};

app.models = {};

var Local = new (Backbone.Collection.extend({
   localStorage: new Backbone.LocalStorage('FileLocal')
}));

var File = Backbone.Model.extend({
   // Свой экземпляр, так как из collection.local -- глюк на 3-4 сохранениях
   local: Local,
   //parse: function (response) { // Не используется,
   // так как при обновлении затирает всю коллекцию при новом FETCH
   //   this.isNew = function() { return false };
   //   console.log(this.collection);
   //   this.set(response);
   //},
   // Каждая добавленая модель не является НОВОЙ при добавлении для правильного
   // генерирования методов CRUD
   isNew: function() { return false },
   sync: function(method, model, options) {
      model.trigger('sync');
      switch (method){
         case 'patch':
            // Сохранение CHECKED на стороне клиента
            if ('checked' in options.attrs) {
               if (model.changed.checked == true) {
                  model.local.create({name: model.attributes.name});
                  console.log('add check');
                  return;
               } else
               if (model.changed.checked == false) {
                  _.each(
                     model.local.where({
                        name: model.attributes.name
                     }),
                     function (elem) {
                        elem.destroy();
                     });
               }
            }
            break;
         //
         //case 'update':
         //   if (model.changed.checked == true) {
         //      model.local.create( {name: model.attributes.name} );
         //      }
         //   else {
         //      _.each(
         //         model.local.where({
         //            name:model.attributes.name
         //         }),
         //         function(elem){
         //            elem.destroy();
         //         });
         //   }
         //
            break;
         case 'delete':
            //console.log('delete');
            //console.log(model.attributes);
            //console.log(model.collection.url);
            $.ajax({
               url: model.collection.url,
               type: 'delete',
               data: { name:
                  model.attributes.name
               }
            });
            // <Задача> 1. Ответ от сервера

            //Удаление из local
            _.each(
               model.local.where({
                  name:model.attributes.name
               }),
               function(elem){
                  elem.destroy();
            });

            options.success();
            break;
      }
   }
});

var Files = Backbone.Collection.extend({
   model: File,
   url:'fs/sync/?actually=0', // Проблема с адресом
   firstSync: true, // Проблема удаленных файлов
   local: Local,
   sync: function(method, model, options) {
      switch (method) {
         case 'read':
            $.get(model.url, function(fromServer) {
               fromServer = JSON.parse(fromServer); // urlRoot !!!!
               model.url = model.url.replace(/\?.*$/,'?actually='+fromServer.actually);
               if (model.firstSync) {
                  model.local.fetch({
                     success: function () {
                        fromServer.data = _.map(fromServer.data, function (elem) {
                           if (model.local.where({name: elem.name}).length)
                              return _.extend(elem, {checked: true});
                           //
                           return _.extend(elem, {checked: false});
                        });
                     }
                  });
                  //options.success(fromServer.data);
                  // Добавляется через add так как parse не используется
                  model.add(fromServer.data);
                  // !!!!!!!!!!!!!!!!!!!!!!!!!
                  //model.firstSync = false; // Проблема удаленных файлов
                  return;
               }

               fromServer.data = _.map(fromServer.data, function (elem) {
                  return _.extend(elem, {checked: false});
               });
               // options.success(fromServer.data);
               // Добавляется через add так как parse не используется
               model.add(fromServer.data);
            });
            break;
      }
   }
});