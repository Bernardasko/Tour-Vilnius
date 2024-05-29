import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, Controller } from "react-hook-form";
import { postData } from "../services/post";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

function TourForms() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues: {
      title: "",
      photo: "",
      duration: "",
      dates: null,
      price: "",
      description: "",
      category: "",
    },
  });

  const formSubmitHandler = async (data) => {
    data.dates = dayjs(data.dates).format("YYYY-MM-DD");
    try {
      reset();
      await postData(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleFileChange = (e) => {
    setValue("photo", e.target.files[0]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit(formSubmitHandler)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          mx: "auto",
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Tour
        </Typography>
        <TextField
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            name="photo"
            type="file"
            onChange={handleFileChange}
          />
        </Button>
        <TextField
          label="Duration hours"
          type="number"
          {...register("duration", { required: "Duration is required" })}
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
              format="DD-MM-YYYY"
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => <TextField {...params} required />}
            />
          )}
        />
        <TextField
          label="Price"
          type="number"
          {...register("price", { required: "Price is required" })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        <TextField
          label="Comment"
          {...register("comment", { required: "Comment is required" })}
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
              <MenuItem value="Solo">Solo</MenuItem>
              <MenuItem value="Groups">Groups</MenuItem>
            </Select>
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default TourForms;
