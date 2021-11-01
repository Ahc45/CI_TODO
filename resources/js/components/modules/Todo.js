import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "../axios";
import TodoList from "./TodoList";
import Container from "@mui/material/Container";
import { Grid  } from "@mui/material";
import { random } from "lodash";

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [activeId, setActiveId] = useState(0);
	const [formData, setformData] = useState({
		title: "",
		status: "New",
	});
	const [delData, setDelData] = useState({
		modalState: 0,
	});

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
		const querystring = require("querystring");
		const response = await axios
			.post("/post_todo", querystring.stringify(formData))
			.then(function(res) {
				if (res.data.is_valid) {
					getTodos();
				}
			})
			.catch(error => console.log(error));
	};

	const handleChange = e => {
		e.preventDefault();
		setformData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<Container>
			<Grid container justify="center" style={{ minHeight: "100vh" }}>
				<Grid item md={8} xs={12} className="todo-wraper">
					{todos &&
						todos.map(todo => (
							<TodoList
								setActiveId={ setActiveId}
								title={todo.title}
								id={todo.id}
								status={todo.status == "done" ? checked : null}
								key={todo.id}
							/>
						))}
				</Grid>
				<Grid item md={8} xs={12}>
					<form className="new-task" onSubmit={handleSubmit}>
						<input type="text" name="id" value={activeId} onchange={handleChange} />
						<label>
							Name:
							<input
								onChange={handleChange}
								type="text"
								name="title"
								value={formData.title}
							/>
						</label>
						<input type="submit" value="Submit" />
					</form>
				</Grid>
			</Grid>
		</Container>
	);
};

const container = document.getElementById("root");
if (container) {
	ReactDOM.render(<Todo />, container);
}
