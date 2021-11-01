import * as React from "react";
import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import {
	Checkbox,
	Dialog,
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Divider
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

const TodoList = ({ title, dataId, status, setformData, setStatus }) => {
	const [ckStatus, setckStatus] = useState({
		modalState: false,
		status: status,
		alert: false
	});
	const handleChange = e => {
		setckStatus({ ...ckStatus, status: e.target.checked });
		setStatus({
			dataId : dataId,
			status:  e.target.checked ? "Done" : "New"
		})
	};
	const deleteTask = async e => {
		const response = await axios
			.get("/delete_todo?id=" + dataId)
			.then(function(res) {
				document.getElementById("task-" + dataId).remove();
				setckStatus({ ...ckStatus, modalState: false, alert: true });
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
		<ListItem
			className="todo-list"
			style={{ width: "100%" }}
			key={"key-" + dataId}
			id={"task-" + dataId}
		>
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
			<div className="td-btn">
				<IconButton
					className="del-btn"
					color="primary"
					aria-label="Delete"
					component="span"
					onClick={e => {
						setckStatus({ ...ckStatus, modalState: true });
					}}
				>
					<DeleteIcon color="error" />
				</IconButton>
				<IconButton
					aria-label="Update to done"
					component="span"
					onClick={e => setformData({ dataId, title })}
				>
					<EditIcon color="info" />
				</IconButton>
			</div>
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
			<Snackbar
				open={ckStatus.alert}
				autoHideDuration={1500}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: "50%" }}>
					Successfully Deleted Task!
				</Alert>
			</Snackbar>
			<Divider />
		</ListItem>
	);
};

export default TodoList;
