import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "../axios";
import TodoList from "./TodoList";
import Container from "@mui/material/Container";
import { Grid, Typography, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskIcon from "@mui/icons-material/Task";
import DirectionsIcon from "@mui/icons-material/Directions";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Todo = () => {
	const [value, setValue] = useState("1");
	const [todos, setTodos] = useState([]);
	const [alert, setAlert] = useState({
		message: "",
		state: false,
		serverity: "success"
	});
	const [status, setStatus] = useState({
		id: "",
		status: ""
	});
	const [formData, setformData] = useState({
		title: "",
		status: "New",
		id: 0
	});
	const [formStat, setFormStat] = useState(0);

	const getTodos = async () => {
		const request = await axios
			.get("/get_todos")
			.catch(error => console.log(error));
		console.log(request.data);
		if (request) {
			setTodos(request.data.todos);
		}
	};
	useEffect(() => {
		getTodos();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		if (!formData.title) {
			document.getElementById("task-input").classList.add("error");

			return;
		}
		const querystring = require("querystring");
		const response = await axios
			.post("/post_todo", querystring.stringify(formData))
			.then(function(res) {
				if (res.data.is_valid) {
					getTodos();
				}
				setformData({
					title: "",
					status: "New",
					id: 0
				});
				formStat(false);
			})
			.catch(error => console.log(error));
	};

	const handleChange = e => {
		e.preventDefault();
		setformData({ ...formData, [e.target.name]: e.target.value });
	};
	const setActiveEdit = value => {
		setFormStat(1);
		setformData({ ...formData, id: value.dataId, title: value.title });
	};
	const setStatusVal = async value => {
		const querystring = require("querystring");
		const response = await axios
			.post("/update_status", querystring.stringify(value))
			.then(function(res) {
				if (res.data.is_valid) {
					setAlert({state: true, message: `Sucessully set Status into ${value.status}` })
					getTodos();
				}
			})
			.catch(error => console.log(error));
	};
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};
	const theme = createTheme({
		palette: "dark"
	});
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setAlert({ ...alert, state: false });
	};
	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Grid container >
					<Paper style={{ minHeight: "50vh" }} className="main">
						<Grid item xs={12}>
							<Typography variant="h4" className="hero-text" align="center" >
								CI TODO AND REACT
							</Typography>
							<Typography variant="subtitle1" align="center" >
								Made by: Dave Mark Candar
							</Typography>
							<div className={"add-wraper " + (formStat === 1 ? " hide" : '')}>
								<IconButton
									type="submit"
									sx={{ p: "10px" }}
									aria-label="search"
									onClick={e => setFormStat(1)}
								>
									<AddCircleIcon color="info" fontSize="large" />
								</IconButton>
							</div>
							<div
								className={"form-wraper" + (formStat === 0 ? " hide" : '')}
							>
								<Paper
									className="new-task"
									onSubmit={handleSubmit}
									component="form"
									sx={{
										p: "2px 4px",
										display: "flex",
										alignItems: "center"
									}}
								>
									<input
										type="text"
										className="hide"
										name="id"
										value={formData.id}
										onChange={handleChange}
									/>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder="Create New Task"
										inputProps={{ "aria-label": "Create New Task" }}
										id="task-input"
										name="title"
										value={formData.title}
										multiline
										maxRows={4}
										variant="standard"
										error={true}
										onChange={handleChange}
									/>

									<IconButton
										type="submit"
										sx={{ p: "10px" }}
										aria-label="search"
									>
										<CheckCircleIcon color="success" />
									</IconButton>
									<Divider
										sx={{ maxHeight: 28, m: 0.5 }}
										orientation="vertical"
										sx={{ height: 28, m: 0.5 }}
									/>
									<IconButton
										sx={{ p: "10px" }}
										aria-label="directions"
										onClick={e => setFormStat(0)}
									>
										<CancelIcon color="warning" />
									</IconButton>
								</Paper>
							</div>
						</Grid>
						<Grid item xs={12}>
							<Box sx={{ width: "100%", typography: "body1" }}>
								<TabContext value={value}>
									<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
										<Tabs
											onChange={handleTabChange}
											aria-label="lab API tabs example"
											variant={"fullWidth"}
										>
											<Tab
												label="Active"
												icon={<FormatListBulletedIcon />}
												iconPosition="start"
												value="1"
											/>
											<Tab
												label="Done"
												icon={<TaskIcon color="success" />}
												iconPosition="start"
												value="2"
											/>
										</Tabs>
									</Box>
									<TabPanel value="1">
										<List style={{ width: "100%" }}>
											{(typeof todos.active  != "undefined" & todos.active != null)  && 
												todos.active.map(todo => (
													<TodoList
														setformData={value => setActiveEdit(value)}
														title={todo.title}
														dataId={todo.id}
														status={todo.status == "Done" ? checked : null}
														key={"li-" + todo.id}
														setStatus={staVal => setStatusVal(staVal)}
													/>
												))}
										</List>
									</TabPanel>
									<TabPanel value="2">
										<List style={{ width: "100%" }}>
											{todos.done &&
												todos.done.map(todo => (
													<TodoList
														setformData={value => setActiveEdit(value)}
														title={todo.title}
														dataId={todo.id}
														status={todo.status == "Done" ? true : null}
														key={"li-" + todo.id}
														setStatus={staVal => setStatusVal(staVal)}
													/>
												))}
										</List>
									</TabPanel>
								</TabContext>
							</Box>
						</Grid>
					</Paper>
				</Grid>
			</Container>
			<Snackbar
				open={alert.state}
				autoHideDuration={1500}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert onClose={handleClose} severity={alert.serverity} sx={{ width: "100%" }}>
					{alert.message}
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
};

const container = document.getElementById("root");
if (container) {
	ReactDOM.render(<Todo />, container);
}
