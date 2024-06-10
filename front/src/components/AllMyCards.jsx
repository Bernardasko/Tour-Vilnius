import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AllMyCards({ tour }) {
    console.log(tour);
    return (
        <Card key={tour._id} sx={{ width: 300 }}>
            <CardMedia
                sx={{ height: 160 }}
                image={tour.tourId.photo}
                title={tour.tourId.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {tour.tourId.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                    {/* {tour.description} */}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Link to={`/my-tours/${tour.tourId._id}`}>
                    <Button size="large">More</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
