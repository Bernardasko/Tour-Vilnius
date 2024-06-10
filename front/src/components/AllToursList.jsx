import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import AllMyCards from "../components/AllMyCards";
import { Grid, Container } from '@mui/material';
import { getLogedInUser } from "../utils/auth/authenticate";


function AllToursList() {
  const { users } = useContext(StateContext);

  const loggedInUser = getLogedInUser();

  const currentUser = users.find(user => user._id === loggedInUser?.data._id);
  

  return (
    <Container>
      <Grid container spacing={2}>
        {currentUser && currentUser.tours.map((tour) => (
          <Grid item key={tour._id} xs={12} sm={6} md={4}>
            <AllMyCards tour={tour} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AllToursList;
