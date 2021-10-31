import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import httpInstance from "../axiosInstance";
import TodoList from "./TodoList";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
const Todo = () => {
	const [todos, setTodos] = useState([]);
    const [todoForm, setTodoForm] = useState({
       title : '',
       status : 'created'
    });
	useEffect(() => {
		httpInstance
			.get("todos/get_todos")
			.then(res => {
				console.log(res);
				setTodos(res.data.todos);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

    handleChange = (e) => {
        e.preventDefault()
        setTitle(e.target.value);
        alert(title);
    }
	return (
		<Container>
			<Grid
				container
				justify="center"
                
				// direction="column"
				style={{ minHeight: "100vh" }}
			>
				<Grid item md={8} xs={12} className="todo-wraper">
					{todos.map(todo => (
						<TodoList
							title={todo.title}
							id={todo.id}
							description={todo.description}
							status={todo.status}
							key={todo.id}
						/>
					))}
				</Grid>
				<Grid item md={8} xs={12}>
					<form className="newTask">
						<label>
							Name:
							<input type="text" name="title" value={todoForm.title}/>
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
