import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "../axios";
import TodoList from "./TodoList";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
const Todo = () => {
	const [todos, setTodos] = useState([]);
    const [formData, setformData] = useState({
        title: '',
        status: 'New'
    });

    const  getTodos = async () => {
        const request = await axios.get("/get_todos").catch((error) => console.log(error))
        console.log(request.data)
        if(request){
            setTodos(request.data.todos)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const querystring = require('querystring');
        const response = await axios.post('/post_todo', querystring.stringify(formData))
        .then(function (res) {
            if(res.data.is_valid){
                getTodos();
            }
        })
        .catch((error) => console.log(error));
        
    }

	useEffect(() => {
        getTodos();
	}, []);

    const handleChange = (e) => {
        e.preventDefault()
        setformData({...formData, [e.target.name] : e.target.value });
    }
    
	return (
		<Container>
			<Grid
				container
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				<Grid item md={8} xs={12} className="todo-wraper">
					{todos && todos.map(todo => (
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
					<form className="new-task" onSubmit={handleSubmit}>
						<label>
							Name:
							<input 
                            onChange={handleChange}
                            type="text" 
                            name="title" 
                            value={formData.title}/>
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
