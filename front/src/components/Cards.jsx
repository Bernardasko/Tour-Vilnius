import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 

export default function Cards({ tour }) {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        sx={{height: 160 }}
        image={tour.photo} 
        title={tour.title} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tour.title} 
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={"center"}>
          {/* {tour.description}  */}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Link to = {`/tours/${tour._id}`}>
        <Button size="large">More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
