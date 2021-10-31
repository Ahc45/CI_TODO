<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// $route['default_controller'] = 'Index';
// $route['404_override'] = '';
// $route['translate_uri_dashes'] = FALSE;


$route['default_controller'] = "todos";
$route['todos/(:any)'] = "todos/$1";