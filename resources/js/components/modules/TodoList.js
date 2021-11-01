import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import {
	Checkbox,
	Dialog,
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar
} from "@material-ui/core";
import axios from "../axios";
import { Alert } from "@mui/material";
import {
	CardContent,
	FormControlLabel,
	Typography,
	IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = ({ title, id, status, setActiveId }) => {
	const [ckStatus, setckStatus] = useState({
		modalState: false,
		status: status,
		alert: false
	});
	const handleChange = e => {
		setckStatus({ ...ckStatus, status: e.target.checked });
	};
	const deleteTask = async e => {
		const response = await axios
			.get("/delete_todo?id=" + id)
			.then(function(res) {
				document.getElementById("task-" + id).remove();
				setckStatus({ ...ckStatus, modalState: false, alert:true });
			})
			.catch(error => console.log(error));
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setckStatus({ ...ckStatus, alert: false });
	};

	return (
		<div>
			<List className="todo-list" style={{ width: "100%" }} id={"task-" + id}>
				<ListItem style={{ width: "100%" }}>
					<FormControlLabel
						className="todo-item-wrap"
						style={{ width: "100%" }}
						control={
							<Checkbox
								onChange={handleChange}
								checked={ckStatus.status || false}
							/>
						}
						label={
							<CardContent style={{ padding: 20 }}>
								{<Typography variant="subtitle1">{title}</Typography>}
							</CardContent>
						}
					/>
					<IconButton
						color="primary"
						aria-label="Delete"
						component="span"
						onClick={e => {
							setckStatus({ ...ckStatus, modalState: true });
						}}
					>
						<DeleteIcon className="del-btn td-btn" />
					</IconButton>
					<IconButton
						color="primary"
						aria-label="Update to done"
						component="span"
						onClick={ () => setActiveId(id)}
					>
						<DeleteIcon className="update-btn td-btn" />
					</IconButton>
				</ListItem>
			</List>
			<Dialog
				open={ckStatus.modalState}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Opps! Its a delete!</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this task?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setckStatus({ ...ckStatus, modalState: false });
						}}
					>
						Nope
					</Button>
					<Button onClick={deleteTask} autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar open={ckStatus.alert} autoHideDuration={1500} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '50%' }}>
					This is a success message!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default TodoList;
