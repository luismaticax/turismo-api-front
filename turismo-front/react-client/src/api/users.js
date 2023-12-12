import axios from "./axios";

export const getUserRequest = (id) => axios.get(`/getUser/${id}`);
export const createUserRequest = (user) => axios.post(`/createUser/`, user);
export const deleteUserRequest = (id) => axios.delete(`/deleteUser/${id}`);
export const updateUserRequest = (id, user) =>
  axios.post(`/updateUser/${id}`, user);
export const userProfileRequest = (id) => axios.get(`/profile/${id}`);
