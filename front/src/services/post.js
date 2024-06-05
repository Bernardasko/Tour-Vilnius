import axios from "axios";
import { authenticate } from "../utils/auth/authenticate";
const API_URL = import.meta.env.VITE_API_URL;


export const postData = async (data) => {
    authenticate();
    const response = await axios.post(API_URL, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
} 

// export const postData = async (formData) => {
//     try {
//       const response = await axios.post(API_URL, formData);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };