import {Card, CardContent, CardActions, CardMedia, Button, Typography} from '@mui/material';
import group from '../images/group.jpg';

export default function GroupCards() {
  return (
    <Card sx={{ maxWidth: 310 }}>
      <CardMedia
        sx={{ height: 120 }}
        title="green iguana"
        image={group}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Tours in Vilnius for group
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={"center"}>
        Custom tours for your group, event, or enjoyable leisure time.
        </Typography>
      </CardContent>
      <CardActions sx={{display: "flex", justifyContent: "center"}}>
        <Button size="large">More</Button>
      </CardActions>
    </Card>
  );
}