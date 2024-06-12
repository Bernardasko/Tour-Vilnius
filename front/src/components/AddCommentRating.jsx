import { useState, useContext } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { updateMyData } from '../services/update';
import { StateContext } from "../utils/StateContext";


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function AddCommentRating({tour}) {
    console.log(tour);
  const [hover, setHover] = useState(-1);

  const { setUpdate } = useContext(StateContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
      rating: 2.5,
    },
  });

  const formSubmitHandler = async (data) => {
    try {
      await updateMyData(tour._id, data);
      reset();
      setUpdate((update) => update + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(formSubmitHandler)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
      }}
    >
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Write your comment"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            error={!!errors.comment}
            helperText={errors.comment ? 'Comment is required' : ''}
          />
        )}
        rules={{ required: true }}
      />
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Rate your excursion below
            </Typography>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                {...field}
                value={field.value}
                precision={0.5}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {field.value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : field.value]}</Box>
              )}
            </Box>
          </Box>
        )}
        rules={{ required: true }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add comment
      </Button>
    </Box>
  );
}

export default AddCommentRating;
