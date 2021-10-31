import axios from "axios";
const httpInstance = axios.create({
    baseURL :'http://localhost:8888/CI_TODO/'
})

export default httpInstance;