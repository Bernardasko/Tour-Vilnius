
import { Grid, CssBaseline, Button } from "@mui/material";
import pilisImage2 from '../images/Castle2.jpg';
import GroupCards from "./GroupCards";
import SoloCards from "./SoloCards";
import { useContext, useState } from "react";
import { StateContext } from "../utils/StateContext";

function Home() {

    const { open, setOpen } = useContext(StateContext);
    return (
        <>
            <CssBaseline />
            <Grid container component={"main"} sx={{ height: "100vh" }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        backgroundImage: `url(${pilisImage2})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: { xs: "100vh", sm: "auto" }
                    }}
                >
                    <Grid >
                    <Button sx={{ mt: 6, ml: 4, position: "absolute" }} variant="contained" onClick={() => setOpen(true)}
                     >Create a tour</Button>
                    <h1 style={{ color: "white",textAlign:"center" }}>Tour in Vilnius</h1>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center" spacing={2}
                        mt={10}>
                        <Grid item>
                            <GroupCards />
                        </Grid>
                        <Grid item>
                            <SoloCards />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
