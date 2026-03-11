import axios from "axios";

const BASE = "http://localhost:5000/api/tasks";
const headers = (token) => ({ Authorization: `Bearer ${token}` });

export const fetchTasksAPI  = (token)           => axios.get(BASE, { headers: headers(token) });
export const createTaskAPI  = (token, data)     => axios.post(BASE, data, { headers: headers(token) });
export const updateTaskAPI  = (token, id, data) => axios.put(`${BASE}/${id}`, data, { headers: headers(token) });
export const deleteTaskAPI  = (token, id)       => axios.delete(`${BASE}/${id}`, { headers: headers(token) });