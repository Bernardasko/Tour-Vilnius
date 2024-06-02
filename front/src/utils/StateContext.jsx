import { createContext, useState, useEffect } from 'react';
import { getallData, getCategories } from '../services/get';
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [tours, setTours] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [update, setUpdate] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    }

    //Tours
    const fetchData = async () => {
        try {
            const { data: { tours } } = await getallData();
            setTours(tours);
        } catch (error) {
            console.log(error);
        }
    }

    //Categories
    const fetchCategories = async () => {
        try {
            const { data: { categories } } = await getCategories();
            setCategories(categories);
            console.log(categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, [update])

    return (
        <StateContext.Provider value={{ update, setUpdate, open, setOpen, tours, setTours, categories, setCategories, handleOpen}}>
            {children}
        </StateContext.Provider>
    )
}