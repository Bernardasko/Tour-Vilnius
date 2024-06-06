// import {Box,Button, TextField, Typography, Select, MenuItem,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useForm, Controller } from "react-hook-form";
// import { postData } from "../services/post";
// import { styled } from "@mui/material/styles";
// import dayjs from "dayjs";
// import { ModalClose, Sheet } from '@mui/joy';
// import { useContext } from "react";
// import { StateContext } from "../utils/StateContext";

// function TourForms() {
//    const {setUpdate, setOpen, categories} = useContext(StateContext);

//   const {
//     control,
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       photo: "",
//       duration: "",
//       dates: "",
//       price: "",
//       description: "",
//       category: "",
//     },
//   });

//   const formSubmitHandler = async (data) => {
//     data.dates = dayjs(data.dates).format("MM/DD/YYYY");
//     try {
//       await postData({ ...data, photo: data.photo[0] });
//       setUpdate((update) => update + 1);
//       setOpen(false);
//       reset();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const VisuallyHiddenInput = styled("input")({
//     clip: "rect(0 0 0 0)",
//     clipPath: "inset(50%)",
//     height: 1,
//     overflow: "hidden",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     whiteSpace: "nowrap",
//     width: 1,
//   });

//   return (
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit(formSubmitHandler)}
//         sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             maxWidth: 500,
//             mx: "auto",
//             mt: 3,
//         }}       
//       >
//         <Sheet
//               variant="outlined"
//               sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                   borderRadius: 'md',
//                   p: 3,
//                   boxShadow: 'lg',
//                 }}
//             >
//                 <ModalClose variant="plain" sx={{ m: 1 }} />
//         <Typography variant="h4" component="h1" gutterBottom>
//           Create a New Tour
//         </Typography>
//         <TextField
//           label="Title"
//           name="title"
//           id="title"
//           autoComplete="title"
//           {...register("title", { required: true })}
//           error={!!errors.title}
//           helperText={errors.title?.message}
//         />
//         <Button
//           component="label"
//           role={undefined}
//           variant="contained"
//           tabIndex={-1}
//           startIcon={<CloudUploadIcon />}
//         >
//           Upload file
//           <VisuallyHiddenInput
//             name="photo"
//             type="file"
//             {...register("photo")}
//           />
//         </Button>
//         <TextField
//           label="Duration hours"
//           name="duration"
//           type="number"
//           id="duration"
//           autoComplete="duration"
//           {...register("duration", { required: true })}
//           error={!!errors.duration}
//           helperText={errors.duration?.message}
//         />
//         <Controller
//           name="dates"
//           control={control}
//           render={({ field }) => (
//             <DatePicker
//               label="Date"
//               value={field.value}
//               format="MM/dd/yyyy"
//                 onChange={(date) => field.onChange(date)}
//                 renderInput={(params) => <TextField {...params} />}
//               required
//             />
//           )}
//         />
//         <TextField
//           label="Price"
//           name="price"
//           type="number"
//           id="price"
//           autoComplete="price"
//           {...register("price", { required: true })}
//           error={!!errors.price}
//           helperText={errors.price?.message}
//         />
//         <TextField
//           label="Comment"
//           name="comment"
//           id="comment"
//           autoComplete="comment"
//           {...register("comment", { required: true })}
//           error={!!errors.comment}
//           helperText={errors.comment?.message}
//           multiline
//           rows={4}
//         />
//         <Controller
//           name="category"
//           control={control}
//           render={({ field }) => (
//             <Select
//               {...field}
//               displayEmpty
//               fullWidth
//               onChange={(e) => field.onChange(e.target.value)}
//             >
//               <MenuItem value="" disabled>
//                 Select Category
//               </MenuItem>
//               {categories.map((category) => (
//                 <MenuItem key={category._id} value={category._id}>
//                   {category.title}
//                 </MenuItem>
//               ))}
//             </Select>
//           )}
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//     </Sheet>
//       </Box>
//     </LocalizationProvider>
//   );
// }

// export default TourForms;

// import { useState, useEffect, useContext } from "react";
// import { StateContext } from "../utils/StateContext";
// import { useParams } from "react-router-dom";
// import { Container, Grid, Typography, Card, CardMedia, CardContent, Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
// import { Textarea } from "@mui/joy";
// import Modal from "@mui/joy/Modal";
// import { deleteData } from "../services/delete";
// import { useNavigate } from "react-router-dom";
// import EditToursInfo from "./EditToursInfo";
// import pilisImage2 from "../images/Castle2.jpg";
// import { getLogedInUser } from "../utils/auth/authenticate";
// import { Link } from "react-router-dom";

// function ToursInfo() {
//   const [allTours, setAllTours] = useState([]);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const { tours, categories, setUpdate, open, setOpen } = useContext(StateContext);
//   const { id } = useParams();
//   const ftours = allTours.find((tour) => tour._id === id);
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     try {
//       await deleteData(id);
//       setUpdate((update) => update + 1);
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setOpenDeleteDialog(false);
//     }
//   };

//   useEffect(() => {
//     setAllTours(tours);
//   }, [tours]);

//   const getCategoryTitle = (categoryId) => {
//     const category = categories.find((cat) => cat._id === categoryId);
//     return category ? category.title : "Unknown Category";
//   };

//   const user = getLogedInUser();
//   const isAdmin = user?.data.role === 'admin';

//   return (
//     <>
//       <CssBaseline />
//       {ftours && (
//         <Box
//           style={{
//             backgroundImage: `url(${pilisImage2})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             padding: '20px 0',
//             height: '93vh',
//           }}
//         >
//           <Container style={{ maxWidth: '940px', marginTop: 20, padding: 0 }}>
//             <Card>
//               <Grid container>
//                 <Grid item xs={12} md={6}>
//                   <CardMedia
//                     component="img"
//                     image={ftours.photo}
//                     alt="Photo"
//                     style={{ height: '100%', width: '100%' }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <CardContent>
//                     <Box sx={{ padding: 2 }}>
//                       <Typography variant="h4" component="div" gutterBottom>
//                         Tour Information
//                       </Typography>
//                       <Typography variant="body1" component="div" gutterBottom>
//                         <strong>Duration:</strong> {ftours.duration} days
//                       </Typography>
//                       <Typography variant="body1" component="div" gutterBottom>
//                         <strong>Dates:</strong> {ftours.dates}
//                       </Typography>
//                       <Typography variant="body1" component="div" gutterBottom>
//                         <strong>Price:</strong> ${ftours.price}
//                       </Typography>
//                       <Typography variant="body1" component="div" gutterBottom>
//                         <strong>Comment:</strong>
//                       </Typography>
//                       <Textarea
//                         aria-label="Tour comment"
//                         minRows={3}
//                         maxRows={10}
//                         fontFamily="Arial, sans-serif"
//                         placeholder="Add your comments here"
//                         style={{ width: '100%', marginTop: '8px', padding: '8px' }}
//                         defaultValue={ftours.comment}
//                       />
//                       <Typography variant="body1" component="div" gutterBottom>
//                         <strong>Category:</strong> {getCategoryTitle(ftours.category)}
//                       </Typography>
//                       {isAdmin && (
//                         <Box sx={{ marginTop: 2 }}>
//                           <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginRight: 10 }}>
//                             Edit
//                           </Button>
//                           <Button variant="contained" color="secondary" onClick={() => setOpenDeleteDialog(true)}>
//                             Delete
//                           </Button>
//                         </Box>
//                       )}
//                       {!isAdmin && (
//                         <Typography>
//                           <strong>
//                             If you want to participate in this tour, please <Link to="/login">log in</Link>.<br />
//                             If you want to book a tour <Link to="register">register</Link>.
//                           </strong>
//                         </Typography>
//                       )}
//                     </Box>
//                   </CardContent>
//                 </Grid>
//               </Grid>
//             </Card>
//           </Container>
//         </Box>
//       )}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <div>
//           <EditToursInfo tour={ftours} />
//         </div>
//       </Modal>
//       <Dialog
//         open={openDeleteDialog}
//         onClose={() => setOpenDeleteDialog(false)}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to delete this tour?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDelete} color="secondary" autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default ToursInfo;

// import {Box,Button, TextField, Typography, Select, MenuItem,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useForm, Controller } from "react-hook-form";
// import { postData } from "../services/post";
// import { styled } from "@mui/material/styles";
// import dayjs from "dayjs";
// import { ModalClose, Sheet } from '@mui/joy';
// import { useContext } from "react";
// import { StateContext } from "../utils/StateContext";

// function TourForms() {
//    const {setUpdate, setOpen, categories} = useContext(StateContext);

//   const {
//     control,
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       photo: "",
//       duration: "",
//       dates: "",
//       price: "",
//       description: "",
//       category: "",
//     },
//   });

//   const formSubmitHandler = async (data) => {
//     data.dates = dayjs(data.dates).format("MM/DD/YYYY");
//     try {
//       await postData({ ...data, photo: data.photo[0] });
//       setUpdate((update) => update + 1);
//       setOpen(false);
//       reset();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const VisuallyHiddenInput = styled("input")({
//     clip: "rect(0 0 0 0)",
//     clipPath: "inset(50%)",
//     height: 1,
//     overflow: "hidden",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     whiteSpace: "nowrap",
//     width: 1,
//   });

//   return (
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit(formSubmitHandler)}
//         sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             maxWidth: 500,
//             mx: "auto",
//             mt: 3,
//         }}       
//       >
//         <Sheet
//               variant="outlined"
//               sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                   borderRadius: 'md',
//                   p: 3,
//                   boxShadow: 'lg',
//                 }}
//             >
//                 <ModalClose variant="plain" sx={{ m: 1 }} />
//         <Typography variant="h4" component="h1" gutterBottom>
//           Create a New Tour
//         </Typography>
//         <TextField
//           label="Title"
//           name="title"
//           id="title"
//           autoComplete="title"
//           {...register("title", { required: true })}
//           error={!!errors.title}
//           helperText={errors.title?.message}
//         />
//         <Button
//           component="label"
//           role={undefined}
//           variant="contained"
//           tabIndex={-1}
//           startIcon={<CloudUploadIcon />}
//         >
//           Upload file
//           <VisuallyHiddenInput
//             name="photo"
//             type="file"
//             {...register("photo")}
//           />
//         </Button>
//         <TextField
//           label="Duration hours"
//           name="duration"
//           type="number"
//           id="duration"
//           autoComplete="duration"
//           {...register("duration", { required: true })}
//           error={!!errors.duration}
//           helperText={errors.duration?.message}
//         />
//         <Controller
//           name="dates"
//           control={control}
//           render={({ field }) => (
//             <DatePicker
//               label="Date"
//               value={field.value}
//               format="MM/dd/yyyy"
//                 onChange={(date) => field.onChange(date)}
//                 renderInput={(params) => <TextField {...params} />}
//               required
//             />
//           )}
//         />
//         <TextField
//           label="Price"
//           name="price"
//           type="number"
//           id="price"
//           autoComplete="price"
//           {...register("price", { required: true })}
//           error={!!errors.price}
//           helperText={errors.price?.message}
//         />
//         <TextField
//           label="Comment"
//           name="comment"
//           id="comment"
//           autoComplete="comment"
//           {...register("comment", { required: true })}
//           error={!!errors.comment}
//           helperText={errors.comment?.message}
//           multiline
//           rows={4}
//         />
//         <Controller
//           name="category"
//           control={control}
//           render={({ field }) => (
//             <Select
//               {...field}
//               displayEmpty
//               fullWidth
//               onChange={(e) => field.onChange(e.target.value)}
//             >
//               <MenuItem value="" disabled>
//                 Select Category
//               </MenuItem>
//               {categories.map((category) => (
//                 <MenuItem key={category._id} value={category._id}>
//                   {category.title}
//                 </MenuItem>
//               ))}
//             </Select>
//           )}
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//     </Sheet>
//       </Box>
//     </LocalizationProvider>
//   );
// }

// export default TourForms;
