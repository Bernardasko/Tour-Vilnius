import {Card, CardContent, CardActions, CardMedia, Button, Typography} from '@mui/material';
import solo from '../images/oneperson.jpg';

export default function SoloCards() {
  return (
    <Card sx={{ maxWidth: 310 }}>
      <CardMedia
        sx={{ height: 120 }}
        title="green iguana"
        image={solo}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Tours in Vilnius for solo
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={"center"}>
        Excursions for individuals who want to join a selected group
        </Typography>
      </CardContent>
      <CardActions sx={{display: "flex", justifyContent: "center"}}>
        <Button size="large">More</Button>
      </CardActions>
    </Card>
  );
}