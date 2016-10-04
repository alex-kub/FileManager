<?php

Route::get('', function() {
	return redirect('fs');
});

Route::controller('fs', 'FileSystem');