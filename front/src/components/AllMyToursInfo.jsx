import { useState, useEffect, useContext } from "react";
import { StateContext } from "../utils/StateContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Textarea } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import { deleteMyData } from "../services/delete";
import AllMyToursEdit from "./AllMyToursEdit";
import pilisImage2 from "../images/Castle2.jpg";
import { getLogedInUser } from "../utils/auth/authenticate";
import { postMyData } from "../services/post";

function AllMyToursInfo() {
  const [allMyTours, setAllMyTours] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDates, setSelectedDates] = useState("");
  const { tours, categories, setUpdate, open, setOpen, users } =
    useContext(StateContext);
  const { id } = useParams();
  const ftours = allMyTours.find((tour) => tour._id === id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteMyData(id);
      setUpdate((update) => update + 1);
      navigate("/my-tours");
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  // const handleMyTours = async () => {
  //   try {
  //     const response = await postMyData(id, { date: selectedDates });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setAllMyTours(tours);
  }, [tours]);

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "Unknown Category";
  };

  const user = getLogedInUser();
  const isAdmin = user?.data.role === "admin";

  const loggedInUser = getLogedInUser();
  const userId = loggedInUser?.data._id;

  const specificUser = users.find((user) => user._id === userId);
  const userTours = specificUser ? specificUser.tours : [];

  // Filter to get the dates for the specific tour
  const tourDates = userTours
    .filter((tour) => tour.tourId._id === id)
    .map((tour) => tour.date);

  return (
    <>
      <CssBaseline />
      {ftours && (
        <Box
          style={{
            backgroundImage: `url(${pilisImage2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "20px 0",
            height: "93vh",
          }}
        >
          <Container style={{ maxWidth: "940px", marginTop: 20, padding: 0 }}>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    image={ftours.photo}
                    alt="Photo"
                    style={{ height: "100%", width: "100%" }}
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
                        {tourDates.map((date, index) => (
                          <Typography key={index} variant="body1">
                            <strong>Dates:</strong> {date}
                          </Typography>
                        ))}
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Price:</strong> ${ftours.price}
                      </Typography>
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Comment:</strong>
                      </Typography>
                      <Textarea
                        aria-label="Tour comment"
                        minRows={3}
                        maxRows={10}
                        fontFamily="Arial, sans-serif"
                        placeholder="Add your comments here"
                        style={{
                          width: "100%",
                          marginTop: "8px",
                          padding: "8px",
                        }}
                        defaultValue={ftours.comment}
                      />
                      <Typography variant="body1" component="div" gutterBottom>
                        <strong>Category:</strong>{" "}
                        {getCategoryTitle(ftours.category)}
                      </Typography>
                     
                        <Box sx={{ marginTop: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpen(true)}
                            style={{ marginRight: 10 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenDeleteDialog(true)}
                          >
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
          <AllMyToursEdit tour={ftours} />
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

export default AllMyToursInfo;
