import axios from "axios";
const instance = axios.create({
    baseURL :'http://localhost:8888/CI_TODO/todos',
    
})

export default instance;