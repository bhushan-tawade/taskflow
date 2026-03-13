import API from "./api";

// GET CURRENT USER
export const getCurrentUserAPI = () => API.get("/users/me");

// UPDATE USER
export const updateUserAPI = (data) => API.put("/users/me", data);

// DELETE USER
export const deleteUserAPI = () => API.delete("/users/me");

// CHANGE PASSWORD
export const changePasswordAPI = (data) => API.put("/users/me/change-password", data);