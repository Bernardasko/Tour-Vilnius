import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { useParams } from "react-router-dom";

const CommentRatingDisplay = () => {
  const { id } = useParams();
  const { users } = useContext(StateContext);

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

  // Filter users who have tours with the given tourId
  const filteredUserTours = users.map(user => ({
    ...user,
    tours: user.tours.filter(tour => tour.tourId._id === id)
  })).filter(user => user.tours.length > 0);

  // Calculate the average rating of all filtered tours
  const averageRating = () => {
    const allRatings = filteredUserTours.flatMap(user => user.tours.map(tour => tour.rating));
    const sum = allRatings.reduce((a, b) => a + b, 0);
    return allRatings.length > 0 ? (sum / allRatings.length).toFixed(1) : 0;
  };

  return (
    <Box>
      {filteredUserTours.map((user) => (
        user.tours.map((tour, index) => (
          <Box 
            key={index} 
            sx={{
              width: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '20px',
              margin: 'auto',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              mb: 2,
            }}
          >
            <Typography variant="body1" gutterBottom>
              Comment: {tour.comment}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Your Rating
            </Typography>
            {/* Display the rating using the Rating component */}
            <Rating
              value={tour.rating}
              precision={0.5}
              readOnly
            />
            {/* Display the label corresponding to the rating */}
            <Typography variant="body1">{labels[tour.rating]}</Typography>
          </Box>
        ))
      ))}
      <Typography variant="body1" sx={{ mt: 2 }}>
        Average Rating: {averageRating()}
      </Typography>
    </Box>
  );
};

export default CommentRatingDisplay;
