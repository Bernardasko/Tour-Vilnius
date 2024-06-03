import { useState, useEffect, useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import Modal from '@mui/joy/Modal';
import { deleteData } from "../services/delete";
import { useNavigate } from "react-router-dom";
import EditToursInfo from "./EditToursInfo";

function ToursInfo() {
    const [allTours, setAllTours] = useState([]);
    const { tours, categories,update, setUpdate, open, setOpen } = useContext(StateContext);
    const { id } = useParams();
    const ftours = allTours.find((tour) => tour._id === id);

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteData(id);
            setUpdate(update + 1);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setAllTours(tours);
    }, [tours]);
    const getCategoryTitle = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.title : 'Unknown Category';
    };
    
    return (
        <>
        {ftours &&
        <Card sx={{ maxWidth: 600, margin: '50px auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {ftours.title}
          </Typography>
          <Box sx={{ mt: 5 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Duration:</strong> {ftours.duration} days
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Dates:</strong> {ftours.dates}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Price:</strong> ${ftours.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Comment:</strong> {ftours.comment}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Category:</strong> {getCategoryTitle(ftours.category)}
            </Typography>
            <Button onClick={() => setOpen(true)}>
               Edit
            </Button>
            <Button onClick={() =>handleDelete(tours._id)}>
               Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
        }
        <Modal open={open} onClose={() => setOpen(false)}>
        <div>
        < EditToursInfo  tour={ftours}/>
        </div>
      </Modal>
        </>
     );
}

export default ToursInfo;