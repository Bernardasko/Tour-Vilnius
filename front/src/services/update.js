import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URC = import.meta.env.VITE_API_URC;

export const updateData = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const updateCategories = async (id, data) => {
  const response = await axios.patch(`${API_URC}/${id}`, data);
  return response.data;
};
