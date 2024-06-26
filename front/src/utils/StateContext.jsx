import { createContext, useState, useEffect } from 'react';
import { getallData, getCategories, getUsers } from '../services/get';
import { getLogedInUser, authenticate } from '../utils/auth/authenticate';
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [tours, setTours] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [update, setUpdate] = useState(0);
    const [users, setUser] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    }
    
    const handleOpens = () => {
        setOpens(true);
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
        } catch (error) {
            console.log(error);
        }
    }

    //User
    const fetchUser = async () => {
        try {
            const { data: { users } } = await getUsers();
            console.log(users);
            setUser(users);
        } catch (error) {
            console.log(error);
        }
    }
  

    useEffect(() => {
        fetchData();
        fetchCategories();
        fetchUser();
    }, [update])

    return (
        <StateContext.Provider value={{ update, setUpdate, open, setOpen, tours, setTours, categories, setCategories, users, setUser, handleOpen,opens, setOpens, handleOpens}}>
            {children}
        </StateContext.Provider>
    )
}