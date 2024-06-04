import { useState, useEffect } from "react";
import { updateData } from "../services/update";
import {
    Box, Button, TextField, Typography, Select, MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ModalClose, Sheet } from '@mui/joy';
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";

function EditToursInfo({ tour }) {
    const { setUpdate,  setOpen, categories } = useContext(StateContext);

    const { register, handleSubmit, setValue, reset, control,
        formState: { errors } } = useForm({
            defaultValues: {
                title: "",
                photo: "",
                duration: "",
                dates: "",
                price: "",
                description: "",
                category: "",
            }
        });

    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    const formSubmitHandler = async (data) => {
        data.dates = dayjs(data.dates).format("MM/DD/YYYY");
        try {
            await updateData(tour._id, { ...data, photo: data.photo[0] });
                setUpdate((update) => update + 1);
                setOpen(false);
                reset();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (tour) {
            setValue("title", tour.title);
            // setValue("photo", tour.photo[0]);
            setValue("duration", tour.duration);
            setValue("dates", dayjs(tour.dates, "MM/DD/YYYY").toDate());
            setValue("price", tour.price);
            setValue("comment", tour.comment);
            setValue("category", tour.category);
        }
    }, [tour, categories]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="form"
                onSubmit={handleSubmit(formSubmitHandler)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: 500,
                    mx: "auto",
                    mt: 3,
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography variant="h4" component="h1" gutterBottom>
                        Edit Tour
                    </Typography>
                    <TextField
                        label="Title"
                        name="title"
                        id="title"
                        autoComplete="title"
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
                        <VisuallyHiddenInput
                            name="photo"
                            type="file"
                            {...register("photo")}
                        />
                    </Button>
                    <TextField
                        label="Duration hours"
                        name="duration"
                        type="number"
                        id="duration"
                        autoComplete="duration"
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
                                inputFormat="MM/dd/yyyy"
                                onChange={(date) => field.onChange(date)}
                                renderInput={(params) => <TextField {...params} />}
                                required
                            />
                        )}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        id="price"
                        autoComplete="price"
                        {...register("price", { required: true })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    <TextField
                        label="Comment"
                        name="comment"
                        id="comment"
                        autoComplete="comment"
                        {...register("comment", { required: true })}
                        error={!!errors.comment}
                        helperText={errors.comment?.message}
                        multiline
                        rows={4}
                    />
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                displayEmpty
                                fullWidth
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                <MenuItem value="" disabled>
                                    Select Category
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Sheet>
            </Box>
        </LocalizationProvider>
    );
}

export default EditToursInfo;
