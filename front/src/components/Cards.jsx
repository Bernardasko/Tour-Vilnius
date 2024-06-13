import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { margin } from '@mui/system';
import { Link } from 'react-router-dom'; 

export default function Cards({ tour }) {
  return (
    <Card sx={{ width: 300, minHeight: 330 }}>
      <CardMedia
        sx={{height: 170 }}
        image={tour.photo} 
        title={tour.title} 
      />
      <CardContent sx={{ textAlign: "center", padding: 1, marginBottom: 3 }}>
        <Typography gutterBottom textAlign={"center"} variant="h5"  component="div">
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
