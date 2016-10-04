(function($){
$(function(){

   var $uploadArea = document.getElementById('upload-area');
   var $uploadScales = $('#upload-scales');
   var _scale = _.template($('#scale_tpl').html());

   $uploadArea.addEventListener('dragover', function(ev){
      ev.preventDefault();
   }, false);

   $uploadArea.addEventListener('drop', function(ev){
      ev.preventDefault();

      var csrf_token = $('meta[name="csrf-token"]').attr('content');

      var files = ev.dataTransfer.files;

      _.each(files, function(file){
         var xhr = new XMLHttpRequest();

         xhr.open('POST', 'fs/upload', true);
         xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token);
         var form = new FormData();
         form.append('upload_file', file);

        //var $new_scale = $('<div>'+ file.name +'<div>');
        //var $new_scale = $( _scale({
        //  name: file.name,
        //  mess: 'Загрузка'
        //}));
         var $new_scale = $('<li class="upload-item"></li>');
         $new_scale.html(_scale({
            name: file.name,
            mess: 'Загрузка'
         }));

        xhr.upload.onloadstart = function() {
           $uploadScales.append($new_scale);
        };

        xhr.upload.onprogress = function(ev) {
          $new_scale.html(_scale({
            name: file.name,
            mess: 'Загрузка: ' + Math.round((ev.loaded / ev.total)*100) + '%'
          }));
        };

        xhr.upload.onloadend = function() {
          $new_scale.html(_scale({
            name: file.name,
            mess: 'Обработка'
          }));
        }

         xhr.send(form);

         xhr.onreadystatechange = function() {

            if (this.readyState !=4) return;

            if (this.status != 200) {
               console.log( this.status + '--' + this.statusText);
            }

            var model = JSON.parse(this.responseText);

            var model =  _.extend(model, { checked: false });
            console.log( model );

           $new_scale.html(
             _scale({
               name: file.name,
               mess: 'Завершено.'
             })
           );

            setTimeout(function() {
               $new_scale.remove();
            }, 5000);
         }

      });
   }, false);


})
}(jQuery));
