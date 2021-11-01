import axios from "axios";
const instance = axios.create({
    baseURL :'http://3.144.80.164/todos', //prod
    // baseURL :'http://localhost:8888/CI_TODO/todos', // local
    
})

export default instance;