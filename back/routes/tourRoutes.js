const express = require("express");
const tourControler = require("../controllers/tourController");
const authControler = require("../controllers/authController");

const { getAllTours, getTour, createTour, updateTour, deleteTour, uploadImage } =
    tourControler;

const { signup, login } = authControler;

const { protect, restrictTo } = authControler;

const router = express.Router();

router.route("/").get(getAllTours).post(uploadImage.single("photo"), createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);


module.exports = router;
