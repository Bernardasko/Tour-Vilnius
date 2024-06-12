import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { useParams, useNavigate } from "react-router-dom";

const CommentRatingDisplay = () => {
  
  const { users, tours } = useContext(StateContext);
  console.log(users);

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        {users.map((user) => (
            tours.map ((tour) => (
                
      <Typography item key={tour._id}  variant="h6" gutterBottom>
        Your Comment
      </Typography>
            ))            
        ))}
          
    
      <Typography variant="body1">{users.comment}</Typography>
      <Typography variant="h6" gutterBottom>
        Your Rating
      </Typography>
      <Rating
        value={users.rating}
        precision={0.5}
        readOnly
      />
      <Typography variant="body1">{labels[users.rating]}</Typography>
    </Box>
  );
};

export default CommentRatingDisplay;
