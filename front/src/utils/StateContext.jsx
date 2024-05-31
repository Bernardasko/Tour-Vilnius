import { createContext, useState, useEffect } from 'react';
import { getallData } from '../services/get';
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [tours, setTours] = useState([]);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const { data: { tours } } = await getallData();
            setTours(tours);
            console.log(tours);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <StateContext.Provider value={{ open, setOpen, tours, setTours }}>
            {children}
        </StateContext.Provider>
    )
}