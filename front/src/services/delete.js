import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { authenticate } from "../utils/auth/authenticate";



export const deleteData = async (id) => {
    try {
        authenticate();
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}