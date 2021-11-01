<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Todos_m extends MY_Model
{
	protected $_table_name = 'todos';
	protected $_order_by = 'id';
	protected $_timestamps = TRUE;

	function get_todos($params, $is_num_rows = false)
	{
		$this->_filters($params);

		if (array_key_exists('join', $params) && $params['join'] != null) {
			if (is_array($params['join'])) {
				foreach ($params['join'] as $i => $joins) {
					$this->db->join($joins['tbl'], $joins['joined'], $joins['type']);
				}
			}
		}


		if ($is_num_rows === false) {
			if (array_key_exists('select', $params) && $params['select'] != null) {
				$this->db->select($params['select']);
			} else {
				$this->db->select($this->_table_name.'.*');
			}

			$limit = (array_key_exists('limit', $params)) ? $params['limit'] : null;
			$offset = (array_key_exists('offset', $params)) ? $params['offset'] : null;
			$this->db->limit($limit, $offset);
			return $this->db->get($this->_table_name);
		} else {
			$this->db->select($this->_primary_key);
			return $this->db->get($this->_table_name)->num_rows();
		}
	}

	function _filters($params)
	{

		if (array_key_exists('order_by', $params) && $params['order_by'] != null) {
			$ob = ($params['ob'] == '1') ? 'asc' : '';
			$ob = ($params['ob'] == '0') ? 'desc' : '';

			$this->db->order_by($params['order_by'], $ob);
		} else {
			$this->db->order_by('todos.' . $this->_primary_key, 'desc');
		}

		if (array_key_exists('q', $params) && $params['q'] != null) {
			$q = $this->db->escape_like_str($params['q']);
			$this->db->where("CONCAT(todos.name, ' ', todos.description) LIKE '%" . $q . "%'", NULL, FALSE);
		}

        
		if (array_key_exists('where', $params)) {
			$this->db->where($params['where']);
		}
		if (array_key_exists('id', $params) && $params['id'] != null) {
			$this->db->where('id', $params['id']);
		}
		if (array_key_exists('is_deleted', $params)) {
			$this->db->where('is_deleted', $params['is_deleted']);
		}
		
		if (array_key_exists('where', $params)) {
			$this->db->where($params['where']);
		}
		if (array_key_exists('where_in', $params) && !empty($params['where_in'])) {
			$this->db->where_in($params['where_in']['field'], $params['where_in']['list']);
		}
		if (array_key_exists('group_by', $params) && $params['group_by'] != null) {
			$this->db->group_by($params['group_by']);
		}
	}



	function get_new()
	{
		$todos = new stdClass();
        $todos->id='';
        $todos->title='';
        $todos->Description='';
        $todos->status='';
        $todos->Description='';
        $todos->published_at='';
		return $todos;
	}
}

/* End of file Forms_M.php */
/* Location: ./application/models/Forms_M.php */