// src/services/authService.js
import API from "./api"; // your axios instance

// REGISTER USER
export const registerAPI = (data) => API.post("/auth/register", data);

// LOGIN USER
export const loginAPI = (data) => API.post("/auth/login", data);