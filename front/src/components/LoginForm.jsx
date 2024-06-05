import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,  Paper, Box, Grid, Typography } from '@mui/material'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import pilisImage from '../images/pilis.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/auth/authenticate';
import { useForm } from 'react-hook-form';
import { useState } from 'react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.govilnius.lt/" target='_blank'>
       Go Vilnius
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues : {
      email: "",
      password: "",
    }}
  );

  async function onSubmit(values) {
    try {
      await login(values);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Wrong email or password");
    }
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          backgroundImage: `url(${pilisImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={6} md={5} component={Paper}  elevation={5} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", { required: "Please enter your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address format",
              } })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password",
               { required: "Please enter your password", })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" to = "/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
