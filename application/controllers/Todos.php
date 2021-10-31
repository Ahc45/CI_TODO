<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Todos extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->model('todos_m');
	}
	public function index()
	{
		$this->load->view('main');
		
	}
	function get_todos(){
		$todos = $this->todos_m->get_todos([])->result();
		if($todos){
			response([
				'data' => ['todos' => $todos],
				'status'=> 200
			]);
		}
	}
	public function post_todo(){
		
		$this->todos_m->save([
			'title' => post('title'),
			'status' => post('status')
		]);
		
		response([
			'data' => [
				'post' => $_POST,
				'is_valid' => 1
			],
			'status'=> 200
			
		]);
	}
	
}
