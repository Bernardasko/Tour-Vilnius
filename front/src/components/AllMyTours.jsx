import { Grid, CssBaseline, Button } from "@mui/material";
import pilisImage2 from "../images/Castle2.jpg";
import AllMyCards from "./AllMyCards";
import { useContext, useEffect } from "react";
import { StateContext } from "../utils/StateContext";
import TourForms from "./TourForms";
import Modal from '@mui/joy/Modal';
import { getLogedInUser } from "../utils/auth/authenticate";

function AllMyTours() {
    const { open, setOpen, users } = useContext(StateContext);

    const loggedInUser = getLogedInUser();
    const isAdmin = loggedInUser?.data.role === 'admin';

    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    const currentUser = users.find(user => user._id === loggedInUser?.data._id);

    return (
        <>
            <CssBaseline />
            <Grid container component={"main"} sx={{ height: "93vh" }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        backgroundImage: `url(${pilisImage2})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: { xs: "93.9vh", sm: "auto" },
                    }}
                >
                    <Grid>
                        {isAdmin && (
                            <Button
                                sx={{ mt: 6, ml: 4, position: "absolute" }}
                                variant="contained"
                                onClick={() => setOpen(true)}
                            >
                                Create a tour
                            </Button>
                        )}
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
                        {currentUser && currentUser.tours.map((tour) => (
                            <Grid item key={tour._id}>
                                <AllMyCards tour={tour} />
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

export default AllMyTours;
