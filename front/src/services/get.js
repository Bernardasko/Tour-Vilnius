import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URC = import.meta.env.VITE_API_URC;
import { authenticate } from "../utils/auth/authenticate";

export const getallData = async () => {
    try {
        authenticate();
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const getCategories = async () => {
    try {
        authenticate();
        const response = await axios.get(API_URC);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

