(function($){
$(function(){

$.ajaxSetup({
   headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
   },
   timeout: 60000
});


var list_files = new Files;
var _files = new app.views.Files({
   el:$("#data"),
   collection: list_files
});

list_files.fetch();
   
/*
setInterval( function() {
   files.fetch({
      success: function() {
         console.log('<fetch>');
         //console.log(files.toJSON());
      }
   });
}, 2000);
*/

/*
$('#check').on('click', function() {
   _.each(list_files.where({checked:true}), function(elem) {
      console.log(elem.toJSON());
   });
});
*/
$('#remove').on('click', function() {
   _.each(list_files.where({checked:true}), function(elem) {
      elem.destroy({
         success: function() {
            //console.log(files.toJSON());
         },
         wait: true
      });
   });
});


$('#all_check').on('click', function() {
  list_files.each( function(elem) {
    elem.save({checked: true});
  });
});

$('#not_all_check').on('click', function() {
  list_files.each( function(elem) {
    elem.save({checked: false});
  });
});


$('#check').on('click', function() {
  list_files.each( function(elem) {
    console.log(elem.toJSON());
  } );
});



/// UPLOAD

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
      };

      xhr.send(form);

      xhr.onreadystatechange = function() {
        if (this.readyState !=4) return;
        if (this.status != 200) {
          console.log( this.status + '--' + this.statusText);

          setTimeout(function() {
            $new_scale.remove();
          }, 2000);

        }
        var resp_model = JSON.parse(this.responseText);
        resp_model =  _.extend(resp_model, { checked: false });

        list_files.add(resp_model);

        $new_scale.html(
          _scale({
            name: file.name,
            mess: 'Завершено.'
          })
        );

        setTimeout(function() {
          $new_scale.remove();
        }, 2000);
      }

    });
  }, false);

/// END UPLOAD





})
}(jQuery));