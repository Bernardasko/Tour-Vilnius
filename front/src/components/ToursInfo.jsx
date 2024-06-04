import { useState, useEffect, useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Card, CardMedia, CardContent, Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Modal from "@mui/joy/Modal";
import { deleteData } from "../services/delete";
import { useNavigate } from "react-router-dom";
import EditToursInfo from "./EditToursInfo";
import pilisImage2 from "../images/Castle2.jpg";

function ToursInfo() {
  const [allTours, setAllTours] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { tours, categories, setUpdate, open, setOpen } = useContext(StateContext);
  const { id } = useParams();
  const ftours = allTours.find((tour) => tour._id === id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteData(id);
      setUpdate((update) => update + 1);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  useEffect(() => {
    setAllTours(tours);
  }, [tours]);

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "Unknown Category";
  };

  return (
    <>
      <CssBaseline />
      {ftours && (
        <Box
          style={{
            backgroundImage: `url(${pilisImage2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px 0',
            height: '93vh',
          }}
        >
          <Container style={{ maxWidth: '940px', marginTop: 20, padding: 0 }}>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    image={ftours.photo}
                    alt="Photo"
                    style={{ height: '100%', width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Box sx={{ padding: 2 }}>
                      <Typography variant="h4" component="div" gutterBottom>
                        Tour Information
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Duration:</strong> {ftours.duration} days
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Dates:</strong> {ftours.dates}
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Price:</strong> ${ftours.price}
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Comment:</strong> {ftours.comment}
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Category:</strong> {getCategoryTitle(ftours.category)}
                      </Typography>
                      <Box sx={{ marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginRight: 10 }}>
                          Edit
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => setOpenDeleteDialog(true)}>
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Box>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <EditToursInfo tour={ftours} />
        </div>
      </Modal>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this tour?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ToursInfo;
