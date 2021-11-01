<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Model extends CI_Model
{
	protected $_table_name = '';
	protected $_primary_key = 'id';
	protected $_primary_filter = 'intval';
	protected $_order_by = '';
	public $_rules = array();
	protected $_timestamps = FALSE;


	public function __construct()
	{
		parent::__construct();
	}

	public function array_from_post($fields)
	{
		$data = array();
		foreach ($fields as $i => $field) {
			$data[$field] = post($field);
		}
		return $data;
	}

	function get($id = null, $single = FALSE, $select = '*')
	{	

		if ( $id != NULL ) {
			$filter = $this->_primary_filter;
			$id = $filter($id);
			$this->db->where($this->_primary_key, $id);

			$method = 'row';
		}
		elseif ($single == TRUE) {
			$method = 'row';
		}
		else{
			$method = 'result';
		}

		$this->db->select($select);
		
		if ( $this->_order_by != NULL ) {
			$this->db->order_by($this->_order_by);
		}
		return $this->db->get($this->_table_name)->$method();
	}

	
	function get_by($where, $single = FALSE)
	{
		$this->db->where($where);
		return $this->get(null, $single);
	}

	function save($data, $id = NULL)
	{

		// Set timestamps
		if ( $this->_timestamps == TRUE ) {
			$now = date('Y-m-d H:i:s');
			$id || $data['created'] = $now;
			$data['modified'] = $now;
		}

		// Insert
		if ( $id === NULL ) {
			!isset($data[$this->_primary_key]) || $data[$this->_primary_key] = NULL;
			$this->db->set($data);
			$this->db->insert($this->_table_name);
			$id = $this->db->insert_id();

		}
		// Update
		else{
			$filter = $this->_primary_filter;
			$id = $filter($id);
			$this->db->set($data);
			$this->db->where($this->_primary_key, $id);
			$this->db->update($this->_table_name);
		}

		return $id;

	}

	function delete($id, $permanent = false)
	{
		$filter = $this->_primary_filter;

		if ( gettype( $id ) == "integer" ) {
			$id = $filter($id);
			if ( !$id ) {
				return FALSE;
			}	

			$this->db->where($this->_primary_key, $id);
			$this->db->limit(1);

		} elseif ( gettype( $id ) == "array" ) {
			foreach ($id as $i => $val) {
				$cur_id = $filter($val);
				if ( !$cur_id ) {
					return FALSE;
				}
			}

			$this->db->where_in($this->_primary_key, $id);
		}
		
		if ( $permanent === true ) {
			return $this->db->delete($this->_table_name);
		}else{
			return $this->db->update($this->_table_name, array('is_deleted'=> 1));
		}
		
	}

}

/* End of file MY_Model.php */
/* Location: ./application/core/MY_Model.php */