import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Checkbox } from "@material-ui/core";
import {
	CardContent,
	FormControlLabel,
	Typography,
	IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
	width: "100%",
	maxWidth: 360,
	bgcolor: "background.paper"
};
const TodoList = props => {
	const [todo, setTodo] = useState([props]);
	const [status, setStatus] = useState([props.status]);
	

    const handleChange = (e) => {
        console.log(e)
    }
	return (
		<div className="todo-list">
			<List  style={{width: "100%"}}>
				<ListItem style={{width: "100%"}}>
					<FormControlLabel className="todo-item-wrap" style={{width: "100%"}}
						control={<Checkbox  onChange={handleChange} />}
						label={
							<CardContent style={{ padding: 20 }}>
								{<Typography variant="subtitle1">{props.title}</Typography>}
							</CardContent>
						}
					/>
					<IconButton
						color="primary"
						aria-label="upload picture"
						component="span"
					>
						<DeleteIcon className="del-btn" />
					</IconButton>
				</ListItem>
				<Divider />
			</List>
		</div>
	);
};

export default TodoList;
