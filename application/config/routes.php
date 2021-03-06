<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// $route['default_controller'] = 'Index';
// $route['404_override'] = '';
// $route['translate_uri_dashes'] = FALSE;


$route['default_controller'] = "todos";
$route['todos/get_todos'] = "todos/get_todos";
$route['todos/post_todo'] = "todos/post_todo";
$route['todos/update_status'] = "todos/update_status";
$route['todos/updates_todo/(:num)'] = "todos/updates_todo/$1";
$route['todos/delete_todo'] = "todos/delete_todo";