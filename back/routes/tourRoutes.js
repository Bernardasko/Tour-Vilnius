const express = require("express");
const tourControler = require("../controllers/tourController");
const authControler = require("../controllers/authController");

const { getAllTours, getTour, createTour, updateTour, deleteTour, uploadImage, createMyTours, deleteMyTours, updateMyTour } =
    tourControler;

const { signup, login } = authControler;

const { protect, restrictTo } = authControler;

const router = express.Router();

router.route("/").get(getAllTours).post(uploadImage.single("photo"), createTour);
router.route("/:id")
.get( getTour)
.patch( uploadImage.single("photo"), updateTour)
.delete(deleteTour);

router.route("/my-tours/:tourId")
.post(protect,createMyTours)
.delete(protect,deleteMyTours)
.patch(protect,updateMyTour);




module.exports = router;
