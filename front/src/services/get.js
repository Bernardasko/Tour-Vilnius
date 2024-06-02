import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URC = import.meta.env.VITE_API_URC;

export const getallData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const getCategories = async () => {
    try {
        const response = await axios.get(API_URC);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

