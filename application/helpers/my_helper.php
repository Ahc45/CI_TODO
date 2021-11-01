<?php
defined('BASEPATH') or exit('No direct script access allowed');

if (!function_exists('active_nav')) {
	function active_nav($controller = "", $maintain_controller = false)
	{
		$CI = &get_instance();
		$current = $CI->uri->uri_string();
		return ($current == $controller) ? "active" : '';
	}
}


if (!function_exists('assets')) {
	function assets($type, $file_name, $sub_folder = "")
	{
		return $url = base_url() . $type . "/" . $file_name;
	}
}
if (!function_exists('full_asset')) {
	function full_asset($path)
	{
		return $path;
	}
}



// ============================== //>
// SESSION, POST, GET
// ============================== //>

if (!function_exists('session')) {
	function session($item)
	{
		$CI = &get_instance();
		return $CI->session->userdata($item);
	}
}

if (!function_exists('post')) {
	function post($post, $clean = false)
	{
		$CI = &get_instance();
		$input_post = $CI->input->post($post, $clean);
		return (empty($input_post)) ? '' : $input_post;
	}
}

if (!function_exists('get')) {
	function get($get)
	{
		$CI = &get_instance();
		return $CI->input->get($get, true);
	}
}



// ============================== //>
// SCRIPT HELPER
// ============================== //>
if (!function_exists('load_assets')) {
	function load_assets($type, $scripts = array(), $production = FALSE)
	{
		$CI = &get_instance();

		$CI->load->helper('string');
		$random_string = random_string('numeric');
		// $random_string = '2020-09-08-v1'; //always update this, kapag may changes ka sa css and js

		$paths = array(
			'js' => array(
				
			),
			'css' => array(
				
			),
		);

		$js_str = '';
		$css_str = '';

		if (!empty($scripts) && array_key_exists('css', $scripts) && !empty($scripts['css'])) {
			foreach ($paths['css'] as $i => $val) {
				if (in_array($i, $scripts['css'])) {
					$css_str .= '<link rel="stylesheet" href="' . $val . '">' . "\n";
				}
			}
		}

		if (!empty($scripts) && array_key_exists('js', $scripts) && !empty($scripts['js'])) {
			foreach ($paths['js'] as $i => $val) {
				if (in_array($i, $scripts['js'])) {
					$js_str .= "<script src=" . $val . "></script>\n";
				}
			}
		}

		if ($type == "css") {
			return $css_str;
		} elseif ($type == "js") {
			return $js_str;
		} else {
			return false;
		}
	}
}


if (!function_exists('tester')) {
	function tester($var,$dump = false, $state = 1)
	{
		print_r("<pre>");
		if($dump){
			var_dump($var);
		}else{
			print_r($var);
		}
		print_r("<pre>");
		if($state){
			die();
		}
	}
}
if (!function_exists('response')) {
	function response($response = null)
	{
		if(!empty($response['status'] == 200)){
			header('Content-Type: application/json');
			echo json_encode( $response['data']);
		}
		
		if(empty($response)){
			header("HTTP/1.1 404 Not Found");
		}
	}
}


/* End of file ms_helper.php */
/* Location: ./application/helpers/ms_helper.php */