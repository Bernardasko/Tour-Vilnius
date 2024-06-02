import { Grid, CssBaseline, Button } from "@mui/material";
import pilisImage2 from "../images/Castle2.jpg";
import Cards from "./Cards";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import TourForms from "./TourForms";
import Modal from '@mui/joy/Modal';


function Home() {
  const { open, setOpen, tours, setUpdate } = useContext(StateContext);
  return (
    <>
      <CssBaseline />
      <Grid container component={"main"} sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: `url(${pilisImage2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "100vh", sm: "auto" },
          }}
        >
          <Grid>
            <Button
              sx={{ mt: 6, ml: 4, position: "absolute" }}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Create a tour
            </Button>
            <h1 style={{ color: "white", textAlign: "center" }}>
              Tour in Vilnius
            </h1>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mt={10}
          >
            {tours &&
              tours.map((tour) => (
                <Grid item key={tour._id}>
                  <Cards tour={tour} setUpdate={setUpdate} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
        <TourForms />
        </div>
      </Modal>
    </>
  );
}

export default Home;
