import { StateContext } from "../utils/StateContext";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { updateMyData } from "../services/update";
import dayjs from "dayjs";
import { Select, MenuItem, Typography, Button } from "@mui/material";
import { Sheet, ModalClose } from '@mui/joy';

function AllMyToursEdit({ tour }) {
  const { setUpdate, setOpen, } = useContext(StateContext);
  const [selectedDate, setSelectedDate] = useState("");

  const {
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      date: ""
    }
  });

  const formSubmitHandler = async (data) => {
    data.date = selectedDate;
    try {
      await updateMyData(tour._id, data);
      setUpdate((update) => update + 1);
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tour) {
      setSelectedDate(tour.date); 
    }
  }, [tour]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: '0 auto' }}>
    <Sheet
    variant="outlined"
    sx={{
      width: 400,
      borderRadius: 'md',
      p: 3,
      boxShadow: 'lg',
    }}
  >
    <ModalClose variant="plain" sx={{ m: 1 }} />
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Typography variant="body1" component="div" gutterBottom>
        <strong>Dates:</strong>
      </Typography>
      <Select
        displayEmpty
        fullWidth
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        renderValue={(value) => value || 'Select Date'}
      >
        {tour.dates.map((date, index) => (
          <MenuItem key={index} value={date}>
            {date}
          </MenuItem>
        ))}
      </Select>
      
      <Button sx={{ mt: 2 }} size="large" style ={{ width: "100%" }} variant="contained" type="submit">Submit</Button>
    </form>
    </Sheet>
    </div>
  );
}

export default AllMyToursEdit;
