import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm, Controller } from 'react-hook-form';
import { postData } from '../services/post';
// import { useContext } from 'react';
// import { StateContext } from '../utils/StateContext';
import { styled } from '@mui/material/styles';



function TourForms() {
    const [category, setCategory] = useState('');
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            photo: '',
            duration: '',
            dates: '',
            price: '',
            description: '',
            category: '',
        }
    }
    );

    const formSubmitHandler = async (data) => {
        data.dates.setMinutes(data.dates.getMinutes() - data.dates.getTimezoneOffset());
        try {
            await postData(data);
        } catch (error) {
            console.log(error);
        }
    }


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" onSubmit={handleSubmit(formSubmitHandler)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create a New Tour
                </Typography>
                <TextField
                    label="Title"
                    name="title"
                    id="title"
                    autoComplete='title'
                    {...register("title", { required: true })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                    <VisuallyHiddenInput name="photo" type="file" />
                </Button>
                <TextField
                    label="Duration hours"
                    name="duration"
                    type="number"
                    id="duration"
                    autoComplete='duration'
                    {...register("duration", { required: true })}
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                />
                <Controller
                    name="dates"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            label="Date"
                            value={field.value} 
                            inputFormat="DD-MM-YYYY"
                            onChange={(date) => field.onChange(date)} 
                            required
                        />
                    )}
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    id="price"
                    autoComplete='price'
                    {...register("price", { required: true })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                />
                <TextField
                    label="Comment"
                    name="comment"
                    id="comment"
                    autoComplete='comment'
                    {...register("comment", { required: true })}
                    error={!!errors.comment}
                    helperText={errors.comment?.message}
                    multiline
                    rows={4}
                />
                <Select
                    value={category}
                    onChange={handleChangeCategory}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="" disabled>
                        Select Category
                    </MenuItem>
                    <MenuItem value="solo">Solo</MenuItem>
                    <MenuItem value="groups">Groups</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </LocalizationProvider>
    );
}

export default TourForms;
