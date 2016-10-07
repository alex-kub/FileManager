<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\FsCache;

use Log;
use Storage;
use Request;
use Input;
use Redirect;
use Illuminate\Http\Response;

class FileSystem extends Controller {

/*
    public function __construct(FsCache $fsCache) {    
        $this->fsCache = $fsCache;
    }
*/
   public function getIndex() {
      return view('fs');
   }

   public function getSync() {
      $actually = Request::input('actually');

      if (!$actually) {
         $files = Storage::disk('local')->files('', false);
         $actually = microtime(true) * 10000;
         return json_encode([
            'actually' => $actually,
            'data' => $this->prepareEncodingFS($files)
         ]);
      }
/*
        $files = $this->fsCache
            ->select('file as name')
            ->where('added','>=', $actually)
            ->get();
*/
      $actually = microtime(true) * 10000;
      return json_encode([
         'actually' => $actually,
         'data' => $files
      ]);

   }

   public function deleteSync() {
      // Удаление физически с диска и из FsCache
      $filename = Request::input('name');
      Log::info("<$filename>");

      $filename = iconv('utf-8', 'windows-1251', $filename);
      $filename = storage_path('app')."/$filename";

      if (file_exists($filename)) {
            // <Проблема> Storage::delete() с Кирилическими Символами
            // <Решено временно>
         unlink($filename);
         Log::info($filename);
      }
   }

   protected function prepareEncodingFS($files){
      // Перекодировка Списка файлов
      foreach($files as $key => $val ) {
            $files[$key] = ['name'=>iconv('windows-1251', 'utf-8', $val)];
      }
      return $files;
   }

   public function postUpload() {
      Log::info(Input::all());

      $filename = Input::file('upload_file')->getClientOriginalName();

      Input::file('upload_file')
          ->move(
            storage_path('app'),
            iconv('utf-8', 'windows-1251', $filename)
          );

        // Далее идет распознование и отправка результатов
        $filename = ['name' => $filename];
        $filename = json_encode($filename);

      return (new Response(
         $filename, 200))->header("content-type" , "text/plain");
   }

}