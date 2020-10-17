import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8088",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
export default api;
