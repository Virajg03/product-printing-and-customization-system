import axios from "axios"
//This line imports the Axios library, which is a popular JavaScript library used for making HTTP requests from browsers or Node.js.

const API_BASE_URL="http://localhost:5454";

const jwt = localStorage.getItem("jwt");

export const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwt}`,
        "content-Type":"application/json"
    }
})
 
export default API_BASE_URL