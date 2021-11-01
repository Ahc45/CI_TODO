<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Todos extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		$this->load->model('todos_m');
	}
	public function index()
	{
		$this->load->view('main');
	}
	function get_todos()
	{
		$params = [
			'is_deleted' => 0,
			'status' => 'New'
		];
		$active = $this->todos_m->get_todos($params)->result();
		$params['status'] = 'Done';
		$done = $this->todos_m->get_todos($params)->result();

		response([
			'data' => ['todos' => [
				'done' => $done,
				'active' => $active
			]],
			'status' => 200
		]);
	}
	function post_todo()
	{

		if (post('id')) {

			$this->todos_m->save([
				'title' => post('title'),
				'status' => post('status')
			], (int) post('id'));
		} else {
			$this->todos_m->save([
				'title' => post('title'),
				'status' => post('status')
			]);
		}
		response([
			'data' => [
				'post' => $_POST,
				'is_valid' => 1
			],
			'status' => 200

		]);
	}

	function update_status()
	{
		if (post('dataId')) {
			$this->todos_m->save([
				'status' => post('status')
			], (int) post('dataId'));
		}
		response([
			'data' => [
				'post' => $_POST,
				'is_valid' => 1
			],
			'status' => 200

		]);
	}
	function delete_todo()
	{
		$this->todos_m->delete((int) get('id'));
		response([
			'data' => [
				'post' => $_GET,
				'is_valid' => 1
			],
			'status' => 200

		]);
	}
}
